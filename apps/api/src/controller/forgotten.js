const { FRONT_URL } = require("../helper/frontInfo");
const { templateResError } = require("../helper/utilities");
const { employees } = require("../models");
const jwt = require("jsonwebtoken");
const transporter = require("../helper/mailer");
module.exports = {
  forgotPassword: async (req, res, next) => {
    try {
      const result = await employees.findOne({
        where: { email: req.body.email },
        raw: true,
      });
      if (!result) {
        return res
          .status(401)
          .send(
            templateResError(
              401,
              false,
              "failed sending reset email",
              "user not found",
              null
            )
          );
      }
      const token = jwt.sign({ id: result.id }, process.env.SCRT_TOKEN, {
        expiresIn: "12h",
      });
      await transporter.sendMail({
        from: "ADMINISTRATION",
        to: req.body.email,
        subject: "Reset Password Info",
        html: `<h1>Hello,${result.username}</h1><h3>Here is your reset password link</h3>
        <a href="${FRONT_URL}/auth/forgotpass?token=${token}">Click Link</a>`,
      });
      return res
        .status(200)
        .send({ success: true, message: "here is your token", result: null });
    } catch (error) {
      console.log(error);
      next(
        templateResError(
          error.rc,
          false,
          "failed sending reset email link",
          error.rc,
          null
        )
      );
    }
  },
};
