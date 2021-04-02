// NOTE: this file does not run. it serves as a reference for the DB schema.

let db = {
  // DB holds 1 "customers" array that holds many Customer objects by Customer ID
  customers: [
    // Customer object
    {
      id: "customer_JDuIr8U3jaidCj:", // Customer ID
      name: "",
      rewardPoints: 0,
      paymentInfo: "cc_1CrnG72eZvKYlo2Cw2l03S7a",
      email: "",
      phone: "",
      address: { street: "", city: "", state: "", country: "", zip: "" },
    },
  ],
  // DB holds 1 "transactions" array that holds many Transaction objects by Transaction ID
  transactions: [
    // Transaction object
    {
      id: "transaction_1CrnG72eZvKYlo2C63z9IGFR", // Transaction ID
      createdAt: "", // Time and date
      purchaseAmount: 100, // Sum of prices of products in purchase array
      customerId: "customer_JDuIr8U3jaidCj",
      purchase: [
        // An array of a random number of products
        {
          product: "",
          productDescription: "",
          price: 100,
          productDepartment: "",
        },
      ],
    },
  ],
  // Each customers reward points per month and total
  rewards: [
    {
      // Customer ID
      id: "customer_JDuIr8U3jaidCj",
      totalRewardPoints: 0,
      monthlyRewardPoints: {
        MMYY: 0, // where MM is month and YY is year, for each month that the customer had atleast 1 purchase
      },
    },
  ],
};

// Stripe's object schemas for reference:
// Stripe Customer object
// {
//     "id": "cus_JDuIr8U3jaidCj",
//     "object": "customer",
//     "address": null,
//     "balance": 0,
//     "created": 1617291056,
//     "currency": "usd",
//     "default_source": null,
//     "delinquent": false,
//     "description": null,
//     "discount": null,
//     "email": null,
//     "invoice_prefix": "248531D",
//     "invoice_settings": {
//       "custom_fields": null,
//       "default_payment_method": null,
//       "footer": null
//     },
//     "livemode": false,
//     "metadata": {},
//     "name": null,
//     "next_invoice_sequence": 1,
//     "phone": null,
//     "preferred_locales": [],
//     "shipping": null,
//     "tax_exempt": "none"
//   }
// Stripe Transaction object
// {
//     "id": "ipi_1CrnG72eZvKYlo2C63z9IGFR",
//     "object": "issuing.transaction",
//     "amount": -100,
//     "amount_details": {
//       "atm_fee": null
//     },
//     "authorization": "iauth_1CrnG72eZvKYlo2C1MOhM8Fp",
//     "balance_transaction": null,
//     "card": "ic_1CrnG72eZvKYlo2Cw2l03S7a",
//     "cardholder": null,
//     "created": 1532526151,
//     "currency": "usd",
//     "dispute": null,
//     "livemode": false,
//     "merchant_amount": null,
//     "merchant_currency": null,
//     "merchant_data": {
//       "category": "taxicabs_limousines",
//       "city": "San Francisco",
//       "country": "US",
//       "name": "Rocket Rides",
//       "network_id": "1234567890",
//       "postal_code": "94107",
//       "state": "CA"
//     },
//     "metadata": {},
//     "type": "capture"
//   }
