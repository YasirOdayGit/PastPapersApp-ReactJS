import React, { useContext, useState, useEffect } from "react";
import UserModule from "../components/modules/UserModule";
import { auth, db } from "../Firebaseconfig";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  setDoc,
} from "firebase/firestore/lite";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userModule, setUserModule] = useState();
  const [schoolsList, setSchoolsList] = useState([]);
  const [loading, setLoading] = useState(true);
  // const mauth = auth;
  // const mdb = db;

  function logout() {
    setUserModule(undefined);
    setCurrentUser(undefined);
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log("first run");
      if (!userModule && user) {
        console.log("getting user");

        const userRef = doc(db, "users", user.uid);
        try {
          let data;
          await getDoc(userRef).then((snapshot) => {
            if (snapshot.data() === undefined) {
              console.log("no user found");
              let tempUser = new UserModule({
                accountType: "1",
                banned: false,
                email: user.email,
                favDocuments: [],
                favLimit: 25,
                id: user.uid,
                profilePicture: user.photoURL,
                uploadedPapers: [],
                userName: user.displayName,
                verified: true,
              });
              setUserModule(tempUser);
              setDoc(doc(db, "users", user.uid), {
                accountType: "1",
                banned: false,
                email: user.email,
                favDocuments: [],
                favLimit: 25,
                id: user.uid,
                profilePicture: user.photoURL,
                uploadedPapers: [],
                userName: user.displayName,
                verified: true,
              });
            } else {
              data = snapshot.data();
              setUserModule(new UserModule(data));
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
      if (schoolsList.length === 0) {
        console.log("getting user");

        try {
          const schoolsCollectionRef = doc(db, "schools_information", "main");

          const data = await getDoc(schoolsCollectionRef).then(
            (snapshot) => snapshot.data()["schools"]
          );
          setSchoolsList([...data]);
        } catch (error) {
          console.log(error);
        }
      }

      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function upvoteFun(documentModule) {
    console.log(documentModule);
    if (userModule && currentUser) {
      if (documentModule.likes.includes(userModule.id)) {
        updateDoc(doc(db, "pastpapers", documentModule.id), {
          likes: arrayRemove(userModule.id),
        });
        return "Like removed";
      } else {
        if (documentModule.dislikes.includes(userModule.id)) {
          updateDoc(doc(db, "pastpapers", documentModule.id), {
            dislikes: arrayRemove(userModule.id),
            likes: arrayUnion(userModule.id),
          });
          return "Vote changed";
        }
        updateDoc(doc(db, "pastpapers", documentModule.id), {
          likes: arrayUnion(userModule.id),
        });
        return "Paper liked";
      }
    } else {
      return "You have to be signed in";
    }
  }

  async function downvoteFun(documentModule) {
    if (userModule && currentUser) {
      if (documentModule.dislikes.includes(userModule.id)) {
        updateDoc(doc(db, "pastpapers", documentModule.id), {
          dislikes: arrayRemove(userModule.id),
        });
        return "Dislike removed";
      } else {
        if (documentModule.likes.includes(userModule.id)) {
          updateDoc(doc(db, "pastpapers", documentModule.id), {
            likes: arrayRemove(userModule.id),
            dislikes: arrayUnion(userModule.id),
          });
          return "Vote changed";
        }
        updateDoc(doc(db, "pastpapers", documentModule.id), {
          dislikes: arrayUnion(userModule.id),
        });
        return "Paper disliked";
      }
    } else {
      return "You have to be signed in";
    }
  }
  async function addFavFun(documentModule) {
    console.log(userModule);
    if (userModule && currentUser) {
      if (userModule.favLimit < 0) {
        return "Fav limit reached";
      }
      if (userModule.favDocuments.includes(documentModule.id)) {
        let x = userModule;
        x.favDocuments.splice(x.favDocuments.indexOf(documentModule.id), 1);
        setUserModule(x);
        updateDoc(doc(db, "users", userModule.id), {
          favDocuments: arrayRemove(documentModule.id),
        });
        return "Favourite removed";
      } else {
        let x = userModule;
        x.favDocuments.push(documentModule.id);

        x.favLimit--;
        setUserModule(x);
        updateDoc(doc(db, "users", userModule.id), {
          favDocuments: arrayUnion(documentModule.id),
          favLimit: increment(-1),
        });
        return "Paper favourited";
      }
    } else {
      return "You have to be signed in";
    }
  }

  const value = {
    currentUser,
    userModule,
    auth,
    db,
    logout,
    schoolsList,
    upvoteFun,
    downvoteFun,
    addFavFun,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
