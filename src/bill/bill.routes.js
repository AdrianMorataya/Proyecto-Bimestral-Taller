import { Router } from "express";
import { createBillFromCart, listBills } from "./bill.controller.js";
import { createBillValidator, getBillValidator } from "../middlewares/bill-validators.js";

const router = Router()

router.post("/generateBill/:cartId", createBillValidator, createBillFromCart);

router.post("/listBill", getBillValidator, listBills);

export default router