import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Job from "../ethereum/job";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class BidForm extends Component {
  state = {
    amount: "",
    errorMessage: "",
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });

    const job = Job(this.props.address);

    this.setState({ loading: true });

    try {
      const accounts = await web3.eth.getAccounts();
      await job.methods.bid(this.state.amount).send({
        from: accounts[0]
        // value: web3.utils.toWei(this.state.value, "ether")
      });

      //Refresh the component with updated data
      Router.replaceRoute(`/jobs/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: "" });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to Bid</label>
          <Input
            value={this.state.value}
            onChange={event =>
              this.setState({ amount: event.target.value.replace(/\D/, "") })
            }
            label="wei"
            labelPosition="right"
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage} />

        <Button loading={this.state.loading} primary>
          Bid!
        </Button>
      </Form>
    );
  }
}

export default BidForm;
