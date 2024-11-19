// src/components/UserList.js
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../graphql/queries";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const UserList = () => {
  const { data, loading, error } = useQuery(GET_USERS);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Users</h2>
      {data.getUsers.map((user) => (
        <div key={user.id}>
          <Link to={`/user/${user.id}`}>
            <p>
              {user.name} - {user.email}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UserList;
