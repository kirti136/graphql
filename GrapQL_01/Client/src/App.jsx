import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import UserList from "./components/UserList";
import User from "./components/User";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <ToastContainer />
        <Routes>
          {/* <Route path="/" element={<UserList />} /> */}
          <Route path="/" element={<Register />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/user/:id" element={<User />} /> */}
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
