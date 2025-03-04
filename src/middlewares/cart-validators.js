import { body, param } from "express-validator";
import { cartExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createCartValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
];

export const getCartValidator = [
    validateJWT,
    validarCampos,
    handleErrors
]

export const updateCartValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(cartExists),
    validarCampos,
    handleErrors
];

export const deleteCartValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(cartExists),
    validarCampos,
    handleErrors
];
