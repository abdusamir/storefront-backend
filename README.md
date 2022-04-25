# Welcome to storefront-backend API

----------------------------------------------------------------

### This API covers Users,orders and products routes with authenticatation and authorization
### Development done with TypeScript with Express and PostgreSQL for the backend
### Jasmine is used for testing and JWT for Authorization


___Table of Contents___

- [Installation](#installation)
- [Configuration](#config)
- [Building](#building)
- [Testing](#testing)

----
<div id="installation"></div>

## Installation

### First you need to have node and postgres installed on your machine
### then clone the repo and in the repo directory open terminal and type

```bash
  npm i -g yarn db-migrate
  yarn install
```

----------------------------------------------------------------
<div id="config"></div>

## Project configurations

### Database config
<tr>

### We will now start by creating two databases (one for testing and one for development)
### First you must have PostgreSQL installed and added to your environment varaibles
### open terminal and type the following to create the databases

```sql
  psql postgres
  CREATE USER storefront_user WITH PASSWORD 'password123';
  CREATE DATABASE storefront;
  \c storefront
  GRANT ALL PRIVILEGES ON DATABASE storefront TO storefront_user;
  CREATE DATABASE storefront_test;
  \c storefront_test
  GRANT ALL PRIVILEGES ON DATABASE storefront_test TO storefront_user;
```

### Now you successfully created the necessary databases to start the project. 

### Environment Variables Config
<tr>

### The only thing left is to setup your environment varaibles
### in terminal type

```bash
  touch .env
```

### then add the following in your .env file

``` bash
PORT =3030
POSTGRES_HOST=localhost
POSTGRES_DB=storefront
POSTGRES_USER=storefront_user
POSTGRES_TEST_DB=storefront_test
POSTGRES_PASSWORD=password123
ENV=dev
TOKEN_SECRET=your-secret-token
BCRYPT_PASSWORD=your-password
SALT_ROUNDS=10
POSTGRES_PORT=5432
```

----------------------------------------------------------------

<div id="building"></div>

 ## Building

 ### Open your terminal once again and type
 
 ```bash
 db-migrate up
 yarn start
 ```

 ### Now Express Server should be running on port 3030 and PostgreSQL Server is running on port 5432.
 ### Open any browser any type <a href="http://localhost:3030/">http://localhost:3030/</a> and you should see the home page of the API.

 ----------------------------------------------------------------
 <div id="testing"></div>

 ## Testing 
 
 ---
 
 in your terminal type 
 
 ```bash
 yarn test
 ```
