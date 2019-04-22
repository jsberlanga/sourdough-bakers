import React, { Component } from "react";
import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";

class Profile extends Component {
  state = {
    object: this.props.profile
  };
  render() {
    return (
      <div>
        <Query query={CURRENT_USER_QUERY}>
          {data => {
            console.log(data);
            const { me } = data.data;
            return (
              <>
                <h1>Hi {me.name}. This is your Profile Page.</h1>
                <h2>
                  You can edit it so different people can check you and your
                  products.
                </h2>
              </>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Profile;
