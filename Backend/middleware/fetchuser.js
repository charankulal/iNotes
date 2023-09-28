var jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
  //Get the user from the jwt token and add id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ msg: "No authorization is provided" });
  }
  try {
    const data = jwt.verify(token, "gatewayformyapplication");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ msg: "Internal Server Error" });
  }
};

module.exports = fetchuser;
