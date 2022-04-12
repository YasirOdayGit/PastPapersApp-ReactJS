import React, { useState, useEffect } from "react";
import { FaSchool } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart, AiOutlineArrowUp } from "react-icons/ai";
import ListTile from "../../components/ListTile/listTile";
import ImagesList from "../../components/ImagesList/ImagesList";
import { useAuth } from "../../auth/AuthContext";
import logo from "../../assets/logo_bland.svg";
import "./MainScreen.scss";
import { useGeneral } from "../../auth/GeneralContext";
// main function
function MainScreen() {
  const { schoolsList, currentUser, userModule } = useAuth();
  const [schoolIndex, setschoolIndex] = useState(0);
  const {
    favSchoolsList,
    handleFavChange,
    expandMenu,
    showAllCategories,
    toggleShowCategories,
  } = useGeneral();

  const changeSchool = (index) => {
    if (schoolIndex === -1) {
      setschoolIndex(0);
    }
    const doc = document.getElementById(schoolIndex);
    if (doc) {
      doc.classList.remove("selectedSchool");
    }
    document.getElementById(index).classList.add("selectedSchool");
    setschoolIndex(index);
  };

  useEffect(() => {
    document.getElementById("0").classList.toggle("selectedSchool");
  }, []);

  const rederCategories = () => {
    if (showAllCategories) {
      return (
        <>
          <ListTile
            index={0}
            item={
              <div
                className="verticalSchoolItem"
                style={{ color: schoolIndex === 0 ? "black" : null }}
                onClick={changeSchool.bind(this, 0)}
              >
                Recent
              </div>
            }
            prefixIcon={<FaSchool className="prefixIcon" />}
            key={`vlink-Recent`}
          />
          {schoolsList.map((item, index) => {
            return (
              <ListTile
                index={index + 1}
                item={
                  <div
                    className="verticalSchoolItem"
                    style={{
                      color: schoolIndex === index + 1 ? "black" : null,
                    }}
                    onClick={changeSchool.bind(this, index + 1)}
                  >
                    {item}
                  </div>
                }
                prefixIcon={<FaSchool className="prefixIcon" />}
                suffixIcon={
                  favSchoolsList.includes(item) ? (
                    <AiFillHeart />
                  ) : (
                    <AiOutlineHeart />
                  )
                }
                key={`vlink-${item}`}
                onClick={() => handleFavChange(index, schoolsList)}
              />
            );
          })}
        </>
      );
    }
  };

  return (
    <div className="app__homescreen">
      <div
        className={
          expandMenu
            ? "verticalSchoolsList hideSideMenu"
            : "verticalSchoolsList"
        }
      >
        <img src={logo} alt="Logo" />
        <p>Favourite Categories</p>
        {[...favSchoolsList].map((item, index) => {
          return (
            <ListTile
              index={index}
              item={
                <div
                  className="verticalSchoolItem"
                  style={{
                    color:
                      schoolsList[schoolIndex - 1] === item ? "black" : null,
                  }}
                  onClick={changeSchool.bind(
                    this,
                    schoolsList.indexOf(favSchoolsList[index]) + 1
                  )}
                >
                  {item}
                </div>
              }
              prefixIcon={<FaSchool className="prefixIcon" />}
              suffixIcon={<AiFillHeart />}
              key={`flink-${item}`}
              onClick={() =>
                handleFavChange(
                  schoolsList.indexOf(favSchoolsList[index]),
                  schoolsList
                )
              }
            />
          );
        })}
        <div className="allCategories">
          <p>All Categories</p>

          <AiOutlineArrowUp
            className={showAllCategories ? "faArrow down" : "faArrow"}
            onClick={toggleShowCategories}
          />
        </div>
        {rederCategories()}
      </div>

      <div className={expandMenu ? "content expandContent" : "content"}>
        <div className="schoolsList">
          <div
            className="schoolItem"
            id={`${0}`}
            onClick={changeSchool.bind(this, 0)}
            key={`link-Recent`}
          >
            Recent
          </div>
          {schoolsList.map((item, index) => {
            return (
              <div
                className="schoolItem"
                id={`${index + 1}`}
                onClick={changeSchool.bind(this, index + 1)}
                key={`link-${item}`}
              >
                {item}
              </div>
            );
          })}
        </div>
        <ImagesList
          school={schoolIndex === 0 ? "Recent" : schoolsList[schoolIndex - 1]}
          key={schoolIndex === 0 ? "Recent" : schoolsList[schoolIndex - 1]}
          searchparams=""
        />
      </div>
    </div>
  );
}

export default MainScreen;
