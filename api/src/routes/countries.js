const { Router } = require("express");

const router = Router();

router.get("/countries", (req, res, next) => {
  res.send("funciona");
});

module.exports = router;
