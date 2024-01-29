import { Router } from "express";
import { check } from "express-validator";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { crearPedido, getPedidos } from "../controllers/pedidos";
import { validarJWT } from "../jwt/validarJWT";
import { verificado } from "../middlewares/verificado";

const router =Router()

router.get("/",[validarJWT,recolectarErrores],getPedidos)

router.post("/",[
    validarJWT,
    verificado,
    check("precio", "el precio es obligatorio").not().isEmpty(),
    check("direccion", "la direccion es obligatorio").not().isEmpty(),
    check("localidad", "la localidad es obligatorio").not().isEmpty(),
    check("codigoPostal", "el codigo postal es obligatorio").not().isEmpty(),
    check("items", "El array de productos es obligarorio").not().isEmpty(),
    recolectarErrores,
],crearPedido)

export default router