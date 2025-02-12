import { body, param } from "express-validator";
import { categoryExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createCategoryValidator = [
    validateJWT,
    body("name").notEmpty().withMessage("El nombre es requerido"),
    validarCampos,
    handleErrors
];

export const getCategoryByIdValidator = [
    validateJWT,
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(categoryExists),
    validarCampos,
    handleErrors
];

export const updateCategoryValidator = [
    validateJWT,
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(categoryExists),
    body("name").optional().notEmpty().withMessage("El nombre es requerido"),
    validarCampos,
    handleErrors
];

export const deleteCategoryValidator = [
    validateJWT,
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(categoryExists),
    validarCampos,
    handleErrors
];
