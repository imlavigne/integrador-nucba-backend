import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "matias.lavigne@gmail.com",
        pass: "ohda mpry xnth qtkb"
    },
    from: "Uno Mas Petfood"
})

export const sendEmailPedido = async (to: string,data:object|string|null|undefined|Date|Number): Promise<void> => {

  
    
    try {
         const provedor = {
             from: "matias lavigne",
             to:process.env.PROVEEDOR,
             subject: "tienes una nueva compra",
             text: ` 
             vendiste:

           el pedido ${data}
          
           `
         }

        const mailOptions = {
            from: "matias lavigne",
            to,
            subject: "Resumen de tu pedido",
            text: ` 
          tu pedido ${data}
          fue realizado con exito  
          `
        }

        //envio de correo
        await transporter.sendMail(mailOptions)
         await transporter.sendMail(provedor)
     
    } catch (error) {

        console.log("error al enviar el correo", error)
    }
}