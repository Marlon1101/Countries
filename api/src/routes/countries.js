const { Router } = require("express");
const axios = require("axios");
const { Country, Activity } = require("../db");
const router = Router();
const { Op } = require("sequelize");

router.get("/countries", async(req, res, next) => {
  if (req.query.name) {
    const { name } = req.query;
    let url = `https://restcountries.com/v3.1/name/${name}`;

    await axios.get(url).then((response) => {
      res.send({
        ID: response.data[0].cca3,
        Nombre: response.data[0].name.common,
        Imagen: response.data[0].flags.svg,
        Continente: response.data[0].continents[0],
        Capital: response.data[0].capital?.length
          ? response.data[0].capital[0]
          : "There isn't a Capital",
        Subregion: response.data[0].subregion?.length
          ? response.data[0].subregion
          : "There isn't a Subregion",
        Area: response.data[0].area,
        Poblacion: response.data[0].population,
      });
    });
  } else {
    let url = "https://restcountries.com/v3.1/all";

    await axios.get(url).then(async (response) => {
      for (let i = 0; i < response.data.length; i++) {
        await Country.findOrCreate({
          where: {
            ID: response.data[i].cca3,
            Nombre: response.data[i].name.common,
            Imagen: response.data[i].flags.svg,
            Continente: response.data[i].continents[0],
            Capital: response.data[i].capital?.length
              ? response.data[i].capital[0]
              : "There isn't a Capital",
            Subregion: response.data[i].subregion?.length
              ? response.data[i].subregion
              : "There isn't a Subregion",
            Area: response.data[i].area,
            Poblacion: response.data[i].population,
          },
        });
      }

      res.send(await Country.findAll());
    });
  }
});

router.get("/countries/:idPais", async (req, res, next) => {
  const { idPais } = req.params;

  const country = await Country.findAll({
    where: { Nombre: { [Op.iLike]: `%${idPais}%` } },
    include: {
      model: Activity,
      through: {
        attributes: []
      }
    }
  });
  if(!country.length)res.send("The country wasn't found")
  else res.send(country)
});

module.exports = router;
