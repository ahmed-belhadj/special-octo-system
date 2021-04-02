import React from "react";
import {
  Row,
  Col,
  Media,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Badge,
  Table,
} from "reactstrap";
import axios from "axios";

import TransactionTable from "../components/Tables/TransactionTable";

export default class Customer extends React.Component {
  state = {
    customer: {},
    address: {},
    rewards: {},
    transactions: [],
  };

  componentDidMount() {
    const customerId = this.props.match.params.id;
    axios.get(`/customers/${customerId}`).then((res) => {
      const customer = res.data;
      this.setState({
        customer: {
          id: customer.id,
          rewardPoints: customer.rewardPoints,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          paymentInfo: customer.paymentInfo,
        },

        address: customer.address,
      });
    });
    axios.get(`/rewards/${customerId}`).then((res) => {
      const rewards = res.data;
      this.setState({ rewards: rewards.rewardPointsByMonth });
    });
    axios
      .get(`/transactions?customerId=${customerId}&_sort=createdAt&_order=desc`)
      .then((res) => {
        const transactions = res.data;
        this.setState({ transactions: transactions });
      });
  }

  render() {
    return (
      <Row>
        <Col>
          <Row>
            <Col>
              <h1>{this.state.customer.name}</h1>
              <h5 className="text-muted">{this.state.customer.email}</h5>
            </Col>
          </Row>
          <hr />
          <Row>
            <Media body>
              <Media heading>Total Reward Points</Media>

              <Badge
                color={
                  this.state.customer.rewardPoints > 0 ? "success" : "warning"
                }
                pill
              >
                {this.state.customer.rewardPoints}
              </Badge>
            </Media>
          </Row>
          <hr />
          <Row>
            <ListGroup>
              <ListGroupItem>
                <ListGroupItemHeading>Customer Details</ListGroupItemHeading>
                <ListGroupItemText>
                  <code>{this.state.customer.id}</code>
                </ListGroupItemText>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroupItemHeading>
                  {this.state.customer.name}
                </ListGroupItemHeading>
                <ListGroupItemText>
                  {this.state.customer.email}
                </ListGroupItemText>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroupItemHeading>Address</ListGroupItemHeading>
                <ListGroupItemText>
                  {this.state.address.street}
                </ListGroupItemText>

                {this.state.address.city +
                  ", " +
                  this.state.address.state +
                  ", " +
                  this.state.address.country +
                  " " +
                  this.state.address.zip}
                <ListGroupItemText></ListGroupItemText>
              </ListGroupItem>
              <ListGroupItem>
                <ListGroupItemHeading>Phone</ListGroupItemHeading>
                <ListGroupItemText>
                  {this.state.customer.phone}
                </ListGroupItemText>
              </ListGroupItem>
            </ListGroup>
          </Row>
        </Col>
        <Col>
          <h3>Reward Points Overview</h3>
          <hr />
          <Table>
            <thead>
              <tr>
                <th scope="col">Month</th>
                <th scope="col">Reward Points Earned</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(this.state.rewards).map((month) => (
                <tr key={month}>
                  <th scope="row">{month}</th>
                  <td>
                    <Badge color="success" pill>
                      {this.state.rewards[month]}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <hr />
          <h3>Transactions</h3>
          <hr />
          <TransactionTable
            transactions={this.state.transactions}
            isMainTransactionTable={false}
          />
          <hr />
          <h3>Payment Information</h3>
          <hr />
          <h4>
            <Badge color="info" pill>
              {this.state.customer.paymentInfo}
            </Badge>
          </h4>
        </Col>
      </Row>
    );
  }
}
