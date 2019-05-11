import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import Layout from "../../../components/layout";
import { Link } from "../../../routes";
import Job from "../../../ethereum/job";
import BidRow from "../../../components/bidRow";

class BidIndex extends Component {
  static async getInitialProps(props) {
    const job = Job(props.query.address);

    const bidCount = await job.methods.getBiddersCount().call();

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
      job: job
    };
  }

  renderRows() {
    return this.props.bids.map((bid, index) => {
      return (
        <BidRow key={index} id={index} bid={bid} address={this.props.address} />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3>Bids</h3>
        <Link route={`/jobs/${this.props.address}/bids/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>
              {" "}
              Add Request
            </Button>
          </a>
        </Link>
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
