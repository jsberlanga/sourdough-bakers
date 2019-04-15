import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import styled from "styled-components";

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  grid-gap: 2rem;
  * {
    width: 100%;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const SignUpPage = props => (
  <Columns>
    <SignUp title="Sign up for an account" />
    <SignIn title="Sign in" />
    <SignUp title="Reset your password" />
  </Columns>
);

export default SignUpPage;
