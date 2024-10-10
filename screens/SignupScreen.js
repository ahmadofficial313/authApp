import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthAuthenticating] = useState(false);
   const authCtx = useContext(AuthContext)
  async function signupHandler({ email, password }) {
    setIsAuthAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token)
    } catch (error) {
      Alert.alert(
        "Authentication faild",
        "Could not create user , Please check your input and try again later"
      );

      setIsAuthAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="creating user ...." />;
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
