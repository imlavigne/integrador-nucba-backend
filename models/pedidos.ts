import { Model, Schema, model, Types } from "mongoose";

interface IItem {
    des: string;
    id: Number;
    precio: Number;
    cantidad: Number;
    title: string;
}

export interface IPedidos {
    fecha: Date;
    user: Types.ObjectId;
    precio: Number;
    items: IItem[];
    direccion: String;
    localidad: String;
    codigoPostal: Number;
}

const PedidoSchema = new Schema<IPedidos>({
    fecha: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: [true, "El usuario es requerido"]
    },
    precio: {
        type: Number,
        require: true
    },
    items: {
        type: [{
            descripcion: {
                type: String,
                required: true,
            },
            id: {
                type: Number,
                required: true,
            },
            precio: {
                type: Number,
                required: true
            },
            cantidad: {
                type: Number,
                required: true
            },
            marca: {
                type: String,
                required: true
            }
        }
        ],
        required:true
    },
    direccion: {
        type: String,
        required: true
    },
    localidad: {
        type: String,
        required: true
    },
    codigoPostal:{
        type:Number,
        required:true
    }

})

const Pedido: Model<IPedidos> = model<IPedidos>("Pedidos", PedidoSchema)

export default Pedido