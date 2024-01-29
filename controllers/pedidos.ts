import { Request, Response } from "express";
import Pedido, { IPedidos } from "../models/pedidos";
import { ObjectId } from "mongoose";
import { sendEmailPedido } from "../sending/mailerPedido";
import Usuario,{IUser} from "../models/usuario";


export const getPedidos = async (req: Request, res: Response): Promise<void> => {
    // con la req.body.usuarioconfirmado que la capturo desde el validarjwt busco sin tengo 
    //algun pedido en la base de datos pedidos que haga referencia a ese usuario
    const usuarioId: ObjectId = req.body.usuarioConfirmado._id

    const usuarioAuxi = { user: usuarioId }
    

    const pedidos = await Pedido.find(usuarioAuxi)

    res.json({
        data: [...pedidos]
    })
}

export const crearPedido = async (req: Request, res: Response): Promise<void> => {
    const usuarioId: ObjectId = req.body.usuarioConfirmado._id
    
    const usuarioConfirmado:IUser |null=await Usuario.findById(usuarioId)
    const email =usuarioConfirmado?.email

    
 
    const pedidodata: IPedidos = req.body
    let data = {
        ...pedidodata,
        user: usuarioId,
        fecha: new Date()
    }
    const pedido = new Pedido(data)
    await pedido.save()
    // console.log(pedido)
    // const {fecha}=data
    // 
    


    if(email){
     await sendEmailPedido(email,pedido)
    }
    res.status(201).json({
        pedido
    })


}