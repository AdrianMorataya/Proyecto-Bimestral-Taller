import { Router } from "express";
import { getAllCategorys, createCategory, updateCategory, deleteCategory} from "./category.controller.js";
import { createCategoryValidator, updateCategoryValidator, deleteCategoryValidator, getCategoryValidator } from "../middlewares/category-validators.js";


const router = Router()

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management and retrieval
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get("/", getCategoryValidator ,getAllCategorys)

/**
 * @swagger
 * /createCategory:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     responses:
 *       201:
 *         description: Category created
 */
router.post("/createCategory", createCategoryValidator, createCategory)

/**
 * @swagger
 * /deleteCategory/{categoryId}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted
 *       404:
 *         description: Category not found
 */
router.delete("/deleteCategory/:categoryId", deleteCategoryValidator, deleteCategory)

/**
 * @swagger
 * /updateCategory/{categoryId}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category updated
 *       404:
 *         description: Category not found
 */
router.put("/updateCategory/:categoryId", updateCategoryValidator, updateCategory)

export default router