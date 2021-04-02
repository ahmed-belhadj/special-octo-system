import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Table, Badge } from "reactstrap";

const CustomerTable = (props) => {
  const history = useHistory();
  const handleRowClick = (customerId) => {
    history.push(`/customers/${customerId}`);
  };
  return (
    <Row>
      <Col>
        <Table hover responsive>
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Customer ID</th>
              <th scope="col">Name</th>
              <th scope="col">Reward Points</th>
            </tr>
          </thead>
          <tbody>
            {props.customers.map((customer) => (
              <tr key={customer.id} onClick={() => handleRowClick(customer.id)}>
                <th scope="row">{customer.email}</th>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>
                  <Badge
                    color={customer.rewardPoints > 0 ? "success" : "warning"}
                    pill
                  >
                    {customer.rewardPoints}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default CustomerTable;
