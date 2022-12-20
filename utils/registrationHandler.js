import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { executeQuery } from "../lib/db";

const registrationHandler = async (req) => {
  const data = req.body;
  console.log(req.body.password);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  console.log(hashedPassword);
  await executeQuery(
    "INSERT INTO Users (role,email,pass,name,usercode) VALUES(?,?,?,?,?)",
    [data.role, data.email, hashedPassword, data.name, data.usercode]
  );
  const result = await executeQuery(
    "SELECT usercode FROM Users WHERE email=(?)",
    [data.email]
  );

  const token = jwt.sign(
    {
      usercode: result[0].usercode,
      email: data.email,
    },
    process.env.EMAIL_SECRET,
    { expiresIn: "24h" }
  );
  return token;
};
module.exports = { registrationHandler };
