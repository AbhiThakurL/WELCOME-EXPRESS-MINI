import { Router } from "express";
import { registerUser,login,Profile,Logout } from "../controllers/user.controller.mjs";

const router = Router()

router.post("/register",registerUser);
router.post("/login",login)

router.get("/Profile",Profile);
router.get("/Logout",Logout);



export default router;