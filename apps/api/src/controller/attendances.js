const { Op } = require("sequelize");
const { templateResError, templateResSuccess } = require("../helper/utilities");
const { attendances } = require("../models");

module.exports = {
    getAttendanceEmployee: async (req, res, next) => {
        try {
            const { filter, startDate, endDate, sort } = req.query
            const { id } = req.userData
            console.log("SORT", sort);
            const result = await attendances.findAll({
                where: {
                    employeeId: id,
                    clockIn: filter === "today" ? { [Op.gte]: new Date().toDateString("af-ZA") } : startDate ? {[Op.between]: [startDate, endDate]} : { [Op.ne]: null }
                },
                order:[['clockIn', sort || "ASC"]]
            })
            if (result.length) {
                return res.status(200).send(templateResSuccess(true, "get personal attendance", result))
            } else {
                next(templateResError(404, false, "did not found any attendance", result))
            }
        } catch (error) {
            console.log(error);
            next(templateResError(500, false, "error getting personal attendance", error.message))
        }
    },
    clockInAttendance: async (req, res, next) => {
        try {
            const { id } = req.userData
            const check = await attendances.findAll({
                where: { employeeId: id, clockIn: { [Op.gte]: new Date().toDateString("af-ZA") } },
                raw: true
            })
            if (check.length) { return next(templateResError(400, false, "user already clocked in for today")) }
            const { location } = req.body
            let current = new Date()
            const date = current.toLocaleDateString("af-ZA")
            const time = current.toLocaleTimeString("id").replaceAll(".", ":")
            const result = await attendances.create({
                employeeId: id,
                clockIn: `${date} ${time}`,
                location,
            })
            return res.status(200).send(templateResSuccess(true, "create clockIn attendance", result))
        } catch (error) {
            console.log(error);
            next(templateResError(500, false, "error clockIn attendance", error.message))
        }
    },
    clockOutAttendance: async (req, res, next) => {
        try {
            const { id } = req.userData
            const check = await attendances.findOne({
                where: { employeeId: id, clockIn: { [Op.gte]: 6 } },
                raw: true
            })
            if (check.clockOut) { return next(templateResError(400, false, "user already clocked out")) }
            let current = new Date()
            let salary = Math.floor((new Date() - new Date(check.clockIn)) / 1000 / 60 / 60) * 75000
            const date = current.toLocaleDateString("af-ZA")
            const time = current.toLocaleTimeString("id").replaceAll(".", ":")
            const result = await attendances.update({
                clockOut: `${date} ${time}`,
                salary
            }, {
                where: { id: check.id }
            })
            return res.status(200).send(templateResSuccess(true, "user clocked out", result))
        } catch (error) {
            console.log(error);
            next(templateResError(500, false, "error clockOut attendance", error.message))
        }
    }
}