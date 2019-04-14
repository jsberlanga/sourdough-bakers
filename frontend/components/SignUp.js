import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

import Form from "./styles/Form";
import Error from "./ErrorMessage";

import styled from "styled-components";

const Button = styled.button`
  margin: 2rem 0 0;
  position: relative;
  :disabled {
    background: ${props => props.theme.lightGrey3};
    cursor: default;
    :hover:after {
      transition: all 1s;
      content: "Please fill out the form";
      background: ${props => props.theme.pink};
      position: absolute;
      left: 110%;
      top: 0;
      padding: 0.7rem;
      width: 20rem;
      font-size: 1.4rem;
      letter-spacing: 2px;
      font-weight: 400;
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = async (e, signup) => {
    e.preventDefault();

    const res = await signup();
    console.log(res);

    // TODO use response to welcome the user like so?
    // if (res) {
    //   alert(`Welcome ${res.data.signup.name}`);
    // }

    this.setState({ name: "", email: "", password: "" });

    Router.push({
      pathname: "/"
    });
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, { loading, error }) => {
          return (
            <Form method="POST" onSubmit={e => this.handleSubmit(e, signup)}>
              <fieldset aria-busy={loading}>
                <h2>{this.props.title}</h2>
                <Error error={error} />
                <label htmlFor="name">
                  Name
                  <input
                    type="text "
                    name="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={this.handleChange}
                  />
                </label>
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
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={this.handleChange}
                  />
                  <Button
                    type="submit"
                    disabled={
                      !this.state.name ||
                      !this.state.email ||
                      !this.state.password
                    }
                  >
                    Submit
                  </Button>
                </label>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default SignUp;
