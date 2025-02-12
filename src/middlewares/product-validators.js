import { body, param } from "express-validator";
import { productExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("description").notEmpty().withMessage("La descripción es requerida"),
    body("price").isInt({ min: 0 }).withMessage("El precio debe ser un número entero positivo"),
    body("amount").isInt({ min: 0 }).withMessage("La cantidad debe ser un número entero positivo"),
    validarCampos,
    handleErrors
];

export const getProductByIdValidator = [
    validateJWT,
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(productExists),
    validarCampos,
    handleErrors
];

export const getProductValidator = [
    validateJWT,
    validarCampos,
    handleErrors
]

export const updateProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(productExists),
    body("name").optional().notEmpty().withMessage("El nombre es requerido"),
    body("description").optional().notEmpty().withMessage("La descripción es requerida"),
    body("price").optional().isInt({ min: 0 }).withMessage("El precio debe ser un número entero positivo"),
    body("amount").optional().isInt({ min: 0 }).withMessage("La cantidad debe ser un número entero positivo"),
    validarCampos,
    handleErrors
];

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(productExists),
    validarCampos,
    handleErrors
];
