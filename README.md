# NODEJS Rest API

NodeJS Rest API using some packages:

* restify
* restify-errors
* mongoose
* mongoose-timestamp
* dotenv

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
