const { Router } = require('express');

const router = Router();


router.post("/activity", (req, res, next) => {
    res.send("soy un post")
})

module.exports = router;