import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import { forgotPassword, resetPassword } from '../controllers/forgot_reset-pass-controller.js';

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post('/forgot-password', forgotPassword);

router.put('/reset-password/:token', resetPassword); 

export default router;
