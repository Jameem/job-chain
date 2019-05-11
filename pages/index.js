import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/layout";
import { Link } from "../routes";
import Job from "../ethereum/job";

class JobIndex extends Component {
  static async getInitialProps() {
    const jobs = await factory.methods.getDeployedJobs().call();

    return { jobs };
  }

  renderJobs() {
    const items = this.props.jobs.map(address => {
      const job = Job(address);
      console.log(job);
      return {
        header: address,
        fluid: true,
        description: (
          <Link route={`/jobs/${address}`}>
            <a>View Job</a>
          </Link>
        )
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Latest Jobs</h3>
          <Link route="/jobs/new">
            <a>
              <Button
                floated="right"
                content="Post a Job"
                icon="add circle"
                primary
              />
            </a>
          </Link>
          {this.renderJobs()}
        </div>
      </Layout>
    );
  }
}

export default JobIndex;
