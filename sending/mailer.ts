import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        user: "matias.lavigne@gmail.com",
        pass: "ohda mpry xnth qtkb"
    },
    from: "Uno Mas Petfood"
})

export const sendEmail = async (to: string, code: string): Promise<void> => {
    try {
        const mailOptions = {
            from: "matias lavigne",
            to,
            subject: "codigo de verificacion para la cuenta",
            text: ` llego tu codigo de verificacion
            el codigo es: ${code}
            ingresa a https://integrador-react-mu.vercel.app/verify para verificar tu cuenta`
        }

        //envio de correo
        await transporter.sendMail(mailOptions)
        console.log("correo enviado")
    } catch (error) {

        console.log("error al enviar el correo", error)
    }
}