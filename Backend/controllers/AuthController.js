
import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getJwtSecret = () => process.env.JWT_SECRET || "default_jwt_secret";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Name, email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    const token = jwt.sign({ id: user._id }, getJwtSecret(), { expiresIn: "7d" });

    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Signup failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign({ id: user._id }, getJwtSecret(), { expiresIn: "7d" });

    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Login failed" });
  }
};