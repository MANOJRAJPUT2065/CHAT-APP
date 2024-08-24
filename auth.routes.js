import express from "express";
const router = express.Router();
import { Signup } from "../controllers/auth.controllers.js";
import { Login } from "../controllers/auth.controllers.js";
import { Logout } from "../controllers/auth.controllers.js";


router.post('/signup',Signup);


router.get('/login',Login);


router.post('/logout',Logout);

export default router