import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Table } from "reactstrap";

const TransactionTable = (props) => {
  const history = useHistory();
  const handleRowClick = (transactionId) => {
    history.push(`/transactions/${transactionId}`);
  };
  return (
    <Row>
      <Col>
        <Table hover responsive>
          <thead>
            <tr>
              <th scope="col">Amount</th>
              <th scope="col">Description</th>
              {props.isMainTransactionTable ? (
                <th scope="col">Customer</th>
              ) : null}
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {props.transactions.map((transaction) => (
              <tr
                key={transaction.id}
                onClick={() => handleRowClick(transaction.id)}
              >
                <th scope="row">${transaction.purchaseAmount}.00</th>
                <td>
                  {transaction.id} including {transaction.purchase[0].product}{" "}
                  on {transaction.createdAt} by {transaction.customerId}
                </td>
                {props.isMainTransactionTable ? (
                  <td>{transaction.customerId}</td>
                ) : null}
                <td>{transaction.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default TransactionTable;
