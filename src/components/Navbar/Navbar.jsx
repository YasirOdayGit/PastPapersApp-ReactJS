import "./Navbar.scss";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { useAuth } from "../../auth/AuthContext";
import { useGeneral } from "../../auth/GeneralContext";
import { useRef, useEffect } from "react";
const Navbar = () => {
  const { currentUser, userModule } = useAuth();
  const { toggleShowMenu } = useGeneral();
  const searchParams = useRef();

  useEffect(() => {
    document.getElementById("searchBox").onkeydown = function (e) {
      if (e.key == "Enter") {
        window.location =
          "/search?q=" +
          searchParams.current.value
            .trim()
            .split(" ")
            .map((item, index) => (index !== 0 ? "&" : "") + item)
            .join("");
      }
    };
  }, []);

  return (
    <div className="app__navbar">
      <div className="leftSide">
        <AiOutlineMenu className="menuButton" onClick={toggleShowMenu} />
        <h1
          onClick={() => (window.location = "/")}
          style={{ cursor: "pointer" }}
        >
          Past Papers <span>Land</span>
        </h1>
      </div>
      <div className="rightSide">
        <div className="searchField">
          <input
            type="text"
            placeholder="search paper"
            ref={searchParams}
            id="searchBox"
          ></input>
          <AiOutlineSearch
            className="searchButton"
            onClick={() => {
              window.location =
                "/search?q=" +
                searchParams.current.value
                  .trim()
                  .split(" ")
                  .map((item, index) => (index !== 0 ? "&" : "") + item)
                  .join("");
            }}
          />
        </div>
        {userModule ? (
          <img
            src={userModule.profilePicture}
            className="accountCircle"
            onClick={() => {
              currentUser
                ? (window.location = "/account")
                : (window.location = "/newuser");
            }}
          />
        ) : (
          <MdAccountCircle
            className="accountCircle"
            onClick={() => {
              currentUser
                ? (window.location = "/account")
                : (window.location = "/newuser");
            }}
          />
        )}
      </div>
    </div>
  );
};
export default Navbar;
