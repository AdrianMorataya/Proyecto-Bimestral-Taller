import { Router } from "express";
import { createBillFromCart, listBills } from "./bill.controller.js";
import { createBillValidator, getBillValidator } from "../middlewares/bill-validators.js";

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Bills
 *   description: Bill management and retrieval
 */

/**
 * @swagger
 * /generateBill/{cartId}:
 *   post:
 *     summary: Generate a bill from a cart
 *     tags: [Bills]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID
 *     responses:
 *       201:
 *         description: Bill generated
 */
router.post("/generateBill/:cartId", createBillValidator, createBillFromCart);

/**
 * @swagger
 * /listBill:
 *   post:
 *     summary: List all bills
 *     tags: [Bills]
 *     responses:
 *       200:
 *         description: List of bills
 */
router.post("/listBill", getBillValidator, listBills);

export default router