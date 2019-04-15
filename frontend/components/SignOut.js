import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import { CURRENT_USER_QUERY } from "./User";

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signout {
      message
    }
  }
`;

class SignOut extends React.Component {
  handleSignOut = signout => {
    const res = signout();

    Router.push({
      pathname: "/signup"
    });
  };
  render() {
    return (
      <Mutation
        mutation={SIGNOUT_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {signout => <a onClick={() => this.handleSignOut(signout)}>Sign Out</a>}
      </Mutation>
    );
  }
}

export default SignOut;
