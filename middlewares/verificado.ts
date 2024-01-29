import { Request,Response,NextFunction } from "express";

export const verificado =(req:Request,res:Response,next:NextFunction)=>{
    const {verifield}=req.body.usuarioConfirmado
    if(!verifield){
        res.status(401).json({
            msg:"el usuario no esta verificado"
        })
        return
    }
    next()
}