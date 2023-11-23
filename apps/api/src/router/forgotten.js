const router = require("express").Router();
const { forgottenController, employeesController } = require("../controller/index.js");
const { validateToken, validatePass } = require("../middleware/validator.js");

router.post("/password", forgottenController.forgotPassword);
router.post(
  "/resetpass",
  validatePass,
  validateToken,
  employeesController.editPass
);

module.exports = router;
