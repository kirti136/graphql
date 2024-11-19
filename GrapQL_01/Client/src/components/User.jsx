// src/components/User.js
import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import { DELETE_USER } from "../graphql/mutations";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const User = () => {
  const { id } = useParams();
  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: () => toast.success("User deleted"),
    onError: (err) => toast.error(err.message),
  });

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id },
  });

  const navigate = useNavigate();

  const handleDelete = () => {
    deleteUser({ variables: { id } });
    navigate("/");
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {data.getUser.name}</p>
      <p>Email: {data.getUser.email}</p>
      <p>Role: {data.getUser.role}</p>
      <p>Age: {data.getUser.age}</p>
      <button onClick={handleDelete}>Delete User</button>
    </div>
  );
};

export default User;
