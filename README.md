# Star Wars API

[![Build Status](https://travis-ci.org/Viny2999/sw-api-node.svg?branch=master)](https://travis-ci.org/Viny2999/sw-api-node)

A Simple Star Wars Node API.
Using API Pagination and Node Cache to cache Planets.

## Instruction

To use a local ambient run: `npm run dev`.
This application contains a Docker implementation, run: `docker-compose up` to create a container.

## Endpoints

Get all planets with pagination: `GET localhost:3000/planets?page=2&limit=10`
Without pagination, like: `GET localhost:3000/planets`. Default is Page 1 and Limit 10.

Search by Index: `GET localhost:3000/planets/<INDEX>`

Search by Name: `GET localhost:3000/planets/search/<NAME>`

Create a planet: `POST localhost:3000/planets`

Put a planet: `PUT localhost:3000/planets/<INDEX>`

Delete a planet: `DELETE localhost:3000/planets/<INDEX>`

### Example of Request Body to Create a Planet

```json
{
  "name": "Planet name",
  "climate": "Planet climate",
  "terrain": "Planet terrain"
}
```

## Tests

To start mocha unit tests run `npm run test`.
