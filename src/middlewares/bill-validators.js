import { body, param } from "express-validator";
import { billExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createBillValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    validarCampos,
    handleErrors
];

export const getBillValidator = [
    validateJWT,
    validarCampos,
    handleErrors
]