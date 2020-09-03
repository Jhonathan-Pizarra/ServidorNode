"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let productoSchema = new mongoose_1.Schema({
    nombre: { type: String, required: [true, 'Nombre es necesario'] },
    precioUni: { type: Number, required: [true, 'Precio es necesario'] },
    descripcion: { type: String, required: false },
    disponible: { type: Boolean, required: true, default: true },
    categoria: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Categoria', required: true },
});
//Exportamos el modelo:
exports.default = mongoose_1.model('Producto', productoSchema);
