const router = require("express").Router();
const controller = require("./movies.controller");

router.route("/").get(controller.list);
router.route("/:movieId").get(controller.read);
router.route("/:movieId/theaters").get(controller.theaters);
router.route("/:movieId/reviews").get(controller.review);

module.exports = router;