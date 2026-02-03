const jwt = require("jsonwebtoken");
const SECRET = "simple_secret_key";

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  console.log("Auth Header:", header); // DEBUG LOG
  if (!header) return res.status(401).json({ message: "No token" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
