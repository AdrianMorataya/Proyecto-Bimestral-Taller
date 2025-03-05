import { Router } from "express"
import { getUserById, getUsers, deleteUser, updatePassword, updateUser, updateProfilePicture } from "./user.controller.js"
import { getUserByIdValidator, deleteUserValidator, updatePasswordValidator, updateUserValidator, updateProfilePictureValidator, getUserValidator } from "../middlewares/user-validators.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /findUser/{uid}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get("/findUser/:uid", getUserByIdValidator, getUserById)

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", getUserValidator, getUsers)

/**
 * @swagger
 * /deleteUser/{uid}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)

/**
 * @swagger
 * /updatePassword:
 *   patch:
 *     summary: Update user password
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Password updated
 */
router.patch("/updatePassword", updatePasswordValidator, updatePassword)

/**
 * @swagger
 * /updateUser:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User updated
 */
router.put("/updateUser", updateUserValidator, updateUser)

/**
 * @swagger
 * /updateProfilePicture:
 *   patch:
 *     summary: Update user profile picture
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Profile picture updated
 */
router.patch("/updateProfilePicture", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePicture)

export default router
