import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import Form from "./styles/Form";
import Error from "./ErrorMessage";

import Success from "./styles/SuccessMessage";
import FormButton from "./styles/FormButton";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class RequestReset extends Component {
  state = {
    email: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = async (e, reset) => {
    e.preventDefault();

    const success = await reset();
    // console.log(res);

    // TODO use response to welcome the user like so?
    // if (res) {
    //   alert(`Welcome ${res.data.signup.name}`);
    // }

    this.setState({ name: "", email: "", password: "" });
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(reset, { loading, error, called }) => {
          return (
            <Form method="POST" onSubmit={e => this.handleSubmit(e, reset)}>
              <fieldset aria-busy={loading}>
                <h2>{this.props.title}</h2>
                <Error error={error} />
                {!error && !loading && called && (
                  <Success>Success! Check your email for a reset link.</Success>
                )}
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={this.handleChange}
                  />
                </label>

                <FormButton type="submit" disabled={!this.state.email}>
                  Request
                </FormButton>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default RequestReset;
