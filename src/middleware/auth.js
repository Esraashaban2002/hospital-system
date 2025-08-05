const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).send({ error: "No token provided" });

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      throw new Error("Invalid token");
    }

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) throw new Error("User not found");

    await user.cleanExpiredTokens();

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

function checkRole(role) {
  return function (req, res, next) {
    if (req.user.role !== role) return res.sendStatus(403);
    next();
  };
}
module.exports = {
  auth,
  isPatient: checkRole("patient"),
  isAdmin: checkRole("admin"),
  isDoctor: checkRole("doctor"),
  isNurse: checkRole("nurse"),
};
