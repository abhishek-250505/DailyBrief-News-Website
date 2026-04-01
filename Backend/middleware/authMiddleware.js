
import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: "Authorization header missing" });

  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
  const secret = process.env.JWT_SECRET || "default_jwt_secret";

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
}
