import mongoose from "mongoose";


export const dbConnection =async ():Promise<void>=>{
    

    try {
        // intentando haber si puedo conectarme desde vercel a la db
        const dbURL=process.env.DB_URL;
        //conexion a la base de datos
        //  const dbURL="mongodb+srv://integradorNucba:KKX3Jy3qP99yuVB8@cluster0.l66arwd.mongodb.net/";
        if(!dbURL){
            throw new Error("No DB URL found");
            
        }
        await mongoose.connect(dbURL)
        console.log("base de datos online")
    } catch (error) {
        console.log(error)
        throw new Error("error al conectar a la bd")

    }
}