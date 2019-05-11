import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Job from "../ethereum/job";

class BidRow extends Component {
  onAccept = async event => {
    let amount = event.currentTarget.dataset.amount;

    const job = Job(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await job.methods.acceptBid(this.props.id).send({
      from: accounts[0],
      value: amount
    });
  };

  onFinalize = async () => {
    const job = Job(this.props.address);

    const accounts = await web3.eth.getAccounts();

    await job.methods.finalizeRequest(this.props.id).send({
      from: accounts[0]
    });
  };
  render() {
    const { Row, Cell } = Table;

    const { id, bid, address, acceptedBidAmount, closed } = this.props;
    // console.log(bid.amount);
    return (
      <Row positive={true}>
        <Cell>{id + 1}</Cell>
        <Cell>{bid.bidder}</Cell>
        <Cell>{bid.amount} wei</Cell>
        <Cell>
          {!closed && acceptedBidAmount == 0 ? (
            <Button
              color="green"
              basic
              onClick={this.onAccept}
              data-amount={bid.amount}
            >
              Accept Bid
            </Button>
          ) : (
            "Closed"
          )}
        </Cell>
      </Row>
    );
  }
}

export default BidRow;
