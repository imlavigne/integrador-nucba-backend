import Usuario from "../models/usuario";
import { IUser } from "../models/usuario";
import { sendEmail } from "../sending/mailer";

//verifico si el email esta en la base de datos
export const existeEmail = async (email: string): Promise<void> => {

    const existeMail: IUser | null = await Usuario.findOne({ email })
    if (existeMail && existeMail.verifield) {
        throw new Error('El correo electronico ya se encuentra en la base de datos')
    }
    if (existeMail && !existeMail.verifield) {
        await sendEmail(email, existeMail.code as string)
        throw new Error('el usuario ya esta registrado. se envio nuevamente el codigo al email')
    }

}
