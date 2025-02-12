import { Router } from "express";
import { saveProduct, getProductsAvailables, getProductsUnavailables, getProductById, deleteProduct, updateProduct } from "./product.controller.js";
import { createProductValidator, getProductByIdValidator, updateProductValidator, deleteProductValidator } from "../middlewares/product-validators.js";

const router = Router();

router.post("/addProduct", createProductValidator, saveProduct);

router.get("/findProduct/:id", getProductByIdValidator, getProductById);

router.get("/getProductAvailable", getProductsAvailables);

router.get("/getProductUnavailable", getProductsUnavailables);

router.put("/updateProduct/:id", updateProductValidator, updateProduct);

router.delete("/deleteProduct/:id", deleteProductValidator, deleteProduct);

export default router;