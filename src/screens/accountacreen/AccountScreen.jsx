import question from "../../assets/question.png";
import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../auth/AuthContext";
import { MdEmail, MdStars, MdAccountBox } from "react-icons/md";
import "./AccountScreen.scss";
import { RiArrowLeftCircleFill } from "react-icons/ri";
import { FaFileUpload } from "react-icons/fa";

function AccountScreen() {
  const { userModule, auth, logout } = useAuth();
  const fsingOut = async () => {
    try {
      await logout();

      window.location = "/newuser";
    } catch (error) {
      toast.error("an error occured", {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        closeOnClick: true,
        progress: undefined,
        transition: Flip,
        autoClose: 2500,
      });
    }
  };

  return (
    <>
      <div className="app_accountscreen-account">
        <RiArrowLeftCircleFill
          className="app_accountscreen-backButton"
          onClick={() => {
            window.location = "/";
          }}
        />
        <img
          src={userModule.profilePicture ? userModule.profilePicture : question}
          alt="profile picture"
        />
        <h1> Welcome, {auth.currentUser.displayName}</h1>
        <div className="app__accountscreen-infoContainer">
          <div className="app_accountscreen-icons">
            <MdEmail />
            {userModule.email}
          </div>
          <div className="app_accountscreen-icons">
            <MdAccountBox />
            {userModule.userName}
          </div>
          <div className="app_accountscreen-icons">
            <MdStars />

            {userModule.accountType === "1" ? "Regular user" : "VIP user"}
          </div>

          <div className="app_accountscreen-icons">
            <FaFileUpload />
            5Mb upload limit
          </div>
        </div>
        <button className="signoutbutton" onClick={fsingOut}>
          log out
        </button>
      </div>
    </>
  );
}

export default AccountScreen;
