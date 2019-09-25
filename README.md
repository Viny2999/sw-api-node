# Star Wars API

A Simple Star Wars Node API

## Instruction

To use a local ambient run: `npm run dev`

## Endpoints

Get all planets: `GET localhost:3000/planets`

Search by ID: `GET localhost:3000/planets/<ID>`

Search by Name: `GET localhost:3000/planets/search/<NAME>`

Create a planet: `POST localhost:3000/planets`

Put a planet: `PUT localhost:3000/planets/<ID>`

Delete a planet: `DELETE localhost:3000/planets/<ID>`

### Request Body Create a Planet Example

`{ "name": "name", "climate": "climate", "terrain": "terrain" }`

## Tests

To start unit tests run `npm run test`
