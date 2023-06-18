const router = require("express").Router();
const controller = require("./reviews.controller");

router.route("/:reviewId").put(controller.update);
router.route("/:reviewId").delete(controller.destroy);

module.exports = router;