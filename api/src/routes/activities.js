const { Router } = require("express");
const { Activity, Country } = require("../db");
const router = Router();

router.post("/activity", async (req, res, next) => {
  const { Nombre, Dificultad, Duracion, Temporada, idPais } = req.body;

  const activityCreated = await Activity.findOrCreate({
    where: {
      Nombre,
      Dificultad,
      Duracion,
      Temporada,
    },
  });
  const activity = await Activity.findByPk(activityCreated[0].id);
  await activity.addCountry(idPais);
  res.send("Done");
});

module.exports = router;
