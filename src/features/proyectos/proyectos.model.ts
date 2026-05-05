import mongoose, { Schema, Document } from 'mongoose';

export interface IProyecto extends Document {
  nombre: string;
  descripcion: string;
  estado: 'Activo' | 'En espera' | 'Finalizado';
  prioridad: 'Alta' | 'Media' | 'Baja';
  ingenieroAsignado?: mongoose.Types.ObjectId | null;
  fechaEntrega: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ProyectoSchema = new Schema<IProyecto>(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },

    descripcion: {
      type: String,
      required: true,
      trim: true,
    },

    estado: {
      type: String,
      enum: ['Activo', 'En espera', 'Finalizado'],
      default: 'Activo',
    },

    prioridad: {
      type: String,
      enum: ['Alta', 'Media', 'Baja'],
      default: 'Media',
    },

    fechaEntrega: {
      type: Date,
      required: true,
    },


    ingenieroAsignado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      default: null, 
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProyectoModel = mongoose.model<IProyecto>(
  'Proyecto',
  ProyectoSchema
);