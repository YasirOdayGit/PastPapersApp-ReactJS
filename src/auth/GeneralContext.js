import React, { useContext, useState, useEffect } from "react";

const GeneralContext = React.createContext();

export function useGeneral() {
  return useContext(GeneralContext);
}

export function GeneralProvider({ children }) {
  const [expandMenu, setexpandMenu] = useState(true);
  const [showAllCategories, setshowAllCategories] = useState(true);
  const [expandPosts, setexpandPosts] = useState(false);
  const [favSchoolsList, setFavSchoolsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("expandMenu")) !== null) {
      setexpandMenu(JSON.parse(localStorage.getItem("expandMenu")));
    }

    if (JSON.parse(localStorage.getItem("expandPosts")) !== null) {
      setexpandPosts(JSON.parse(localStorage.getItem("expandPosts")));
    }

    if (JSON.parse(localStorage.getItem("showAllCategories")) !== null) {
      setshowAllCategories(
        JSON.parse(localStorage.getItem("showAllCategories"))
      );
    }

    if (typeof JSON.parse(localStorage.getItem("favSchoolsList")) !== null) {
      setFavSchoolsList(JSON.parse(localStorage.getItem("favSchoolsList")));
    }
    setLoading(false);
  }, []);

  function handleFavChange(index, schoolsList) {
    if (favSchoolsList.includes(schoolsList[index])) {
      let list = [...favSchoolsList];
      list.splice(list.indexOf(schoolsList[index]), 1);
      setFavSchoolsList((old) => [...list]);
      localStorage.setItem("favSchoolsList", JSON.stringify(list));
    } else {
      setFavSchoolsList((old) => {
        localStorage.setItem(
          "favSchoolsList",
          JSON.stringify([...old, schoolsList[index]])
        );
        console.log(schoolsList[index]);
        return [...old, schoolsList[index]];
      });
    }
  }

  function toggleShowCategories() {
    console.log("toggled");
    setshowAllCategories(!showAllCategories);
    localStorage.setItem(
      "showAllCategories",
      JSON.stringify(!showAllCategories)
    );
  }
  function toggleShowMenu() {
    setexpandMenu(!expandMenu);
    localStorage.setItem("expandMenu", JSON.stringify(!expandMenu));
  }

  function toggleExpandPosts() {
    setexpandPosts(!expandPosts);
    localStorage.setItem("expandPosts", JSON.stringify(!expandPosts));
  }
  const value = {
    expandMenu,
    expandPosts,
    favSchoolsList,
    showAllCategories,

    handleFavChange,
    toggleShowCategories,
    toggleShowMenu,
    toggleExpandPosts,
  };

  return (
    <GeneralContext.Provider value={value}>
      {!loading && children}
    </GeneralContext.Provider>
  );
}
