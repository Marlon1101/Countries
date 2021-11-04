const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryRoute = require("./countries");
const activityRoute = require("./activities");


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", countryRoute);
router.use("/", activityRoute);

module.exports = router;
