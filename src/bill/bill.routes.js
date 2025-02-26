import { Router } from "express";
import { createBillFromCart } from "./bill.controller.js";

const router = Router()

router.post("/generateBill/:cartId", createBillFromCart);

export default router