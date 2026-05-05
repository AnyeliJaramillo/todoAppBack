import mongoose, { Schema, Document } from "mongoose";

export interface IUsuarioDocument extends Document {
  nombre: string;
  correo: string;
  password: string;
  rol: string;
  activo: boolean;
  resetCode?: string | null;
  resetCodeExpires?: Date | null;
  resetVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const usuarioSchema = new Schema<IUsuarioDocument>(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    correo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    rol: {
      type: String,
      required: true,
      enum: ["admin", "ingeniero"]
    },
    activo: {
      type: Boolean,
      default: true
    },
    resetCode: {
      type: String,
      default: null
    },
    resetCodeExpires: {
      type: Date,
      default: null
    },
    resetVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Usuario = mongoose.model<IUsuarioDocument>("Usuario", usuarioSchema);

export default Usuario;