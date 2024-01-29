import { Request, Response } from "express";
import Usuario, { IUser } from "../models/usuario";
import bcryptjs from "bcryptjs"
import randomstring from "randomstring"
import { sendEmail } from "../sending/mailer";
import { generarJWT } from "../jwt/generarJWT";

export const registrarUsuario = async (req: Request, res: Response): Promise<void> => {
    const { nombre, email, password, cellphone }: IUser = req.body

    const usuario = new Usuario({ nombre, email, password, cellphone })
    // encriptacion de password
    const salto = bcryptjs.genSaltSync()

    usuario.password = bcryptjs.hashSync(password, salto)

    const codigoDeVerificacion = randomstring.generate(6)
    usuario.code = codigoDeVerificacion

    await usuario.save()

    await sendEmail(email, codigoDeVerificacion)
    res.status(201).json({
        usuario
    })


}

export const verificarUsuario = async (req: Request, res: Response): Promise<void> => {
    const { email, code } = req.body
    // console.log(`email es ${email} el codigo es ${code}`)
    try {
        const usuario = await Usuario.findOne({ email })
        if (!usuario) {
            res.status(400).json({
                msg: "no se encontro el email en la bd"
            })
            return
        }

        if (usuario.verifield) {
            res.status(409).json({
                msg: "el usuario ya esta verificado "
            })
            return
        }
        if (usuario.code !== code) {
            res.status(403).json({
                msg: "el codigo es incorecto"
            })
            return

        }
        // console.log(`email es ${email} el codigo es ${code}`)
        const actualizarUsuario = await Usuario.findOneAndUpdate({ email }, { verifield: true })

        res.status(200).json({
            msg: 'se ha verificado correctamente'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }

}

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email })
        if (!usuario) {
            res.status(400).json({
                msg: "No existe un usuario"
            })
            return
        }
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            res.status(400).json({
            msg:"contraseña incorrecta"
            })
            return
        }
        const token = await generarJWT (usuario.id)
        // console.log(`usuario:${usuario} y token : ${token}`)
        res.json({
            usuario,
            token
        })
    } catch (error) {
console.log(error)
res.status(500).json({
    msg:'Error en el servidor'
})
    
    }
}