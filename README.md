# EmployeeHub Backend
EmployeeHub is a GraphQL-based backend service for managing employee records. The system includes features for authentication, employee data management, and various queries with optional filters, pagination, and detailed data retrieval. It supports role-based access control (RBAC) to ensure secure and efficient management of sensitive employee data.

## Features

##### 1. Authentication & Authorization:
    --> JWT-based login and register functionalities.
    --> Role-based access control (e.g., admin, superadmin, employee).
    --> View a list of admins.
##### 2. Employee Management
    --> Add new employees.
    --> Update employee details (restricted by roles).
    --> List employees with optional filters.
    --> Retrieve detailed information for a single employee.

#### 3. Query Enhancements
    -->   Pagination for large datasets.
    -->   Sorting and filtering capabilities for employee listings.

### Technolgies Used:
###### Backend: Node.js, Express.js
###### GraphQL Library: Apollo Server
###### Database: MongoDB (with Mongoose for ORM)
###### Authentication: JSON Web Tokens (JWT)
###### Hosting: Vercel


## Installation and Setup
#### Clone the repossitory:
```bash 
git clone https://github.com/jai1726/EmployeeHub.git
cd EmployeeHub
```

#### Backend Setup

#### Install Dependencies
```bash 
npm install
```

#### Create .env file
```bash
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

#### Start the Backend Server
```bash
node index.js 
```

#### Access the App 
Open your browser and go to http://localhost:4000


## GraphQL API Schema
  ### Queries
  #### 1. List Employees with Optional Filters
   ##### Query Name: listEmployees
   ##### Description: Retrieve a list of employees with optional filters like name, role, and class.
   ##### Arguments:
    --> filter (optional): Object containing filters.
    --> pagination (optional): Object with page and limit.
 ##### Example Request:
```bash
query ListEmployees($filter: EmployeeFilter, $pagination: PaginationInput) {
  listEmployees(filter: $filter, pagination: $pagination) {
    id
    name
    age
    role
    class
  }
}
```
##### Example Variables:
```bash
{
  "filter": { "role": "employee" },
  "pagination": { "page": 1, "limit": 10 }
}
```
##### Example Response:
```bash
{
  "data": {
    "listEmployees": [
      {
        "id": "64fcf4ea5b4379c4b8df7d27",
        "name": "Alice Johnson",
        "age": 30,
        "role": "employee",
        "class": "A"
      },
      {
        "id": "64fcf4ea5b4379c4b8df7d28",
        "name": "Bob Smith",
        "age": 35,
        "role": "employee",
        "class": "A"
      }
    ]
  }
}
```

 #### 2. Retrieve Single Employee
   ##### Query Name: employee
   ##### Description:  Get detailed information about a single employee by ID.
   ##### Arguments:
    --> id: The unique identifier of the employee.
 ##### Example Request:
```bash
query GetEmployee($id: ID!) {
  employee(id: $id) {
    id
    name
    age
    class
    attendance
  }
}

```
##### Example Variables:
```bash
{
  "filter": { "role": "employee" },
  "pagination": { "page": 1, "limit": 10 }
}
```
##### Example Response:
```bash
{
  "data": {
    "employee": {
      "id": "64fcf4ea5b4379c4b8df7d27",
      "name": "Alice Johnson",
      "age": 30,
      "role": "employee",
      "class": "A",
      "attendance": 92.5
    }
  }
}
```
 #### 3.List Employees with Pagination
    -->Same as List Employees query but requires pagination.

    
### Mutations
  #### 1.Register
   ##### Mutation Name: register
   ##### Description: Register a new user (employee/admin).
   ##### Arguments:
    --> input: Object with user registration details.
    
 ##### Example Request:
```bash
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    token
    user {
      id
      name
      role
    }
  }
}

```
##### Example Variables:
```bash
{
  "input": {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123",
    "role": "employee"
  }
}

```
##### Example Response:
```bash
{
  "data": {
    "register": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "64fcf4ea5b4379c4b8df7d27",
        "name": "John Doe",
        "role": "employee"
      }
    }
  }
}

```

  #### 2.Login
   ##### Mutation Name: login
   ##### Description:  Authenticate an existing user
   ##### Arguments:
    --> input:
    email: User email.
    password: User password.
    
 ##### Example Request:
```bash
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      name
      role
    }
  }
}

```
##### Example Variables:
```bash
{
  "email": "johndoe@example.com",
  "password": "password123"
}

```
##### Example Response:
```bash
{
  "data": {
    "login": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "64fcf4ea5b4379c4b8df7d27",
        "name": "John Doe",
        "role": "employee"
      }
    }
  }
}
```

#### 3.Add Employee
   ##### Mutation Name: addEmployee
   ##### Description: Add a new employee (admin-only).
   ##### Arguments:
    --> input:input: Employee details
    
 ##### Example Request:
```bash
mutation AddEmployee($input: EmployeeInput!) {
  addEmployee(input: $input) {
    id
    name
    age
    role
  }
}


```
##### Example Variables:
```bash
{
  "input": {
    "name": "Alice Johnson",
    "age": 30,
    "role": "employee",
    "class": "B",
    "attendance": 85.5
  }
}


```
##### Example Response:
```bash
{
  "data": {
    "addEmployee": {
      "id": "64fcf4ea5b4379c4b8df7d29",
      "name": "Alice Johnson",
      "age": 30,
      "role": "employee"
    }
  }
}

```
---


## **Project Folder Structure**
```bash
EmployeeHub/
├── models/
│   └── User.js        # Mongoose schema for user/employee
├── resolvers/
│   ├── User.js        # GraphQL query,mutation resolvers    
├── typedefs/
│   └── User.js        # GraphQL typedefs
├── db.js              # MongoDB connection logic        
├── index.js           # Main server entry point
├── vercel.json        # Vercel deployment configuration
├── package.json
└── .env  
```
---


### Contributors
##### Dende Jagadeesh
jagadeeshdende@gmail.com
Linkedin:https://www.linkedin.com/in/jagadeesh-dende-67b625224/
