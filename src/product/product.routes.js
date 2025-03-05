import { Router } from "express";
import { saveProduct, getProductsAvailables, getProductsUnavailables, getProductById, deleteProduct, updateProduct } from "./product.controller.js";
import { createProductValidator, getProductByIdValidator, updateProductValidator, deleteProductValidator, getProductValidator } from "../middlewares/product-validators.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management and retrieval
 */

/**
 * @swagger
 * /addProduct:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     responses:
 *       201:
 *         description: Product created
 */
router.post("/addProduct", createProductValidator, saveProduct);

/**
 * @swagger
 * /findProduct/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get("/findProduct/:id", getProductByIdValidator, getProductById);

/**
 * @swagger
 * /getProductAvailable:
 *   get:
 *     summary: Get available products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of available products
 */
router.get("/getProductAvailable", getProductValidator, getProductsAvailables);

/**
 * @swagger
 * /getProductUnavailable:
 *   get:
 *     summary: Get unavailable products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of unavailable products
 */
router.get("/getProductUnavailable", getProductValidator, getProductsUnavailables);

/**
 * @swagger
 * /updateProduct/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 */
router.put("/updateProduct/:id", updateProductValidator, updateProduct);

/**
 * @swagger
 * /deleteProduct/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 */
router.delete("/deleteProduct/:id", deleteProductValidator, deleteProduct);

export default router;