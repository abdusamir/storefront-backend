# Welcome to storefront-backend API

----------------------------------------------------------------

### This API covers Users,orders and products routes with authenticatation and authorization
### Development done with TypeScript with Express and PostgreSQL for the backend
### Jasmine is used for testing and JWT for Authorization


## Table of Contents

- [Installation](#installation)
- [Building](#building)
- [Testing](#testing)

----
<div id="installation"></div>

## Installation

--- 
### First you need to have node and postgres installed on your machine
### then clone the repo and in the repo directory open terminal and type
```bash
  npm i -g yarn db-migrate
  yarn install
```
### now you need to have two databases connections available (one for development and one for testing)

### The only thing left is to setup your environment varaibles
### in terminal type

```bash
  touch .env
```
### then add the following in your .env file
``` bash
PORT =3030
POSTGRES_HOST=localhost
POSTGRES_DB=your-database-name
POSTGRES_USER=your-username
POSTGRES_TEST_DB=your-testing-database
POSTGRES_PASSWORD=your-password
ENV=dev
TOKEN_SECRET=your-secret-token
BCRYPT_PASSWORD=your-password
SALT_ROUNDS=10
POSTGRES_PORT=5432
```
----------------------------------------------------------------
<div id="building"></div>

 ## Building
 
 ---

 ### Open your terminal once again and type
 
 ```bash
 db-migrate up
 yarn build
 yarn start
 ```
 ### and you should see your server running on port 3030 on your localhost

 ----------------------------------------------------------------
 <div id="testing"></div>

 ## Testing 
 
 ---
 
 in your terminal type 
 
 ```bash
 yarn test
 ```
