import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';

//rutas de producto:
import producto from './routes/producto';
import categoria from './routes/categoria';

//clase
class  Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();

    this.routes();
  }

  config(){
    this.app.set('port', process.env.PORT || 3000);

    //ver
    this.app.use(morgan('dev'));
    //proteccion backend
    this.app.use(helmet());

    //Conexion a la bd
    const MONGO_URI = 'mongodb://localhost:27017/cafe';
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, userUnifiedTopology: true, userCreateIndex: true})
    .then(()=>{
      console.log("BDD Ok");
    });

    //Compresion de las respuestas
    this.app.use(compression());

    this.app.use(cors());
    //recibir y enviar respiestas
    this.app.use(express.json());

    //soporte para envio de forms
    this.app.use(express.urlencoded({extended:false}));


  }

  routes(){
    this.app.use('/api/producto', producto);
    this.app.use('/api/categoria', categoria);
  }

  start(){
    //Iniciar el servidor Express
    this.app.listen(this.app.get('port'), ()=> {
      console.log('Servidor funcionando: ok...');
    });
  }



}

//instancia de la class
const server = new Server();
server.start();
