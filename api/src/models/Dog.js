const { DataTypes } = require("sequelize");
const path = require("path");

const modelName = path
  .basename(__filename, path.extname(__filename))
  .toLowerCase();

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    modelName,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue("weight", value.concat("kg"));
        },
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue("height", value.concat("cm"));
        },
      },
      age: {
        type: DataTypes.STRING,
        set(value) {
          const result = value.toString();
          this.setDataValue(
            "age",
            result.slice(-6) === " years" ? result : result.concat(" years")
          );
        },
      },
      image: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
        },
      },
      isLocal: {
        type: DataTypes.VIRTUAL,
        get() {
          return true;
        },
      },
      key: {
        type: DataTypes.VIRTUAL,
        get() {
          return "".concat("L", "-", this.id);
        },
      },
    },
    { timestamps: false }
  );
};
