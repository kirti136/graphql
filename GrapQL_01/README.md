mutation {
  createUser(
    name: "kirti bhosale"
    email: "kirti@example.com"
    password: "kirti12345"
    role: "Reader" 
    age: 30
  ) {
    id
    name
    email
    role
    age
  }
}


query {
  getUsers {
    id
    name
    email
    age
  }
}
