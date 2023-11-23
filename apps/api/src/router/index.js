// import router here
// examp : const usersRouter = require("./users");
const employeesRouter = require("./employees");
const forgottenRouter = require("./forgotten");
const attendancesRouter = require("./attendances")
module.exports = {
  employeesRouter,
  forgottenRouter,
  attendancesRouter
};
