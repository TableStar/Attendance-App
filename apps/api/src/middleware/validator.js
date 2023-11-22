const jwt = require("jsonwebtoken");
module.exports = {
  validateToken: (req, res, next) => {
    try {
      console.log(process.env.SCRT_TOKEN);
      console.log("token", req.token);
      if (req.token) {
        const verifyData = jwt.verify(req.token, process.env.SCRT_TOKEN);
        if (!verifyData) {
          return res
            .status(401)
            .send({ success: false, message: "unauthorized Request" });
        }
        req.userData = verifyData;
        next();
      } else {
        return res
          .status(400)
          .send({ success: false, message: "your token is empty" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send({ success: false, message: "Invalid token" });
    }
  },
};
