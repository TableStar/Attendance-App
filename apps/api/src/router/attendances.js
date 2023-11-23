const {attendancesController} = require("../controller");
const { validateToken } = require("../middleware/validator");

const router = require("express").Router();

router.get("/",validateToken, attendancesController.getAttendanceEmployee);
router.post("/", validateToken, attendancesController.clockInAttendance);
router.patch("/", validateToken, attendancesController.clockOutAttendance);

module.exports = router