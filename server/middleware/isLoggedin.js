import jwt from "jsonwebtoken";

const JWT_SECRET = "vivekisthemessiah";

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Not Authenticated" });

  jwt.verify(token, JWT_SECRET, (err, result) => {
    if (err) return res.status(401).json({ error: "invalid token" });
    req.email = result.email;
    next();
  });
};

export default verifyUser;
