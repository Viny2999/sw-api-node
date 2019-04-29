# Star Wars API
A Simple Star Wars Node API for a B2W challenge

## Instruction
To use a local database set in .env `LOCAL=true` and add local uri in config/uri.json.

## Endpoints

Get all planets: `GET localhost:3000/planets`  

Search by ID: `GET localhost:3000/planets/<ID>`

Search by Name: `GET localhost:3000/planets/search/<NAME>`

Post a planet: `POST localhost:3000/planets`

Put a planet: `PUT localhost:3000/planets/<ID>`

Delete a planet: `DELETE localhost:3000/planets/<ID>`

## Tests

To start unit tests run `npm test`
