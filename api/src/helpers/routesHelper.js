const { Op } = require("sequelize");
const { Temperament } = require("../db");

const mainRouteApiSingleFormat = async (apiObject) => {
  const { id, name, temperament } = apiObject;
  const weight = apiObject.weight.metric;
  const image = apiObject.image.url;
  const temperamentArray = temperament ? temperament.split(", ") : [];
  const dbTemperaments = await Temperament.findAll({
    where: {
      name: {
        [Op.or]: temperamentArray,
      },
    },
  });

  return {
    id,
    name,
    weight: weight.concat("kg"),
    image,
    temperaments: dbTemperaments,
    isLocal: false,
    key: `A-${id}`,
  };
};

const detailsRouteApiSingleFormat = async (apiObject) => {
  if (apiObject.id === undefined) {
    return null;
  }
  const { id, name, temperament, life_span } = apiObject;
  const weight = apiObject.weight.metric;
  const height = apiObject.height.metric;
  const image = apiObject.image.url;
  const temperamentArray = temperament ? temperament.split(", ") : [];
  const dbTemperaments = await Temperament.findAll({
    where: {
      name: {
        [Op.or]: temperamentArray,
      },
    },
  });

  return {
    id,
    name,
    weight: weight.concat("kg"),
    height: height.concat("cm"),
    age: life_span,
    image,
    temperaments: dbTemperaments,
    isLocal: false,
    key: `A-${id}`,
  };
};

const formatApiToMainRoute = (apiArray) => {
  const resultArray = apiArray.map(async (element) => {
    const result = await mainRouteApiSingleFormat(element);
    return result;
  });
  return resultArray;
};

const filterApiResult = (apiArray, term) => {
  const filterTerm = term.toLowerCase();
  return apiArray.filter(
    (object) => object.name.toLowerCase().indexOf(filterTerm) !== -1
  );
};

module.exports = {
  formatApiToMainRoute,
  filterApiResult,
  mainRouteApiSingleFormat,
  detailsRouteApiSingleFormat,
};
