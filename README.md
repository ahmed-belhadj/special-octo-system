# Reward Program

A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.

A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent over $50 in each transaction.

Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total.

[Demo](https://hungry-turing-75dd01.netlify.app/)

[REST API](https://radiant-atoll-03332.herokuapp.com/)

The data model implemented is in `data/mockDataSchema.js`

## Installation and Getting Started

### [JSON Server](https://github.com/typicode/json-server)

Use the package manager [npm](https://docs.npmjs.com/) or an equivalent to install dependencies.

```zsh
cd rest-api
npm install
```

Once that's completed, run `npm run mock` to generate a randomized data set of customers and transactions within a 3 month range that are stored in `data/db.json`. The total and monthly reward points per customer are also calculated and stored in this process.

```zsh
npm run mock
```

From here there are a couple of options to run the service. All local instantiations will default to `localhost:3001`:

Use `npm run start-mockapi` to run locally without Express middlewares and without SSL. The CLI will allow you to take snapshots of the DB and other configs while running.

```zsh
npm run start-mockapi
```

Use `npm run start` to run locally without SSL and with Express middlewares. This is the prefered option when deploying to Heroku.

```zsh
npm run start
```

Use `npm run dev` to run locally with SSL and with Express middlewares. This is the prefered option when during Frontend development.

```zsh
npm run dev
```

### [Create React App](https://create-react-app.dev/)

In the `client` folder, run `npm install` and `npm start` to run the React application on https://localhost:3000/.

```zsh
cd client
npm install
npm start
```

Conditionally pass `REACT_APP_BASE_URL=https://www.example.com/` with the appropriate URL if the REST API is not running on https://localhost:3001/. The React app will look for the REST API on https://localhost:3001/ by default.

```zsh
REACT_APP_BASE_URL=https://www.example.com/ npm start
```

## Usage

REST API

There are many default routes based on `db.json`. Here are some relevant ones:

```json
// Get all customers
GET    /customers
// Get one customer by ID
GET    /customers/customer_JDuIr8U3jaidCj:
// Get all transactions
GET    /transactions
// Get one transaction by ID
GET    /transactions/transaction_1CrnG72eZvKYlo2C63z9IGFR
// Get all rewards data
GET    /rewards
// Get rewards data on a customer by customer ID
GET    /rewards/customer_JDuIr8U3jaidCj:

// Every resource also implements query string functionality:
// Get all transactions for a given customer ID and sort them by date in ascending order
GET    /transactions?customerId=customer_JDuIr8U3jaidCj:&_sort=createdAt&_order=asc
```

React App

In a similar manner to the requests above, the React App renders all of the data from the REST API as tables and other interfaces. Clicking on cells within tables also navigates the user to relevant views that give more information regarding what was selected.

For example, clicking on a customer in the rewards table shows the user the customer's reward history.
