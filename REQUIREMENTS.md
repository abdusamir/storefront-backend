# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 


___Table of Contents___

## API Endpoints

#### Products 
- Index
  - HTTP verb `GET`
  - Endpoint:- `/api/products/`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of products`

    ```json
      {
        "status": 200,
        "data": 
          [ 
              {
                "id":1,
                "name":"example",
                "price":20.3,
                "description":"test description",
                "category":"TEST"
              },
              {
                "id":2,
                "name":"example2",
                "price":20.3,
                "description":"test description",
                "category":"TEST"
              }
          ],
        "message": "Request was successful"
      }
    ```
- Show
    - HTTP verb `GET`
  - Endpoint:- `/api/products/:id`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `A single product`

    ```json
      {
        "status": 200,
        "data": 
              {
                "id":1,
                "name":"example",
                "price":20.3,
                "description":"test description",
                "category":"TEST"
        },
        "message": "users retrieved successfully"
      }
- Create - **`token required`**
  - HTTP verb `POST`
  - Endpoint:- `/api/products/`
  - Request Body

    ```json
      {
          "name":"name",
          "price":20,
          "description":"description",
          "category":"category",
      }
    ```

  - Response Body -- `The created product`

    ```json
      {
        "status": 200,
        "data": {
          "name":"name",
          "price":20,
          "description":"description",
          "category":"category",
      },
        "message": "Request was successful"
      }
    ```

- Products by category
  - HTTP verb `GET`
  - Endpoint:- `/api/products/category/:category`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of products`

    ```json
      {
        "status": 200,
        "data": 
          [ 
              {
                "id":1,
                "name":"example",
                "price":20.3,
                "description":"test description",
                "category":"TEST"
              },
              {
                "id":1,
                "name":"example2",
                "price":20.3,
                "description":"test description",
                "category":"TEST"
              }
          ],
        "message": "Request was successful"
      }
    ```

#### Users

- Index - **`token required`**
  - HTTP verb `GET`
  - Endpoint:- `/api/users/`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of user objects`

    ```json
      {
        "status": 200,
        "users":  [
            {
              "id": 1,
              "email": "example@example.com",
              "firstName": "John",
              "lastName": "Smith"
            }
          ],
        "message": "Request was completed successfully"
      }
    ```
    
- Show - **`token required`**
  - HTTP verb `GET`
  - Endpoint:- `/api/users/:id`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `A single user`

    ```json
      {
        "status": 200,
        "data": 
            {
              "id": 1,
              "email": "example@example.com",
              "firstName": "John",
              "lastName": "Smith"
            },
        "message": "User returned successfully"
      }
    ```

- Create 
  - HTTP verb `POST`
  - Endpoint:- `/api/users/`
  - Request Body

    ```json
      {
          "email":"example@example.com",
          "first_name":"john",
          "last_name":"smith",
          "password":"password123"
      }
    ```

  - Response Body -- `A single user`

    ```json
      {
        "status": 200,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6InVzZXIxQGV4YW1wbGUiLCJmaXJzdF9uYW1lIjoiZXhhbXBsZSIsImxhc3RfbmFtZSI6ImV4YW1wbGUifSwiaWF0IjoxNjUwODEwNDg5fQ.Qd3PPaejk7afVc1QvREM3mrxy1wAqahGEDWXltz4Gbc",
        "message": "User created successfully"
      }
    ```
- Authenticate
  - HTTP verb `POST`
  - Endpoint:- `/api/users/`
  - Request Body

    ```json
      {
        "email":"example@example.com"
        "password":"password123"
      }
    ```

  - Response Body -- `A single user`

    ```json
      {
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6InVzZXIxQGV4YW1wbGUiLCJmaXJzdF9uYW1lIjoiZXhhbXBsZSIsImxhc3RfbmFtZSI6ImV4YW1wbGUifSwiaWF0IjoxNjUwODEwNDg5fQ.Qd3PPaejk7afVc1QvREM3mrxy1wAqahGEDWXltz4Gbc"
      }
    ```

#### Orders
- Current Order by user (args: user id)[token required]
- Completed Orders by user (args: user id)[token required]
- Add product to current order (args: user id) [token required]
- Create new order [token required]

## Data Shapes
#### Product
-  id
- name
- price
- category

#### User
- id
- email
- firstName
- lastName
- password

#### Orders
- id
- user_id
- status of order (active or complete)

#### Order_products
- id
- product_id
- order_id

