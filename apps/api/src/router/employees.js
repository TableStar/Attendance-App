const { employeesController } = require("../controller");

const router = require("express").Router();

router.post("/login", employeesController.login);
router.post("/",employeesController.createEmployee)
router.patch("/:id",employeesController.editEmployee)
router.delete("/:id",employeesController.deleteEmployee)

module.exports = router;
