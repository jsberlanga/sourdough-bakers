import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import Form from "./styles/Form";
import Error from "./ErrorMessage";

import Success from "./styles/SuccessMessage";
import FormButton from "./styles/FormButton";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

class Reset extends Component {
  state = {
    password: "",
    confirmPassword: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = async (e, reset) => {
    e.preventDefault();

    const success = await reset();

    this.setState({ password: "", confirmPassword: "" });
  };

  render() {
    const { password, confirmPassword } = this.state;
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password,
          confirmPassword
        }}
      >
        {(reset, { loading, error, called }) => {
          return (
            <Form method="POST" onSubmit={e => this.handleSubmit(e, reset)}>
              <fieldset aria-busy={loading}>
                <h2>{this.props.title}</h2>
                <Error error={error} />

                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={this.handleChange}
                  />
                </label>
                <label htmlFor="confirmPassword">
                  Confirm your Password
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your Password"
                    value={confirmPassword}
                    onChange={this.handleChange}
                  />
                </label>

                <FormButton
                  type="submit"
                  disabled={!this.state.password || !this.state.confirmPassword}
                >
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

export default Reset;
