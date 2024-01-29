import { Request,Response,NextFunction } from "express";
import jwt, {JwtPayload} from "jsonwebtoken"

import Usuario,{IUser} from "../models/usuario";

export const validarJWT =async (req:Request,res:Response,next:NextFunction):Promise<void>=>{

    const token =req.headers["x-token"] as string

    if(!token){
        res.status(401).json({
            msg:"no hay token en la peticion"
        })
        return
    }

    try {
        const clavetokenAux=process.env.CLAVETOKEN   as string;
  
        const payload= jwt.verify(token, clavetokenAux) as JwtPayload
     
        //decodifico el id del token con la clave secreta
        const {id}=payload
        //busco ese id en la base de datos " Usuario" y lo almaceno en la variable usuarioconfirmado
     
        const usuarioConfirmado:IUser |null=await Usuario.findById(id)

if (!usuarioConfirmado){
  
    res.status(401).json({
        
        msg:"El usuario no existe"
    })
    return
}


req.body.usuarioConfirmado= usuarioConfirmado
next()

    } catch (error) {
        console.log(error)
        res.status(401).json({

            msg:"token no valido/error en el servidor"
        })
    }
    }
