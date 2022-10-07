const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const {
  conn,
  Dog,
  Temperament,
  temperamentsInitializer,
} = require("../../src/db");

const temperaments = [
  {
    name: "Sample Temperament",
  },
  {
    name: "Dummy Temperament",
  },
];

const dogObject = {
  name: "Doggie",
  height: "25 - 58",
  weight: "4 - 14",
  age: 4,
  isLocal: true,
  temperaments,
};

const testDog = {
  name: "Blackie Dog",
  height: "15 - 29",
  weight: "3 - 9",
  age: 8,
  isLocal: true,
  temperaments: [temperaments[0]],
};

const agent = session(app);

describe("Dogs routes", function () {
  this.timeout(24000);
  before(() =>
    conn
      .authenticate()
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      })
  );
  beforeEach(async () => {
    await conn.sync({ force: true });
    await Temperament.bulkCreate(temperaments);
	await temperamentsInitializer()
    await Dog.create(dogObject, { include: Temperament });
  });
  afterEach(async () => {
    await conn.sync({ force: true });
  });
  describe("GET /dogs", () => {
    it("should get 200 if the request is done", () => {
      agent.get("/dogs").expect(200);
    });
    it("should return an array of dogs", (done) => {
      agent
        .get("/dogs?dummy=true")
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done(new Error(`An unexpected error has occured: ${err}`));
          } else {
            expect(res.body).to.be.an("array");
            expect(res.body[0].name).to.be.equal(dogObject.name);
            done();
          }
        });
    });
  });
  describe("GET /dogs?name=...", () => {
    it("should return 200 and an array of the results of the request (API included)", (done) => {
      agent
        .get("/dogs?name=Dog&dummy=true")
        .expect(200)
        .expect("Content-Type", /json/)
        .end(function (err, res) {
          if (err) {
            done(new Error(`Something wrong happened: ${err}`));
          } else {
            expect(res.body).to.be.an("array").and.to.have.lengthOf.above(1);
            done();
          }
        });
    });
    it("should filter the results based on the name provided on the query of the request", (done) => {
      Dog.create(testDog).then(
        agent
          .get("/dogs?name=Doggie&dummy=true")
          .expect(200)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .end(function (err, res) {
            if (err) {
              done(new Error(`Something wrong happened: ${err}`));
            } else {
              expect(res.body).to.be.an("array").and.to.have.lengthOf(1);
              done();
            }
          })
      );
    });
  });
  describe("GET /dogs/{dogId}", () => {
    it("should get a 404 and \"The given ID doesn't exist\" as an error message if the given ID doesn't belong to any dog", (done) => {
      agent
        .get("/dogs/999?isLocal=true")
        .expect(404)
        .end(function (_, res) {
          if (res.text === "The given ID doesn't exist") {
            done();
          } else {
            done(new Error("The error message is incorrect"));
          }
        });
    });
    it("should return a 400 and \"The parameter 'isLocal' was not sent in the request query\" as the error message when no isLocal parameter is sent on the request", (done) => {
      agent
        .get("/dogs/1")
        .expect(400)
        .end(function (_, res) {
          if (
            res.text ===
            "The parameter 'isLocal' was not sent in the request query"
          ) {
            done();
          } else {
            done(new Error("The error message is incorrect"));
          }
        });
    });
    it("should return an array of the temperaments that the dog has alongside with the rest of the optional info", (done) => {
      agent
        .get("/dogs/1?isLocal=true")
        .expect(200)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .end(function (err, res) {
          if (err) {
            done(new Error(`Something wrong happened: ${err}`));
          } else {
            expect(res.body.weight).to.be.a("string");
            expect(res.body.temperaments).to.be.an("array").with.lengthOf(2);
            done();
          }
        });
    });
    it("should return a dog with all the expected info when the dog is not local", (done) => {
      agent
        .get("/dogs/1?isLocal=false")
        .expect(200)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .end(function (err, res) {
          if (err) {
            done(new Error(`Something wrong happened: ${err}`));
          } else {
            expect(res.body.weight).to.be.a("string");
            expect(res.body.temperaments)
              .to.be.an("array")
              .with.lengthOf.above(1);
            done();
          }
        });
    });
  });
  describe("POST /dogs", () => {
    it('should get a 400 and "The request is missing properties" as message if any of the required entries is missing', (done) => {
      agent
        .post("/dogs")
        .send({ name: "Test name" })
        .expect(400)
        .end(function (_, res) {
          if (res.text === "The request is missing properties") {
            done();
          } else {
            done(new Error("Should return an error message."));
          }
        });
    });
    it("should return 201 and the new dog if the recipe was successfully created", (done) => {
      agent
        .post("/dogs")
        .send(testDog)
        .expect(201)
        .end(function (err, res) {
          if (err) {
            done(new Error(`Something wrong happened: ${err}`));
          } else {
            expect(res.body).to.have.property("id");
            expect(res.body.name).to.eql(testDog.name);
            expect(res.body.weight).to.eql(testDog.weight + "kg");
            expect(res.body.height).to.eql(testDog.height + "cm");
            expect(res.body.temperaments).to.be.an("array").with.lengthOf(1);
            done();
          }
        });
    });
  });
});
