import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import CustomerList from "../pages/CustomerList";
import TransactionList from "../pages/TransactionList";
import RewardList from "../pages/RewardList";
import Customer from "../pages/Customer";
import Transaction from "../pages/Transaction";

const Layout = (props) => {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={CustomerList} />
        <Route exact path="/customers" component={CustomerList} />
        <Route exact path="/customers/:id" component={Customer} />
        <Route exact path="/transactions" component={TransactionList} />
        <Route exact path="/transactions/:id" component={Transaction} />{" "}
        <Route path="/rewards" component={RewardList} />
      </Switch>
    </Container>
  );
};

export default Layout;
