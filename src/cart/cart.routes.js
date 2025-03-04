import { Router } from "express";
import { addToCart, getCart, removeFromCart, updateProductQuantity} from "./cart.controller.js";
import { createCartValidator, updateCartValidator, deleteCartValidator, getCartValidator } from "../middlewares/cart-validators.js";

const router = Router()

router.post("/addToCart/:userId/:productId", createCartValidator, addToCart);

router.get("/getCart/:userId", getCartValidator, getCart);

router.delete("/removeFromCart/:userId/:productId", deleteCartValidator, removeFromCart);

router.put("/updateQuantity/:userId/:productId", updateCartValidator, updateProductQuantity);

export default router