<!-- Create User -->
mutation {
  createUser(
    name: "admin"
    email: "admin@example.com"
    password: "admin12345"
    role: "Admin" # Optional; defaults to "Reader"
    age: 30
  ) {
    id
    name
    email
    role
    age
  }
}

<!-- Login -->
mutation {
  login(
    email: "admin@example.com"
    password: "admin12345"
  ) {
    message
    user {
      id
      name
      email
      role
      age
      token
    }
  }
}

<!-- Get User -->
query {
  getUsers {
    id
    name
    email
    age
  }
}

<!-- Get User by ID -->
query {
  getUser(id: "673190240f1a523b6a182ebe") {
    id
    name
    email
    role
    age
    token
  }
}

<!-- Delete User -->
mutation {
  deleteUser(
    id: "67318fb80f1a523b6a182eb8"
  ) 
}

<!-- ******************************************************************* -->

graphQL_01 => used "apollo-server": "^3.13.0" => not use express
graphQL_02 => used "@apollo/server": "^4.11.2" => used express

<!-- ******************************************************************* -->

