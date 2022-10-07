const { Router } = require("express");
const { Op } = require("sequelize");
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const {
  formatApiToMainRoute,
  filterApiResult,
  detailsRouteApiSingleFormat,
} = require("../helpers/routesHelper");
const dogsDummy = require("../assets/dogsData.json");

const router = Router();

router.get("/", async (req, res) => {
  const { name, dummy } = req.query;

  try {
    const dbResults = await Dog.findAll({
      attributes: { exclude: ["age", "height"] },
      where: name
        ? {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          }
        : {},
      include: Temperament,
    });
    let apiResponse = {};
    if (dummy === "true") {
      apiResponse = dogsDummy;
    } else {
      apiResponse = await axios.get("https://api.thedogapi.com/v1/breeds", {
        params: {
          apiKey: API_KEY,
        },
      });
    }
    let promisedResults = await Promise.allSettled(
      formatApiToMainRoute(apiResponse.data)
    );
    let apiResults = promisedResults.map((value) => value.value);
    if (name) {
      apiResults = filterApiResult(apiResults, name);
    }
    if ([...dbResults, ...apiResults].length > 0) {
      return res.status(200).json([...dbResults, ...apiResults]);
    } else {
      return res.status(404).send("No elements has been found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.get("/:dogId", async (req, res) => {
  const { dogId } = req.params;
  const { isLocal, dummy } = req.query;

  if (!(isLocal === "true" || isLocal === "false"))
    return res
      .status(400)
      .send("The parameter 'isLocal' was not sent in the request query");
  try {
    let result = {};
    let apiResponse = {};
    if (isLocal === "true") {
      result = await Dog.findOne({
        where: { id: dogId },
        include: Temperament,
      });
    }
    if (isLocal === "false") {
      if (dummy === "true") {
        apiResponse = dogsDummy;
      } else {
        apiResponse = await axios.get("https://api.thedogapi.com/v1/breeds", {
          params: {
            apiKey: API_KEY,
          },
        });
      }
      result = await detailsRouteApiSingleFormat(
        apiResponse.data.find((value) => value.id.toString() === dogId)
      );
    }
    if (result === null) {
      return res.status(404).send("The given ID doesn't exist");
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  const { name, weight, height, age, image, temperaments } = req.body;

  if (
    name === undefined ||
    weight === undefined ||
    height === undefined ||
    temperaments === undefined
  )
    return res.status(400).send("The request is missing properties");
  try {
    const result = await Dog.create(
      {
        name,
        weight,
        height,
        age,
        image,
        temperaments,
      },
      {
        include: Temperament,
      }
    );
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = router;
