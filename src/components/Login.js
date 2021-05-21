import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

/* ライブラリ */
import { authentication, uiConfig } from "../lib/firebase";

function Login() {
  return (
    <div className="column panel-block">
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={authentication} />
    </div>
  );
};

export default Login;