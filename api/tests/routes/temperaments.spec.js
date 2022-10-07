const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { conn, temperamentsInitializer } = require("../../src/db");

const agent = session(app);

describe("Temperament routes", function () {
  this.timeout(24000);
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(async () => {
    await conn
      .sync({ force: true })
      .then(async () => await temperamentsInitializer());
  });
  describe("GET /temperaments", () => {
    it("should return a 200 and the temperaments when requested (needs to create them if they doesn't exist)", (done) => {
      agent
        .get("/temperaments")
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done(new Error(`Something wrong happened: ${err}`));
          } else {
            expect(res.body).to.be.an("array").with.lengthOf.above(0);
            done();
          }
        });
    });
  });
});
