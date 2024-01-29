import { Router } from "express";
import { login, registrarUsuario, verificarUsuario } from "../controllers/auth";
import { check } from "express-validator"
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { existeEmail } from "../Validaciones/validarEmail";

const router = Router()

router.post("/registro", [
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password debe de ser minimo de 6 caracteres").isLength({ min: 6 }),
    check("cellphone", "el telefono es obligatorio"),
    check("email").custom(existeEmail),
    recolectarErrores

], registrarUsuario)


router.patch("/verify", [
    check("email", "el email es obligatorio").isEmail(),
    check("code", "el codigo es obligatorio").not().isEmpty(),
    recolectarErrores
], verificarUsuario)


router.post("/login",[
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password debe de ser minimo de 6 caracteres").not().isEmpty(),
    recolectarErrores
],login)

export default router