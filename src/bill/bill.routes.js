import { Router } from "express";
import { createBillFromCart, listBills } from "./bill.controller.js";

const router = Router()

router.post("/generateBill/:cartId", createBillFromCart);

router.post("/listBill", listBills);

export default router