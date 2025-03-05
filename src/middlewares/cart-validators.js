import { body, param } from "express-validator";
import { cartExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createCartValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
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
    hasRoles("USER_ROLE"),
    validarCampos,
    handleErrors
];

export const deleteCartValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    validarCampos,
    handleErrors
];
