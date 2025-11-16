const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRouter =  require("../src/routes/auth.routes")
const postRouter = require("./routes/post.routes.js")

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use("/api/auth",userRouter);
app.use("/api/posts",postRouter)





module.exports = app