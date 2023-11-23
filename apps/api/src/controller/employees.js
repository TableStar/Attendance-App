const db = require("../models");
const { employees } = require("../models");
const bcrypt = require("bcrypt");
const { templateResSuccess, templateResError } = require("../helper/utilities");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
module.exports = {
  getAllEmployee: async (req, res, next) => {
    // console.log(req.query?.offset);
    try {
      const result = await employees.findAll({
        where: req.query,
        offset: parseInt(req.query?.offset) || 0,
        limit: 10,
        raw: true,
        attributes: { exclude: ["password"] },
      });
      if (!result.length) {
        throw { rc: 401, message: "employee not found" };
      }
      return res
        .status(200)
        .send(templateResSuccess(true, "get employee success", result));
    } catch (error) {
      console.log(error);
      next(
        templateResError(
          error.rc,
          false,
          "error fetching employee data",
          error.message,
          null
        )
      );
    }
  },
  login: async (req, res, next) => {
    // const transaction = await db.sequelize.transaction();
    try {
      console.log(req.token);
      const result = await employees.findOne({
        where: { username: req.body.username },
        raw: true,
      });
      if (!result) {
        throw { rc: 404, message: "Couldn't find employee" };
      }
      if (result.password?.length < 35) {
        const token = jwt.sign(
          { id: result.id, role: result.role },
          process.env.SCRT_TOKEN
        );
        delete result.password;
        return res.status(200).send(
          templateResSuccess(true, "login success", {
            username: result.username,
            role: result.role,
            token,
          })
        );
      }
      const passcheck = await bcrypt.compare(
        req.body.password,
        result.password
      );
      if (!passcheck) {
        throw { rc: 401, message: "password invalid" };
      }
      const token = jwt.sign(
        { id: result.id, role: result.role },
        process.env.SCRT_TOKEN
      );
      delete result.password;
      return res.status(200).send(
        templateResSuccess(true, "login success", {
          username: result.username,
          role: result.role,
          token,
        })
      );
    } catch (error) {
      console.log(error);
      next(
        templateResError(error.rc, false, "login failed", error.message, null)
      );
    }
  },
  createEmployee: async (req, res, next) => {
    const transaction = await db.sequelize.transaction();
    try {
      const result = await employees.findAll({
        where: {
          [Op.or]: [{ username: req.body.username }, { email: req.body.email }],
        },
      });
      if (result.length > 0) {
        throw { rc: 400, message: "username or email already exist" };
      }
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      delete req.body.password;
      console.log(hashedPass);
      await employees.create(
        { ...req.body, password: hashedPass },
        { transaction }
      );
      await transaction.commit();
      return res
        .status(200)
        .send(templateResSuccess(true, "account creation success", null));
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      next(
        templateResError(
          error.rc,
          false,
          "Error creating account",
          error.message,
          null
        )
      );
    }
  },
  editEmployee: async (req, res, next) => {
    const transaction = await db.sequelize.transaction();
    console.log(req.params);
    try {
      const result = await employees.findOne({
        where: { id: req.params.id },
        raw: true,
      });
      console.log(
        "🚀 ~ file: employees.js:100 ~ editEmployee: ~ result:",
        result
      );
      if (!result) {
        throw { rc: 404, message: "Employee not found" };
      }
      await employees.update(req.body, {
        where: { id: req.params.id },
        transaction,
      });
      await transaction.commit();
      return res
        .status(200)
        .send(templateResSuccess(true, "employee edit success", null));
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      next(
        templateResError(
          error.rc,
          false,
          "Error editing employees data",
          error.message,
          null
        )
      );
    }
  },
  deleteEmployee: async (req, res, next) => {
    const transaction = await db.sequelize.transaction();
    try {
      await employees.destroy({ where: { id: req.params.id } });
      await transaction.commit();
      return res
        .status(200)
        .send(templateResSuccess(true, "Employee deletion success", null));
    } catch (error) {
      console.log(error);
      await transaction.rollback();
    }
  },
  keepLogin: async (req, res, next) => {
    try {
      const result = await employees.findOne({
        where: { id: req.userData.id },
        raw: true,
      });
      const { id, username, email, role } = result;
      const token = jwt.sign({ id, role }, process.env.SCRT_TOKEN, {
        expiresIn: "6h",
      });
      return res
        .status(200)
        .send({ success: true, result: { username, role, token } });
    } catch (error) {
      console.log(error);
      next(templateResError(null, true, "error keeping Login", null));
    }
  },
  editStatus: async (req, res, next) => {
    const transaction = await db.sequelize.transaction();
    try {
      const result = await employees.findOne({
        where: { id: req.params.id },
        raw: true,
      });
      if (!result) {
        throw { rc: 404, message: "Employee not found" };
      }
      if (result.status.includes("enable")) {
        await employees.update(
          { status: "disabled" },
          { where: { id: req.params.id }, transaction }
        );
      } else {
        await employees.update(
          { status: "enabled" },
          { where: { id: req.params.id }, transaction }
        );
      }
      await transaction.commit();
      return res
        .status(200)
        .send(templateResSuccess(true, "Edit status success", null));
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      next(
        templateResError(
          error.rc,
          false,
          "Edit status failed",
          error.message,
          null
        )
      );
    }
  },
  editPass: async (req, res, next) => {
    try {
      if (req.userData) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        await employees.update(
          { password: hashPassword },
          { where: { id: req.userData.id } }
        );
        return res
          .status(200)
          .send({ success: true, message: "password change success" });
      }
    } catch (error) {
      console.log(error);
      next(
        templateResError(
          error.rc,
          false,
          "error changing password",
          error.message,
          null
        )
      );
    }
  },
};
