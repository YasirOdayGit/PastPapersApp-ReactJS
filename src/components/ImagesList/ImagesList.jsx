import React, { useState, useRef, useCallback, useEffect } from "react";
import DocumentContainer from "../DocumentContainer/DocumentContainer";
import useLoadingDocumentHook from "./useDocumentApped";
import "./ImagesList.scss";
import { useGeneral } from "../../auth/GeneralContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ImagesList(props) {
  // page number? we start at one
  const [pageNumber, setPageNumber] = useState(1);
  let { documents, canLoad, allOut, hasError } = useLoadingDocumentHook(
    pageNumber,
    props.school
  );
  const observer = useRef();

  const lastBookElementRef = useCallback(
    (node) => {
      if (!canLoad) return;
      // unhook the previous one so we observe only the latest one
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !allOut) {
          setPageNumber((oldpage) => oldpage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [canLoad, allOut]
  );

  return (
    <div className="app__ImageList">
      {documents.map((item, index) =>
        documents.length === index + 1 ? (
          <div ref={lastBookElementRef} key={item.id + index}>
            <DocumentContainer module={item} />
          </div>
        ) : (
          <div>
            <DocumentContainer key={item.id + index} module={item} />
          </div>
        )
      )}
      {/* <div>{canLoad && "Loading..."}</div>
      <div>{hasError && "Error"}</div> */}
      <div className="allOut">{allOut && "You've reached the bottom"}</div>
      <div className="allOut">{hasError && "An Error Occured"}</div>
    </div>
  );
}

export default ImagesList;
