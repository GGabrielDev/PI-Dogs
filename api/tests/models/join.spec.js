const { Dog, Temperament, conn } = require("../../src/db.js");
const { expect } = require("chai");

const dogObject = {
  name: "Doggie",
  height: "25 - 58",
  weight: "4 - 14",
  age: 4,
  isLocal: true,
};

const {
  data: temperamentArray,
} = require("../../src/assets/temperamentData.json");

describe("Joined Models", () => {
  before(() => {
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
  });
  describe("Validators", () => {
    beforeEach(async () => {
      await conn.sync({ force: true });
    });
    afterEach(async () => {
      await conn.sync({ force: true });
    });
    it("should assign a joint temperament when passed a Temperament instance", async () => {
      const dog = await Dog.create(dogObject);
      const tempe = await Temperament.create({ name: temperamentArray[0] });
      await dog.addTemperament([tempe]);
      const result = await Dog.findOne({
        where: { name: dogObject.name },
        include: Temperament,
      });
      expect(result.temperaments.length).to.equal(1);
    });
    it("should assign a joint dog when passed a Dog instance", async () => {
      const dog = await Dog.create(dogObject);
      const tempe = await Temperament.create({ name: temperamentArray[0] });
      await tempe.addDog([dog]);
      const result = await Temperament.findOne({
        where: { name: temperamentArray[0] },
        include: Dog,
      });
      expect(result.dogs.length).to.equal(1);
    });
    it("should be able to declare a Dog with temperaments on it", async () => {
      const dog = await Dog.create(
        {
          ...dogObject,
          temperaments: [
            { name: temperamentArray[4] },
            { name: temperamentArray[13] },
          ],
        },
        { include: Temperament }
      );
      expect(dog.temperaments.length).to.equal(2);
    });
  });
});
