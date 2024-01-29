import jwt from "jsonwebtoken"


export const generarJWT = (id: string = ""): Promise<string> => {
    return new Promise((resolve, reject) => {
        const payload = { id }
        //creamos el token con la clave secreta y los datos del payload

        jwt.sign(
            payload,
            process.env.CLAVETOKEN as string, //Clave secreta
            { expiresIn: "5h" },
            (error: Error | null, token: String | undefined) => {
                if (error) {
                    console.log(error)
                    reject("no se pudo generar token")
                }
                else {
                    resolve(token as string)
                }

            }


        )
    }
    )
}
