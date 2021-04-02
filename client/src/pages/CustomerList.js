import React from "react";
import axios from "axios";

import CustomerTable from "../components/Tables/CustomerTable";

export default class Customers extends React.Component {
  state = {
    customers: [],
  };

  componentDidMount() {
    axios.get(`customers`).then((res) => {
      const customers = res.data;
      this.setState({ customers });
    });
  }

  render() {
    return <CustomerTable customers={this.state.customers} />;
  }
}
