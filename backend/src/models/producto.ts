import { Schema, model } from 'mongoose';

let productoSchema = new Schema(
  {
     nombre: { type: String, required: [true, 'Nombre es necesario']},
     precioUni: {type: Number, required: [true, 'Precio es necesario']},
     descripcion: {type: String, required: false },
     disponible: {type: Boolean, required: true, default: true },
     categoria: {type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
   }
);

//Exportamos el modelo:
export default model('Producto', productoSchema);
