const { Dog, conn } = require("../../src/db.js");
const { expect } = require("chai");

const dogObject = {
  name: "Doggie",
  height: "25 - 58",
  weight: "4 - 14",
  age: 4,
  isLocal: true,
};

describe("Dog model", () => {
  before(async () => {
    try {
      await conn.authenticate();
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  });
  describe("Validators", () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe("id", () => {
      it("should recieve a integer in case of needed", async () => {
        const id = 99;
        const dog = await Dog.create({ ...dogObject, id });
        expect(dog.id).to.be.equal(id);
      });
      it("should generate automatically if not provided", async () => {
        const dog = await Dog.create(dogObject);
        expect(dog.id).to.be.a("number");
      });
      it("should auto-increment the value for each ID created", async () => {
        const dog = await Dog.create(dogObject);
        const anotherDog = await Dog.create(dogObject);
        expect(dog.id).to.be.below(anotherDog.id);
      });
    });
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        const { name, ...rest } = dogObject;
        Dog.create({ ...rest })
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when gets a valid name", async () => {
        const dog = await Dog.create(dogObject);
        expect(dog.name).to.exist;
      });
    });
    describe("height", () => {
      it("should throw an error if height is null", () => {
        const { height, ...rest } = dogObject;
        Dog.create({ ...rest })
          .then(() => done(new Error("It requires a valid height")))
          .catch(() => done());
      });
      it("should work when it gets a valid height", async () => {
        const dog = await Dog.create(dogObject);
        expect(dog.height).to.exist;
      });
      it('should set the "cm" characters at the end of the string', async () => {
        await Dog.create(dogObject);
        const dogs = await Dog.findAll();
        expect(dogs[0].height.slice(-2)).to.equal("cm");
      });
    });
    describe("weight", () => {
      it("should throw an error if weight is null", () => {
        const { weight, ...rest } = dogObject;
        Dog.create({ ...rest })
          .then(() => done(new Error("It requires a valid height")))
          .catch(() => done());
      });
      it("should work when it gets a valid height", async () => {
        const dog = await Dog.create(dogObject);
        expect(dog.weight).to.exist;
      });
      it('should set the "kg" characters at the end of the string', async () => {
        await Dog.create(dogObject);
        const dogs = await Dog.findAll();
        expect(dogs[0].weight.slice(-2)).to.equal("kg");
      });
    });
    describe("age", () => {
      it("should work when it gets a valid age", async () => {
        const dog = await Dog.create(dogObject);
        expect(dog.age).to.exist;
      });
    });
    describe("isLocal", () => {
      it("should be defined as false by default if not assigned", async () => {
        const { isLocal, ...rest } = dogObject;
        const dog = await Dog.create({ ...rest });
        expect(dog.isLocal).to.equal(false);
      });
      it("should be assigned properly if provided", async () => {
        const dog = await Dog.create(dogObject);
        expect(dog.isLocal).to.equal(true);
      });
    });
    describe("key", () => {
      it("should create a unique key when an object is defined", async () => {
        const dog = await Dog.create(dogObject);
        expect(dog.isLocal).to.exist;
      });
      it("should be different from another entity with the same data", async () => {
        const dog = await Dog.create(dogObject);
        const differentDog = await Dog.create(dogObject);
        expect(dog.key).to.be.not.equal(differentDog.key);
      });
    });
  });
});
