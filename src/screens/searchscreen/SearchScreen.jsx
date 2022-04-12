import React, { useEffect, useState } from "react";
import ImagesList from "../../components/ImagesList/ImagesList";
import Navbar from "../../components/Navbar/Navbar";
import "./SearchScreen.scss";

export default function SearchScreen() {
  return (
    <div className="app_searchScreen">
      <ImagesList school={"searching"} key={"SearchKey"} />
    </div>
  );
}
