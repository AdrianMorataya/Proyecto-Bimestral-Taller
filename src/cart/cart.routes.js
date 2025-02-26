import { Router } from "express";
import { addToCart, getCart, removeFromCart, updateProductQuantity} from "./cart.controller.js";
import { createCategoryValidator, getCategoryByIdValidator, updateCategoryValidator, deleteCategoryValidator, getCategoryValidator } from "../middlewares/category-validators.js";


const router = Router()

router.post("/addToCart/:userId/:productId", addToCart);

router.get("/getCart/:userId", getCart);

router.delete("/removeFromCart/:userId/:productId", removeFromCart);

router.put("/updateQuantity/:userId/:productId", updateProductQuantity);

export default router