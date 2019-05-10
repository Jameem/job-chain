import React, { Component } from "react";
import factory from "../ethereum/factory";

class JobIndex extends Component {
  async componentDidMount() {
    const jobs = await factory.methods.getDeployedJobs().call();
    console.log(jobs);
  }

  render() {
    return <div>CCC</div>;
  }
}

export default JobIndex;
