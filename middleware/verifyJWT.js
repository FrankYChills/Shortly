const jwt = require("jsonwebtoken");

/**
 * This function is an middleware that checks if a valid JWT token is present in an user request for authorization purpose.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns None
 */
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "UnAuthorized access!" });
  }
  // autorization value should start with Bearer
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = authHeader.split(" ")[1];

  // verify access token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Invalid access token ! Try logging in again" });
    }
    // get user from decoded jwt
    req.user = decoded;
    // pass to next function
    next();
  });
};

module.exports = verifyJWT;
