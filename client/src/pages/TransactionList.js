import React from "react";
import axios from "axios";

import TransactionTable from "../components/Tables/TransactionTable";

export default class Transactions extends React.Component {
  state = {
    transactions: [],
  };

  componentDidMount() {
    axios.get(`transactions`).then((res) => {
      const transactions = res.data;
      this.setState({ transactions });
    });
  }

  render() {
    return (
      <TransactionTable
        transactions={this.state.transactions}
        isMainTransactionTable={true}
      />
    );
  }
}
