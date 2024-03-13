const User = require("../models/user.model");
const { hashpassword } = require("./password")
const { userSchema, SigninSchema } = require("../validation/user.valid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const Signup = async (req, res) => {
  const { username, email, password } = req.body;
  const { success } = userSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ error: "Invalid data" });
  }
  try {
    const hashedPassword = await hashpassword(password);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const Signin = async (req, res) => {
  const { success } = SigninSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ error: "Invalid data" });
  }
  const { username, password } = req.body;
  try {
    const validUser = await User.findOne({ username });
    console.log("hello")
    if (!validUser) {
      return res.status(400).json({ error: "Invalid username" });
    }
    const vetifypassword = await bcrypt.compare(password, validUser.password);
    if (!vetifypassword) {
      return res.status(400).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    return res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({ user: rest });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const update = async(req, res) => {
    const { username, email , password , _id ,level, profilepicture} = req.body;
    try {
        const isUser = await User.findOne({_id});
        if(!isUser){
            return res.status(400).json({error: "Invalid user"});
        }
        const confirmpassword = await bcrypt.compare(password, isUser.password);
        if(!confirmpassword){
            return res.status(400).json({error: "Invalid password"});
        }
        const updateuser = await User.findByIdAndUpdate({
            _id
        },{
            username,
            email,
            profilepicture,
            level
        });
        
        return res.status(200).json({message: "User updated successfully"});
    } catch (error) {
        return res.status(500).json({error: "Internal server error"});
    }
}

const getuser = async(req,res)=>{
    const userid = req.params.id;
    try {
      const user = await User.findById(userid);
      if(!user){
        return res.status(400).json({error: "Invalid user"});
      }
      const {password, ...rest} = user._doc;
      return res.status(200).json({user: rest});
    } catch (error) {
      return res.status(500).json({error: "Internal server error"});
    }
}

const getusers = async(req,res)=>{
  try {
    const users = await User.find();
    return res.status(200).json({users});
  } catch (error) {
    return res.status(500).json({error: "Internal server error"});
  }
}

module.exports = { Signup, Signin, update, getuser, getusers };
