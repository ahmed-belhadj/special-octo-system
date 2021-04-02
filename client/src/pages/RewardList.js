import React from "react";
import axios from "axios";

import RewardTable from "../components/Tables/RewardTable";

export default class Rewards extends React.Component {
  state = {
    rewards: [],
  };

  componentDidMount() {
    axios.get(`rewards`).then((res) => {
      const rewards = res.data;
      this.setState({ rewards });
    });
  }

  render() {
    return <RewardTable rewards={this.state.rewards} />;
  }
}
