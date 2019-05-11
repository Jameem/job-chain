import React, { Component } from "react";
import Layout from "../../components/layout";
import { Form, Button, Input, Message, TextArea } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class JobNew extends Component {
  state = {
    budget: "",
    title: "",
    description: "",
    errorMessage: "",
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createJob(this.state.budget, this.state.title, this.state.description)
        .send({
          from: accounts[0]
        });

      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h1>Create a Job </h1>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Title</label>
            <Input
              required
              value={this.state.title}
              onChange={event => this.setState({ title: event.target.value })}
            />

            <label>Description</label>
            <TextArea
              value={this.state.description}
              onChange={event =>
                this.setState({ description: event.target.value })
              }
            />

            <label>Budget</label>
            <Input
              required
              label="wei"
              labelPosition="right"
              value={this.state.budget}
              onChange={event =>
                this.setState({ budget: event.target.value.replace(/\D/, "") })
              }
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default JobNew;
