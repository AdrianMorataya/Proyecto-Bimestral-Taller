import { Router } from "express"
import { register, login } from "./auth.controller.js"
import { registerValidator, loginValidator } from "../middlewares/user-validators.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication management
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: User registered
 */
router.post(
    "/register", uploadProfilePicture.single("profilePicture"), registerValidator, register)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged in
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", loginValidator, login)

export default router
