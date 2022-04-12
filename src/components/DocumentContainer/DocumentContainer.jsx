import React, { useState, useEffect } from "react";
import {
  BsHandThumbsDown,
  BsHandThumbsUp,
  BsHandThumbsDownFill,
  BsHandThumbsUpFill,
  BsDownload,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";
import "./DocumentContainer.scss";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useAuth } from "../../auth/AuthContext";
import { toast, Flip } from "react-toastify";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

function DocumentContainer(props) {
  let modules = props.module;
  const [expand, setexpand] = useState(false);
  const [force, setForce] = useState(0);
  const [differenceDate, setDifferenceDate] = useState("");
  const { userModule, addFavFun, downvoteFun, upvoteFun } = useAuth();
  const getUploadDate = () => {
    // console.log(Date.now(), modules.uploadDate.seconds * 1000);
    let difference = (Date.now() - modules.uploadDate.seconds * 1000) / 1000;
    // if its more than a day
    if (difference / 60 / 60 / 24 >= 1) {
      setDifferenceDate(Math.floor(difference / 60 / 60 / 24) + "d");
      // exit
      return;
    }
    // if its more than an hour
    if (difference / 60 / 60 >= 1) {
      setDifferenceDate(Math.floor(difference / 60 / 60) + "h");
      // exit
      return;
    }
    // if its more than a second
    if (difference / 60 >= 1) {
      setDifferenceDate(Math.floor(difference / 60) + "s");
      // exit
      return;
    }
    setDifferenceDate("just now");
  };

  //   const timeDifference = Math.abs(date2 - date1);
  useEffect(() => {
    getUploadDate();
  }, []);
  return (
    <div className="documentContainer">
      <div
        className="clickablePost"
        onClick={() => (window.location = `/post/${modules.id}`)}
      >
        <div className="headerInfo">
          {modules.category + " ● " + differenceDate}
        </div>
        <div className="headerTitle">{modules.title}</div>
      </div>
      {expand === true ? (
        modules.files.map((imageLink) => (
          <Zoom scrollableEl={false} key={imageLink}>
            <img
              alt="that wanaka tree"
              src={imageLink}
              width="100%"
              className="img"
            />
          </Zoom>
        ))
      ) : (
        <Zoom scrollableEl={false} key={modules.files[0]}>
          <img
            alt="that wanaka tree"
            src={modules.files[0]}
            width="100%"
            className="img"
          />
        </Zoom>
      )}
      <div className="showMoreButton" onClick={() => setexpand(!expand)}>
        {expand === true && modules.files !== 0
          ? "Hide"
          : "Show " + modules.files.length + " more images"}
      </div>
      <div className="miscInformation">
        <div
          className="upvote"
          onClick={async () => {
            let str = await upvoteFun(modules);
            if (str === "Like removed") {
              modules.likes.splice(modules.likes.indexOf(userModule.id), 1);
              setForce((old) => old + 1);
            }
            if (str === "Paper liked") {
              modules.likes.push(userModule.id);
              setForce((old) => old + 1);
            }
            if (str === "Vote changed") {
              modules.likes.push(userModule.id);
              modules.dislikes.splice(
                modules.dislikes.indexOf(userModule.id),
                1
              );
              setForce((old) => old + 1);
            }
            toast.info(str, {
              position: toast.POSITION.BOTTOM_RIGHT,
              hideProgressBar: true,
              closeOnClick: true,
              progress: undefined,
              transition: Flip,
              autoClose: 750,
              bodyStyle: {
                fontSize: "16px",
                fontWeight: "bold",
              },
            });
          }}
        >
          {userModule ? (
            modules.likes.includes(userModule.id) ? (
              <BsHandThumbsUpFill
                className="baIcon"
                title="upvote"
                textAnchor="upvote"
              />
            ) : (
              <BsHandThumbsUp
                className="baIcon"
                title="upvote"
                textAnchor="upvote"
              />
            )
          ) : (
            <BsHandThumbsUp
              className="baIcon"
              title="upvote"
              textAnchor="upvote"
            />
          )}
          <p>{modules.likes.length}</p>
        </div>
        <div
          className="upvote"
          onClick={async () => {
            let str = await downvoteFun(modules);
            if (str === "Dislike removed") {
              modules.dislikes.splice(
                modules.dislikes.indexOf(userModule.id),
                1
              );
              setForce((old) => old + 1);
            }
            if (str === "Paper disliked") {
              modules.dislikes.push(userModule.id);
              setForce((old) => old + 1);
            }
            if (str === "Vote changed") {
              modules.dislikes.push(userModule.id);
              modules.likes.splice(modules.likes.indexOf(userModule.id), 1);
              setForce((old) => old + 1);
            }
            toast.info(str, {
              position: toast.POSITION.BOTTOM_RIGHT,
              hideProgressBar: true,
              closeOnClick: true,
              progress: undefined,
              transition: Flip,
              autoClose: 750,
              bodyStyle: {
                fontSize: "16px",
                fontWeight: "bold",
              },
            });
          }}
        >
          {userModule ? (
            modules.dislikes.includes(userModule.id) ? (
              <BsHandThumbsDownFill
                className="baIcon"
                title="downvote"
                textAnchor="downvote"
              />
            ) : (
              <BsHandThumbsDown
                className="baIcon"
                title="downvote"
                textAnchor="downvote"
              />
            )
          ) : (
            <BsHandThumbsDown
              className="baIcon"
              title="downvote"
              textAnchor="downvote"
            />
          )}
          <p>{modules.dislikes.length}</p>
        </div>
        {/* <div
          className="upvote"
          onClick={() => {
            // modules.files
            console.log(modules.files[0]);
            //// LMAOS
            getDownloadURL(ref(getStorage(), modules.files[0]))
              .then((url) => {
                // `url` is the download URL for 'images/stars.jpg'
                console.log(url);
                // This can be downloaded directly:
                const xhr = new XMLHttpRequest();
                xhr.responseType = "blob";
                xhr.onload = (event) => {
                  const blob = xhr.response;
                };
                xhr.open("GET", url);
                xhr.send();
              })
              .catch((error) => {
                // Handle any errors
              });
          }}
        >
          {
            <BsDownload
              className="baIcon"
              title="download"
              textAnchor="download"
            />
          }
        </div> */}
        <div
          className="upvote"
          onClick={async () => {
            let str = await addFavFun(modules);
            setForce((old) => old + 1);

            console.log("====================================");
            console.log(str);
            console.log("====================================");
            toast.info(str, {
              position: toast.POSITION.BOTTOM_RIGHT,
              hideProgressBar: true,
              closeOnClick: true,
              progress: undefined,
              transition: Flip,
              autoClose: 750,
              bodyStyle: {
                fontSize: "16px",
                fontWeight: "bold",
              },
            });
          }}
        >
          {userModule ? (
            userModule.favDocuments.includes(modules.id) ? (
              <BsHeartFill className="baIcon" title="fav" textAnchor="fav" />
            ) : (
              <BsHeart className="baIcon" title="fav" textAnchor="fav" />
            )
          ) : (
            <BsHeart className="baIcon" title="fav" textAnchor="fav" />
          )}
        </div>
      </div>
    </div>
  );
}

export default DocumentContainer;
