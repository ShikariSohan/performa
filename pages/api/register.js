const User = require("../models/ModelUser");

export default async(req,res)=>{
if(req.method=="POST")
{
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phoneNumber,
    role: req.body.role
  });
     const token = jwt.sign(
    {
      userId: user._id,
      email: req.body.email,
    },
    process.env.EMAIL_SECRET,
    { expiresIn: "24h" }
  );
}
}