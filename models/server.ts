import express, {Express} from "express"

import { dbConnection } from "../datebase/config";
import cors from "cors"
import authRoutes from "../routes/auth"
import pedidosRoutes from "../routes/pididos"




export class Server {
    
    app: Express;
    port: string|number|undefined;
    authPath:string; //manejo el endpoint desde una variable
    pedidosPath:string; //manejo el endpoint desde una variable
    constructor() {
        this.app=express();
        this.port=process.env.PORT
        this.authPath="/usuario"
        this.pedidosPath="/pedidos"
        this.connectarABasadeDats();
        this.middlewares();
        this.routes();
        
    }
    async connectarABasadeDats(): Promise<void>{
        await dbConnection()
    }

    middlewares():void
{
     this.app.use(cors())
    this.app.use(express.json())
}

routes():void{
    this.app.use(this.authPath,authRoutes)
    this.app.use(this.pedidosPath,pedidosRoutes)
}
    listen():void{
        this.app.listen(this.port,()=>{
            console.log(`server is running on port ${this.port}`);
        })
    }

} 