import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { GeneralProvider } from "./auth/GeneralContext";

// components
import Navbar from "./components/Navbar/Navbar";
import MainScreen from "./screens/mainscreen/MainScreen";
import SignUpScreen from "./screens/newaccuntscreen/SignUpScreen";
import AccountScreen from "./screens/accountacreen/AccountScreen";
import PrivateRoute from "./screens/PrivateRoute";
import ExistingRoute from "./screens/ExistingRoute";
import SearchScreen from "./screens/searchscreen/SearchScreen";
import SinglePostScreen from "./screens/SinglePostScreen/SinglePostScreen";
import { ToastContainer } from "react-toastify";
import Screen404 from "./screens/Screen404/Screen404";

// app
function App() {
  return (
    <Router>
      <AuthProvider>
        <GeneralProvider>
          <ToastContainer />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <MainScreen />
                </>
              }
            />
            <Route
              path="/newuser"
              element={
                <ExistingRoute>
                  <SignUpScreen />
                </ExistingRoute>
              }
            />
            <Route
              path="/account"
              element={
                <PrivateRoute>
                  <AccountScreen />
                </PrivateRoute>
              }
            />

            <Route
              path="/search"
              element={
                <>
                  <Navbar />
                  <SearchScreen />
                </>
              }
            />
            <Route
              path="/post/*"
              element={
                <>
                  <Navbar />
                  <SinglePostScreen />
                </>
              }
            />
            <Route path="/*" element={<Screen404 />} />
          </Routes>
        </GeneralProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
