import mongoose, { Document, Schema } from 'mongoose';

export interface ITareaDocument extends Document {
  titulo: string;
  descripcion: string;
  proyecto: mongoose.Types.ObjectId;
  ingenieroAsignado: mongoose.Types.ObjectId;
  prioridad: 'Alta' | 'Media' | 'Baja';
  estado: 'Pendiente' | 'En progreso' | 'Finalizada';
  createdAt: Date;
  updatedAt: Date;
}

const tareaSchema = new Schema<ITareaDocument>(
  {
    titulo: {
      type: String,
      required: true,
      trim: true
    },
    descripcion: {
      type: String,
      required: true,
      trim: true
    },
    proyecto: {
      type: Schema.Types.ObjectId,
      ref: 'Proyecto',
      required: true
    },
    ingenieroAsignado: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true
    },
    prioridad: {
      type: String,
      enum: ['Alta', 'Media', 'Baja'],
      default: 'Media'
    },
    estado: {
      type: String,
      enum: ['Pendiente', 'En progreso', 'Finalizada'],
      default: 'Pendiente'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Tarea = mongoose.model<ITareaDocument>('Tarea', tareaSchema);

export default Tarea;