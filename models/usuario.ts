import { Model,Schema,model } from "mongoose";



export interface IUser{
    nombre:string;
    email:string;
    password: string;
    cellphone: number;
    code?:string;
    verifield?:string;
}

const UserSchema = new Schema <IUser>({
    nombre:{
        type:String,
        required:[true ,"el nombre es reuerido"]
    },

    email:{
        type:String,
        required:[true,"el correo es obligatorio"]
    },
    password:{
         type : String,
        required:[true,"la contraseña es obligatoria"]
    },
    cellphone:{
        type: Number ,
        required:[true,"el telefono es obligatorio"]
    },
   
    code:{
        type:String
    },
    verifield:{
        type:Boolean,
        default:false
    }

})
UserSchema.methods.toJSON = function(){
    const {__v,password,code,...usuario}=this.toObject()
    return usuario  
}

const Usuario: Model<IUser>=model <IUser>("Usuario",UserSchema)

export default Usuario