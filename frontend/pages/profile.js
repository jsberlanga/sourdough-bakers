import PleaseSignIn from "../components/PleaseSignIn";
import Profile from "../components/Profile";

const ProfilePage = props => (
  <>
    <PleaseSignIn>
      <Profile />
    </PleaseSignIn>
  </>
);

export default ProfilePage;
