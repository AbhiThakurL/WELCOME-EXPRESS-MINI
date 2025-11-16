const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt =  require("bcrypt")

const registerController = async (request, response) => {
  const { username, password } = request.body;

  const existingUser = await userModel.findOne({
    username,
  });

  if (existingUser)
    return response.status(409).json({
      message: "username already exists . ",
    });

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    password: hashPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  response.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  response.status(201).json({
    username: username,
  });
};

const loginController = async (request, response) => {
  const { username, password } = request.body;

  const user = await userModel.findOne({
    username,
  });

  if (!user) {
    return response.status(400).json({
      message: "User not found ",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  response.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  console.log(token)
  if (!isPasswordValid)
    return response.status(400).json({ message: "Invalid Password ? " });

  response.status(200).json({
    message: "User logged in successfully",
    user: {
      username: user.username,
      id: user._id,
    },
  });
};



module.exports = { registerController, loginController };
