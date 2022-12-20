import bcrypt from "bcrypt";
import { loginHandler } from "../../utils/loginHandler";
import { settCookie } from "../../middleware/settCookie";

export default async (req, res) => {
  if (req.method === "GET") res.send(200);
  else if (req.method === "POST") {
    const user = await loginHandler(req);
    if(!user[0])
   {
    
     return res.json({msg:"No user found"});
   }
    const matchPassword = await bcrypt.compare(
      req.body.password,
      user[0].password
    );
    console.log("from database");
    const currentUser = {
      id: user[0].userId,
      name: user[0].name,
    };
    console.log(currentUser);
    if (!matchPassword) {
      res.send(404);
    } else {
      settCookie(req, res, currentUser);
      res.send(currentUser);
    }
  }
};
