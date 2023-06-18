const router = require("express").Router();
const controller = require("../movies/movies.controller");

router.route("/").get(controller.alltheaters);

module.exports = router;