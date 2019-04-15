import Reset from "../components/Reset";

const ResetPage = props => (
  <>
    <p>Reset Your Password</p>
    <Reset resetToken={props.query.resetToken} />
  </>
);

export default ResetPage;
