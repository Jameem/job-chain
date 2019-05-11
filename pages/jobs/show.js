import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/layout";
import Job from "../../ethereum/job";
import web3 from "../../ethereum/web3";
import BidForm from "../../components/bidForm";
import { Link } from "../../routes";

class JobShow extends Component {
  static async getInitialProps(props) {
    const job = Job(props.query.address);
    const summary = await job.methods.getSummary().call();

    return {
      address: props.query.address,
      budget: summary[0],
      balance: summary[1],
      bidsCount: summary[2],
      title: summary[3],
      description: summary[4],
      manager: summary[5]
    };
  }

  renderCards() {
    const {
      address,
      budget,
      balance,
      bidsCount,
      title,
      description,
      manager
    } = this.props;

    const items = [
      {
        header: title,
        description: description,
        color: "red"
      },
      {
        header: budget,
        meta: "Maximum Budget (wei)",
        description: "Bid should be less than or equal to " + budget + ".",
        color: "red"
      },
      {
        header: bidsCount,
        meta: "Number of Bids",
        description: "Bidding will be closed once the Employer accpets a bid.",
        color: "red"
      },
      {
        header: manager,
        meta: "Address of Employer",
        description: "The employer who created this Job.",
        style: { overflowWrap: "break-word" },
        color: "red"
      }
      // {
      //   header: web3.utils.fromWei(balance, "ether"),
      //   meta: "Campaign Balance (ether)",
      //   description:
      //     "The balance is how much money this campaign has left to spend.",
      //   color: "red"
      // }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Job Show</h3>

        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <BidForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/jobs/${this.props.address}/bids`}>
                <a>
                  <Button primary> View Bids</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default JobShow;
