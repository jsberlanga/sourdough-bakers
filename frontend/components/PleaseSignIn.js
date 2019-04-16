import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Signin from "./SignIn";

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data: { me }, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!me)
        return (
          <div>
            <h2>Please Sign in</h2>
            <Signin />
          </div>
        );

      return <>{props.children}</>;
    }}
  </Query>
);

export default PleaseSignIn;
