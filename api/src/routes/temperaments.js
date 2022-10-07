const { Router } = require("express");
const { Temperament } = require("../db");

const router = Router();

router.get("/", async (_, res) => {
  const result = await Temperament.findAll();

  res.status(200).json(result);
});

module.exports = router;
