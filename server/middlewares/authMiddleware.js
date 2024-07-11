const jwt = require("jsonwebtoken");
const messages = require("../config/messages");
module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.jwt_secret);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).send({ success: false, message: messages.invalidToken });
  }
};
// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   try {
//     // Check if Authorization header exists
//     if (!req.headers.authorization) {
//       throw new Error("Authorization header is missing");
//     }

//     // Split Authorization header to get token (assuming format "Bearer <token>")
//     const token = req.headers.authorization.split(" ")[1];

//     // Verify token using jwt_secret from environment variables
//     const decoded = jwt.verify(token, process.env.jwt_secret);

//     // Add userId to request body
//     req.body.userId = decoded.userId;

//     // Call next middleware or route handler
//     next();
//   } catch (error) {
//     // Handle errors (e.g., token verification failed)
//     console.error("Token verification error:", error.message);
//     return res.status(401).send({ success: false, message: "Invalid token" });
//   }
// };
