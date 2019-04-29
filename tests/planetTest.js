const ERRO = require("../utils/erros");
const request = require("supertest");
const app = require("../app");

/**
 * Testing endpoint of all planets
 */
describe("GET /planets", () => {
	it("Response 200 with a list of all planets", done => {
		request(app)
			.get("/planets")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200, done);
	});
});

/**
 * Testing endpoint of a planet per id
 */
describe("GET /planets/:id", () => {
	it("Response 200 to the a planet per id", done => {
		request(app)
			.get("/planets/1")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200, done);
	});
});

/**
 * Testing endpoint of a planet per name
 */
describe("GET /planets/search/:name", () => {
	it("Response 200 to the a planet per name", done => {
		request(app)
			.get("/planets/search/Tatooine")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200, done);
	});
});

/**
 * Testing endpoint of insertion planet
 */
describe("POST /planets", () => {
	let data = {
		index: 9999,
		name: "mock",
		climate: "mock",
		terrain: "mock"
	};
	it("Response 200 to the post planet", done => {
		request(app)
			.post("/planets")
			.send(data)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200, done)
	});
});

/**
 * Testing endpoint of update planets
 */
describe("PUT /planets/:id", () => {
	let data = {
		climate: "Ice"
	};
	it("Response 200 to the update planet", done => {
		request(app)
			.put("/planets/9999")
			.send(data)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200, done);
	});
});

/**
 * Testing endpoint of remove planets
 */
describe("DELETE /planets/:id", () => {
	it("Response 200 to the remove planet", done => {
		request(app)
			.delete("/planets/9999")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200, done);
	});
});

/**
 * Testing endpoint insertion planet (Missing Information)
 */
describe("POST /planets", () => {
	let data = {
		index: 9999,
		climate: "mock",
		terrain: "mock"
	};
	it("Response 400 to the post planet (Missing Information)", done => {
		request(app)
			.post("/planets")
			.send(data)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(400, ERRO.MISSING_INFORMATION)
			.end(err => {
				if (err) return done(err);
				done();
			});
	});
});

/**
 * Testing wrong endpoint
 */
describe("GET /LukeSkywalker", () => {
	it("Response 404 to the Wrong Endpoint", done => {
		request(app)
			.post("/LukeSkywalker")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(404, ERRO.NOT_FOUND)
			.end(err => {
				if (err) return done(err);
				done();
			});
	});
});