import React, { Component } from "react";
import { Button, Table, Label } from "semantic-ui-react";
import Layout from "../../../components/layout";
import { Link } from "../../../routes";
import Job from "../../../ethereum/job";
import BidRow from "../../../components/bidRow";

class BidIndex extends Component {
  static async getInitialProps(props) {
    const job = Job(props.query.address);

    const bidCount = await job.methods.getBiddersCount().call();
    const acceptedBidAmount = await job.methods.acceptedBidAmount().call();
    const closed = await job.methods.closed().call();

    const bids = await Promise.all(
      Array(parseInt(bidCount))
        .fill()
        .map((element, index) => {
          return job.methods.bidders(index).call();
        })
    );

    const { address } = props.query.address;
    // console.log(bids);

    // return { address, bids, bidCount };
    return {
      address: props.query.address,
      bids: bids,
      bidCount: bidCount,
      // job: job,
      acceptedBidAmount: acceptedBidAmount,
      closed: closed
    };
  }

  renderRows() {
    return this.props.bids.map((bid, index) => {
      return (
        <BidRow
          key={index}
          id={index}
          bid={bid}
          address={this.props.address}
          acceptedBidAmount={this.props.acceptedBidAmount}
          closed={this.props.closed}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3>Bids</h3>
        {!this.props.closed ? (
          <Link route={`/jobs/${this.props.address}`}>
            <a>
              <Button primary floated="right" style={{ marginBottom: 10 }}>
                {" "}
                Submit Bid
              </Button>
            </a>
          </Link>
        ) : (
          <Label floated="right" style={{ marginBottom: 10 }}>
            Job Closed
          </Label>
        )}

        <Table>
          <Header>
            <HeaderCell>Sl. No</HeaderCell>
            <HeaderCell>Bidder</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.bidCount} bids.</div>
      </Layout>
    );
  }
}

export default BidIndex;
