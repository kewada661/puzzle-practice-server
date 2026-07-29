import express from "express";
import { authController } from "../controllers/index.js"

const authRouter = express.Router();

//Authorization 
authRouter.post('/login', authController.logIn);

authRouter.get('/logout', authController.logOut);

authRouter.get('/refresh', authController.refresh);


export default authRouter;