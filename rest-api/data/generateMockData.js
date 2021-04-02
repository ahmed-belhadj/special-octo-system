var faker = require("faker");
var _ = require("lodash");
var fs = require("fs");

console.log("Generating mock data...");

var data = { customers: [], transactions: [], rewards: [] };

// Generate 50 customers
console.log("Generating mock customers...");
_.times(50, () => {
  data.customers.push({
    id: `customer_${faker.datatype.uuid()}`,
    rewardPoints: 0,
    name: faker.name.findName(),
    paymentInfo: `cc_${faker.finance.bitcoinAddress()}`,
    email: faker.internet.exampleEmail(),
    phone: faker.phone.phoneNumber(),
    address: {
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      country: faker.address.country(),
      zip: faker.address.zipCode(),
    },
  });
});

// A date range between now and 3 months ago
var startDate = new Date(Date.now());
startDate.setMonth(startDate.getMonth() - 3);
var stopDate = new Date(Date.now());

// Generate 100 transactions
console.log("Generating mock transactions...");
_.times(100, () => {
  let items = [];
  let total = 0;
  // Generate a random number of items per transaction between 1 and 10
  _.times(faker.datatype.number({ max: 10, min: 1 }), () => {
    // Generate an item
    let item = {
      product: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      productDepartment: faker.commerce.department(),
      productDescription: faker.commerce.productDescription(),
    };
    // Update the total and add item to transaction
    total += item.price;
    items.push(item);
  });

  // Generate a random time within the 3 month range
  var fromMilli = Date.parse(startDate);
  var dateOffset = faker.datatype.number(Date.parse(stopDate) - fromMilli);
  var newDate = new Date(fromMilli + dateOffset);

  data.transactions.push({
    id: `transaction_${faker.datatype.uuid()}`,
    purchaseAmount: total,
    customerId: faker.random.arrayElement(data.customers).id, // Assign the transaction to a random customer
    createdAt: newDate,
    purchase: items,
  });
});

// Calculate reward points
// A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent over $50 in each transaction
console.log("Calculating reward points from generated mock transactions...");
let tempRewards = {};
for (transaction of data.transactions) {
  let rewards = 0;
  let month = `${new Date(transaction.createdAt).toLocaleString("default", {
    month: "long",
  })}${new Date(transaction.createdAt).getUTCFullYear()}`;

  // calculate the rewards for the purchase
  if (transaction.purchaseAmount > 100) {
    rewards += 2 * (transaction.purchaseAmount - 100);
  }
  if (transaction.purchaseAmount > 50) {
    rewards += transaction.purchaseAmount - 50;
  }
  if (rewards > 0) {
    if (tempRewards[transaction.customerId]) {
      tempRewards[transaction.customerId].totalRewardPoints += rewards;
      if (tempRewards[transaction.customerId].rewardPointsByMonth[month]) {
        tempRewards[transaction.customerId].rewardPointsByMonth[
          month
        ] += rewards;
      } else {
        tempRewards[transaction.customerId].rewardPointsByMonth[
          month
        ] = rewards;
      }
    } else {
      tempRewards[transaction.customerId] = {
        id: transaction.customerId,
        totalRewardPoints: rewards,
        rewardPointsByMonth: {},
      };
      tempRewards[transaction.customerId].rewardPointsByMonth[
        `${month}`
      ] = rewards;
    }
  }
}
console.log("Reward points calculated.");

console.log("Reformatting mock data...");
// add reward balance to customer object
for (customer of data.customers) {
  if (tempRewards[customer.id]) {
    customer.rewardPoints = tempRewards[customer.id].totalRewardPoints;
  }
}
// reformat reward data
for (customerId of Object.keys(tempRewards)) {
  data.rewards.push(tempRewards[customerId]);
}

try {
  fs.writeFileSync("data/db.json", JSON.stringify(data));
  console.log("Mock data generated.");
} catch (err) {
  console.error("Error while generating mock data: ", err);
}
