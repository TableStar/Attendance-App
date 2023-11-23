// import controller here
// examp : const usersController = require("./users");
const employeesController = require("./employees");
const forgottenController= require("./forgotten")
const attendancesController = require("./attendances")
module.exports = {
  employeesController,
  forgottenController,
  attendancesController
};
