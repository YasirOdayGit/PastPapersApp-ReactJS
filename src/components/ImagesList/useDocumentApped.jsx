import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore/lite";
import DocumentModule from "../modules/DocumentModule";
import { useAuth } from "../../auth/AuthContext";

export default function useLoadingDocumentHook(pageNumber, category) {
  const { db } = useAuth();

  // documents list
  const [documents, setdocuments] = useState([]);
  // can we load more?
  const [canLoad, setcanLoad] = useState(true);
  // are we all out?
  const [allOut, setallOut] = useState(false);
  const [hasError, setHasError] = useState(false);
  // lastDocumentSnap
  const [lastDocumentSnap, setlastDocumentSnap] = useState();
  useEffect(() => {
    const getMoreDocuments = async () => {
      setcanLoad(false);
      let loadedDocuments = [];
      try {
        let queries;
        if (category === "Recent") {
          queries = await getDocs(
            lastDocumentSnap
              ? query(
                  collection(db, "pastpapers"),
                  orderBy("uploadDate", "desc"),
                  where("deleted", "==", false),
                  startAfter(lastDocumentSnap),
                  limit(3)
                )
              : query(
                  collection(db, "pastpapers"),
                  orderBy("uploadDate", "desc"),
                  where("deleted", "==", false),
                  limit(3)
                )
          );
        } else if (category === "searching") {
          let paramsList = window.location.search.slice(3).split("&");
          console.log(paramsList);
          queries = await getDocs(
            lastDocumentSnap
              ? query(
                  collection(db, "pastpapers"),
                  where("deleted", "==", false),
                  where("tags", "array-contains-any", paramsList),
                  startAfter(lastDocumentSnap),
                  limit(3)
                )
              : query(
                  collection(db, "pastpapers"),
                  where("deleted", "==", false),
                  where("tags", ">=", paramsList),
                  limit(3)
                )
          );
        } else {
          queries = await getDocs(
            lastDocumentSnap
              ? query(
                  collection(db, "pastpapers"),
                  orderBy("uploadDate", "desc"),
                  where("deleted", "==", false),
                  where("category", "==", category),
                  startAfter(lastDocumentSnap),
                  limit(3)
                )
              : query(
                  collection(db, "pastpapers"),
                  orderBy("uploadDate", "desc"),
                  where("category", "==", category),
                  where("deleted", "==", false),
                  limit(3)
                )
          );
        }

        if (queries.docs.length === 0) {
          setallOut(true);
          setcanLoad(true);

          return;
        }
        for (var i = 0; i < Math.min(10, queries.docs.length); i++) {
          loadedDocuments.push(new DocumentModule(queries.docs[i].data()));
          setlastDocumentSnap(queries.docs[i]);
        }
        setdocuments((old) => [...old, ...loadedDocuments]);
      } catch (error) {
        console.log(error);
        setallOut(true);
        setHasError(true);
        setcanLoad(true);
      }
      setcanLoad(true);
    };
    if (canLoad && !allOut) {
      getMoreDocuments();
    }
  }, [pageNumber]);

  return { documents, canLoad, allOut, hasError, lastDocumentSnap };
}
