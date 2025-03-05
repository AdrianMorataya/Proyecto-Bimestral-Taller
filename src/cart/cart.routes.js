import { Router } from "express";
import { addToCart, getCart, removeFromCart, updateProductQuantity} from "./cart.controller.js";
import { createCartValidator, updateCartValidator, deleteCartValidator, getCartValidator } from "../middlewares/cart-validators.js";

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management and retrieval
 */

/**
 * @swagger
 * /addToCart/{userId}/{productId}:
 *   post:
 *     summary: Add a product to the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       201:
 *         description: Product added to cart
 */

router.post("/addToCart/:userId/:productId", createCartValidator, addToCart);

/**
 * @swagger
 * /getCart/{userId}:
 *   get:
 *     summary: Get the cart of a user
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User's cart
 */

router.get("/getCart/:userId", getCartValidator, getCart);

/**
 * @swagger
 * /removeFromCart/{userId}/{productId}:
 *   delete:
 *     summary: Remove a product from the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product removed from cart
 */

router.delete("/removeFromCart/:userId/:productId", deleteCartValidator, removeFromCart);

/**
 * @swagger
 * /updateQuantity/{productId}:
 *   put:
 *     summary: Update the quantity of a product in the cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product quantity updated
 */

router.put("/updateQuantity/:productId", updateCartValidator, updateProductQuantity);

export default router