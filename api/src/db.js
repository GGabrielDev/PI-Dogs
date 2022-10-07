const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER } = process.env || "postgres";
const { DB_PASSWORD } = process.env || "postgres";
const { DB_HOST } = process.env || "localhost";
const temperamentData = require("./assets/temperamentData.json");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "🔗📋 Connection with the database has been established successfully."
    );
  } catch (error) {
    console.error("❌❗ Unable to connect to the database:", error);
  }
};

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Dog, Temperament } = sequelize.models;

// Aca vendrian las relaciones;
const Dog_Temperament = sequelize.define(
  "dog_temperament",
  {},
  { timestamps: false }
);
Dog.belongsToMany(Temperament, { through: Dog_Temperament });
Temperament.belongsToMany(Dog, { through: Dog_Temperament });

const temperamentsInitializer = async () => {
  const { data } = temperamentData;
  const temperamentArray = data.map((temperament) => {
    return { name: temperament };
  });
  await Temperament.bulkCreate(temperamentArray);
};

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  checkConnection,
  temperamentsInitializer,
};
