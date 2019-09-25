import { NOT_FOUND, MISSING_INFORMATION } from '../../utils/erros.json';
import request from 'supertest';
import { App } from '../app';

/**
 * Testing endpoint of all planets
 */
describe('GET /planets', () => {
  it('Response 200 with a list of all planets', done => {
    request(App)
      .get('/planets')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

/**
 * Testing endpoint of a planet per id
 */
describe('GET /planets/:id', () => {
  it('Response 200 to the a planet per id', done => {
    request(App)
      .get('/planets/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

/**
 * Testing endpoint of a planet per name
 */
describe('GET /planets/search/:name', () => {
  it('Response 200 to the a planet per name', done => {
    request(App)
      .get('/planets/search/Tatooine')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

/**
 * Testing endpoint of insertion planet
 */
describe('POST /planets', () => {
  let data = {
    index: 9999,
    name: 'mock',
    climate: 'mock',
    terrain: 'mock'
  };
  it('Response 200 to the post planet', done => {
    request(App)
      .post('/planets')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, done);
  });
});

/**
 * Testing endpoint of update planets
 */
describe('PUT /planets/:id', () => {
  let data = {
    climate: 'Ice'
  };
  it('Response 200 to the update planet', done => {
    request(App)
      .put('/planets/9999')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

/**
 * Testing endpoint of remove planets
 */
describe('DELETE /planets/:id', () => {
  it('Response 200 to the remove planet', done => {
    request(App)
      .delete('/planets/9999')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});

/**
 * Testing endpoint insertion planet (Missing Information)
 */
describe('POST /planets', () => {
  let data = {
    index: 9999,
    climate: 'mock',
    terrain: 'mock'
  };
  it('Response 400 to the post planet (Missing Information)', done => {
    request(App)
      .post('/planets')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, MISSING_INFORMATION)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});

/**
 * Testing wrong endpoint
 */
describe('GET /LukeSkywalker', () => {
  it('Response 404 to the Wrong Endpoint (Not Found)', done => {
    request(App)
      .post('/LukeSkywalker')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, NOT_FOUND)
      .end(err => {
        if (err) return done(err);
        done();
      });
  });
});
