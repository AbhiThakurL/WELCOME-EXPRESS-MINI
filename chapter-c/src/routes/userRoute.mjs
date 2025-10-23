import express from "express";
import router2 from "./subUserRoute.mjs";

const router = express.Router();

router.use("/show",router2)

router.get("/home", (req, res) => {
  res.status(200).json({
    message: "Hey Software Engineering"
  });
});

export default router;
