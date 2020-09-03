"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
//rutas de producto:
const producto_1 = __importDefault(require("./routes/producto"));
const categoria_1 = __importDefault(require("./routes/categoria"));
//clase
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        //ver
        this.app.use(morgan_1.default('dev'));
        //proteccion backend
        this.app.use(helmet_1.default());
        //Conexion a la bd
        const MONGO_URI = 'mongodb://localhost:27017/cafe';
        mongoose_1.default.connect(MONGO_URI, { useNewUrlParser: true, userUnifiedTopology: true, userCreateIndex: true })
            .then(() => {
            console.log("BDD Ok");
        });
        //Compresion de las respuestas
        this.app.use(compression_1.default());
        this.app.use(cors_1.default());
        //recibir y enviar respiestas
        this.app.use(express_1.default.json());
        //soporte para envio de forms
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api/producto', producto_1.default);
        this.app.use('/api/categoria', categoria_1.default);
    }
    start() {
        //Iniciar el servidor Express
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor funcionando: ok...');
        });
    }
}
//instancia de la class
const server = new Server();
server.start();
