const { employeesController } = require("../controller");

const { validateToken } = require("../middleware/validator");

const router = require("express").Router();

router.get("/", validateToken, employeesController.getAllEmployee);
router.get("/keepLogin", validateToken, employeesController.keepLogin);
router.post("/login", employeesController.login);
router.post("/", validateToken, employeesController.createEmployee);
router.patch("/:id", validateToken, employeesController.editEmployee);
router.patch("/status/:id",validateToken,employeesController.editStatus)
router.delete("/:id", validateToken, employeesController.deleteEmployee);

module.exports = router;
