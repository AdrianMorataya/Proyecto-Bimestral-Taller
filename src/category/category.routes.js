import { Router } from "express";
import { getAllCategorys, createCategory, updateCategory, deleteCategory} from "./category.controller.js";
import { createCategoryValidator, updateCategoryValidator, deleteCategoryValidator, getCategoryValidator } from "../middlewares/category-validators.js";


const router = Router()

router.get("/", getCategoryValidator ,getAllCategorys)

router.post("/createCategory", createCategoryValidator, createCategory)

router.delete("/deleteCategory/:categoryId", deleteCategoryValidator, deleteCategory)

router.put("/updateCategory/:categoryId", updateCategoryValidator, updateCategory)

export default router