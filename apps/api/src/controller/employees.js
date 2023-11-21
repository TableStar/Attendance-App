const db = require("../models");
const { employees } = require("../models");
const bcrypt = require("bcrypt");
const { templateResSuccess, templateResError } = require("../helper/utilities");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
module.exports = {
  getAllEmployee: async (req, res, next) => {
    console.log(req.query?.offset);
    try {
      const result = await employees.findAll({
        offset: parseInt(req.query?.offset) || 0,
        limit: 8,
        raw: true,
        exclude: ["password"],
      });
      return res
        .status(200)
        .send(templateResSuccess(true, "get employee success", result));
    } catch (error) {
      console.log(error);
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
};
