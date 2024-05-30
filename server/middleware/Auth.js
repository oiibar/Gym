import pkg from "jsonwebtoken";
const { jwt } = pkg;
import User from "../models/user.model.js";

export const Auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Missing authorization token" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Not authorized" });
  }
};
