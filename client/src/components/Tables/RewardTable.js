import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Table, Badge } from "reactstrap";

const RewardTable = (props) => {
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
              <th scope="col">Customer</th>
              <th scope="col">Reward Points</th>
              <th scope="col">Reward Points Earned This Month</th>
            </tr>
          </thead>
          <tbody>
            {props.rewards.map((reward) => (
              <tr key={reward.id} onClick={() => handleRowClick(reward.id)}>
                <th scope="row">{reward.id}</th>
                <td>
                  <Badge color="success" pill>
                    {reward.totalRewardPoints}
                  </Badge>
                </td>
                <td>
                  {reward.rewardPointsByMonth.March2021 ? (
                    <Badge color="success" pill>
                      {reward.rewardPointsByMonth.March2021}
                    </Badge>
                  ) : (
                    <Badge color="warning" pill>
                      0
                    </Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default RewardTable;
