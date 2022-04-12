import { useEffect, useState } from "react";
import "./SinglePostScreen.scss";
import DocumentContainer from "../../components/DocumentContainer/DocumentContainer";
import { getDoc, collection, doc } from "firebase/firestore/lite";
import { useAuth } from "../../auth/AuthContext";
import DocumentModule from "../../components/modules/DocumentModule";

function SinglePostScreen() {
  const [document, setdocument] = useState();
  const [error, setError] = useState(false);
  const [found, setfound] = useState(true);
  const { db } = useAuth();
  useEffect(() => {
    async function getDocument() {
      const string = window.location.pathname.substring(
        window.location.pathname.lastIndexOf("/") + 1
      );
      try {
        let singleq = await getDoc(doc(db, "pastpapers", string));
        if (!singleq.data()) {
          setfound(false);
        } else {
          console.log(singleq.data());
          setdocument(new DocumentModule(singleq.data()));
        }
      } catch (error) {
        setError(true);
        console.log("there is an error", error);
      }
    }

    getDocument();
  }, []);

  return (
    <div className="app_singlePostScreen">
      {error ? (
        <div className="errorContainer">There was an error</div>
      ) : document ? (
        <div className="docContainer">
          <DocumentContainer module={document}></DocumentContainer>
        </div>
      ) : found ? null : (
        <div className="errorContainer">Paper not found 🤖</div>
      )}
    </div>
  );
}

export default SinglePostScreen;
