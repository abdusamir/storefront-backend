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

  - Response Body -- `Array of user products`

    ```json
      {
        "status": 200,
        "data": 
          [ 
              {
                "id":1
                "name":"example",
                "price":20.3,
                "description":"test description"
                "category":"TEST"
              },
              {
                "id":1
                "name":"example2",
                "price":20.3,
                "description":"test description"
                "category":"TEST"
              }
          ]
        },
        "message": "users retrieved successfully"
      }
    ```
- Show
- Create [token required]
- Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create 
- Authenticate

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

