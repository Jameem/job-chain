import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Job from "../ethereum/job";

class BidRow extends Component {
  onAccept = async () => {
    const job = Job(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await job.methods.acceptBid(this.props.id).send({
      from: accounts[0]
    });
  };

  onFinalize = async () => {
    const job = Job(this.props.address);

    const accounts = await web3.eth.getAccounts();
    // console.log(Job);
    await job.methods.finalizeRequest(this.props.id).send({
      from: accounts[0]
    });
  };
  render() {
    const { Row, Cell } = Table;
    // console.log(this.props);
    const { id, bid, address } = this.props;
    const job = Job(this.props.address);
    return (
      <Row disabled={job.closed} positive={true}>
        <Cell>{id + 1}</Cell>
        <Cell>{bid.bidder}</Cell>
        <Cell>{bid.amount} wei</Cell>
        <Cell>
          {job.closed && job.address == msg.sender ? (
            "Closed"
          ) : (
            <Button color="green" basic onClick={this.onAccept}>
              Accept Bid
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default BidRow;
