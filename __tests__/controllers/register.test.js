const request = require("supertest");
const app = require("../../dist/index").create();
const data = require("../../dist/helpers/validateHour");

describe('Teste para validação de hora', () => {
  test('O teste deve retornar vazio devido ao formato errado da hora', () => {
    expect(data.validateTime('25:74')).toEqual(null)
  })

  test('O teste deve retornar a hora dada comom input', () => {
    expect(data.validateTime('10:52')[0]).toEqual('10:52')
  })
})

describe('Testando GET', () => {
  test('Deve pegar a rota principal', async () => {
    const res = await request(app).get('/')

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('message')
  })
})

// import request from 'supertest';
// import app from '../../src/index.js';

// describe("Test the root path", () => {
//   test("It should response the GET method", () => {
//     return request(app)
//       .get("/client")
//       .then(response => {
//         expect(response.statusCode).toBe(200);
//       });
//   });
// });

describe("Teste para registro de usuário", () => {
  test("Should response the POST method", done => {
    const payload = {
        "password": 12345678,
        "user_name": "Teste",
        "user_email": Math.random() + "@gmail.com"
    }
    request(app)
      .post("/register/")
      .send(payload)
      .then(response => {
        expect(response.statusCode).toBe(201);
        done();
      });
  },10000);
});

describe("Teste para registro de usuário", () => {
  test("Should response the POST method", done => {
    const payload = {
        "password": 12345678,
        "user_email": "0.6781294272548697@gmail.com"
    }
    request(app)
      .post("/login")
      .send(payload)
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  },10000);
});

// describe("Teste para registro de usuário", () => {
//   test("Should response the POST method", done => {
//     const payload = {
//         "password": 12345678,
//         "user_email": "0.6781294272548697@gmail.com"
//     }
//     let token;
//     request(app)
//       .post("/login")
//       .send(payload)
//       .then(response => {
//         expect(response.statusCode).toBe(200);
//         token = response.body.token;
//         done();
//       });
//       console.log("======================================");
//     const payload2 = {
//       "profession_name": "Carpinteiro",
//     }
//     request(app)
//       .post("/profession")
//       .send(payload2)
//       .set({'Authorization': `Bearer ${token}`})
//       .set({'Content-Type': 'application/json'})
//       .then(response => {
//         expect(response.statusCode).toBe(201);
//         done();
//       });
//   },10000);
// });

let token;

    beforeAll((done) => {
      request(app)
        .post('/login')
        .send({
          "password": 12345678,
          "user_email": "0.6781294272548697@gmail.com"
        })
        .end((err, response) => {
          token = response.body.token; // save the token!
          done();
        });
    });

    describe('GET /', () => {
      // token not being sent - should respond with a 401
      test('It should require authorization', () => {
        return request(app)
          .get('/profession')
          .then((response) => {
            expect(response.statusCode).toBe(401);
          });
      });
      // send the token - should respond with a 200
      test('It responds with JSON', () => {
        return request(app)
          .get('/profession')
          .set('Authorization', `Bearer ${token}`)
          .then((response) => {
            console.log(response)
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/json');
          });
      });
    });
