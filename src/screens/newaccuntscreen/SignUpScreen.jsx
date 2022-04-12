import { useEffect, useRef } from "react";
import "./SignUpScreen.scss";
import splash from "../../assets/sign-up.png";
import logo from "../../assets/logo_bland.svg";
import { toast, Flip } from "react-toastify";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

///
//
///
function SignUpScreen() {
  const loadingToast = useRef(null);

  const signInWithGoogle = async () => {
    loadingToast.current = toast.loading("waiting to log in", {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      closeOnClick: true,
      progress: undefined,
      transition: Flip,
      autoClose: 2500,
    });
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        console.log("success");
        toast.dismiss(loadingToast.current);
        toast.success("logged in", {
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,
          closeOnClick: true,
          progress: undefined,
          transition: Flip,
          autoClose: 2500,
        });
        window.location = "/account";
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log("canceled");
        toast.dismiss(loadingToast.current);
        toast.error("something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,
          closeOnClick: true,
          progress: undefined,
          transition: Flip,
          autoClose: 2500,
        });
        // ...
      });
  };

  return (
    <div className="app__accountscreen">
      <div className="splash">
        <img src={splash} alt="splash" />
      </div>
      <div className="app_accountscreen-rightSide">
        <img src={logo} alt="splash" />

        <div className="gmailButton" onClick={signInWithGoogle}>
          continue with google
        </div>
        <p>
          createing an account will allow you to like, upload, and save posts
        </p>
        <p className="app__accountscreen-tc">
          by continuing with google you agree to the <span>terms </span>
          and
          <span> privacy policy</span>
        </p>
      </div>
    </div>
  );
}

export default SignUpScreen;
