import React from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Media,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Badge,
} from "reactstrap";
import axios from "axios";

export default class Transaction extends React.Component {
  state = {
    transaction: {},
    customer: {},
    purchase: [],
  };

  componentDidMount() {
    const transactionId = this.props.match.params.id;
    axios
      .get(`/transactions/${transactionId}`)
      .then((res) => {
        const transaction = res.data;
        this.setState({
          transaction: {
            id: transaction.id,
            customerId: transaction.customerId,
            purchaseAmount: transaction.purchaseAmount,
            createdAt: transaction.createdAt,
          },
          purchase: transaction.purchase,
        });
      })
      .then(() => {
        axios
          .get(`/customers/${this.state.transaction.customerId}`)
          .then((res) => {
            const customer = res.data;
            this.setState({ customer: customer });
            console.log(this.state);
          });
      });
  }

  render() {
    return (
      <Row>
        <Col>
          <Row>
            <Col>
              <h5 className="text-muted">{this.state.transaction.id}</h5>
              <h1>${this.state.transaction.purchaseAmount}.00</h1>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <Media body>
                <Media heading>Date</Media>
                {this.state.transaction.createdAt}
              </Media>
            </Col>
            <Col>
              <Media body>
                <Media heading>Customer</Media>
                <Link to={`/customers/${this.state.customer.id}`}>
                  {this.state.customer.name}
                </Link>
              </Media>
            </Col>
            <Col>
              <Media body>
                <Media heading>Payment Information</Media>
                <Badge color="info" pill>
                  {this.state.customer.paymentInfo}{" "}
                </Badge>
              </Media>
            </Col>
          </Row>
          <hr />
          <h3>Purchase Details</h3>
          <hr />
          <ListGroup>
            {this.state.purchase.map((item) => (
              <ListGroupItem key={item.product + item.price}>
                <ListGroupItemHeading>
                  {item.product} <Badge pill>${item.price}.00</Badge>
                </ListGroupItemHeading>
                <ListGroupItemText>
                  Description: {item.productDescription}
                </ListGroupItemText>
                <ListGroupItemText>
                  Department: {item.productDepartment}
                </ListGroupItemText>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}
