# NODEJS Rest API

NodeJS Rest API using some packages:

* restify
* restify-errors
* mongoose
* mongoose-timestamp
* dotenv
* jsonwebtoken
* bcryptjs
* restify-jwt-community

## ENVIRONMENT

Add .env and copy below, then fill those vars

```env
ENV=
PORT=
URL=
MONGODB_URI=
MONGODB_USER=
MONGODB_PASS=
MONGODB_DB=
JWT_SECRET=
```

## List of API

### Customer

| URI            | Method | Description             |
| -------------- | ------ | ----------------------- |
| /customers     | GET    | Get all customers       |
| /customers     | POST   | Post a Customer         |
| /customers/:id | GET    | Get a Customer by id    |
| /customers/:id | PUT    | Update a Customer by id |
| /customers/:id | DELETE | Delete a Customer by id |

### User

| URI      | Method | Description                   |
| -------- | ------ | ----------------------------- |
| /sign_up | POST   | Sign Up a User                |
| /sign_in | POST   | Sign In (Authenticate) a User |
