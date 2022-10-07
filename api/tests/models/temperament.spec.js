const { Temperament, conn } = require("../../src/db.js");
const { expect } = require("chai");

const tempeObject = {
  name: "Sample Temperament",
};

describe("Temperament model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Temperament.sync({ force: true }));
    afterEach(() => Temperament.sync({ force: true }));
    describe("id", () => {
      it("should declare an id when a Temperament is created", async () => {
        const tempe = await Temperament.create(tempeObject);
        expect(tempe.id).to.not.be.undefined;
      });
      it("should increment the id each time a recipe is created", async () => {
        const tempe1 = await Temperament.create(tempeObject);
        const tempe2 = await Temperament.create(tempeObject);
        const tempe3 = await Temperament.create(tempeObject);
        expect(tempe1.getDataValue("id")).to.be.below(
          tempe2.getDataValue("id")
        );
        expect(tempe2.getDataValue("id")).to.be.below(
          tempe3.getDataValue("id")
        );
      });
    });
    describe("name", () => {
      it("should throw an error if name is not provided", (done) => {
        Temperament.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", async () => {
        const tempe = await Temperament.create(tempeObject);
        expect(tempe.name).to.exist;
      });
    });
  });
});
