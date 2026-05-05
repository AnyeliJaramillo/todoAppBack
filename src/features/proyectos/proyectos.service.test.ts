/// <reference types="jest" />

import { proyectosService } from './proyectos.service';
import { ProyectoModel } from './proyectos.model';
import Tarea from '../tareas/tareas.model';

jest.mock('./proyectos.model', () => ({
  ProyectoModel: {
    findById: jest.fn(),
    findByIdAndDelete: jest.fn()
  }
}));

jest.mock('../tareas/tareas.model', () => ({
  __esModule: true,
  default: {
    deleteMany: jest.fn()
  }
}));

describe('HU4 - ProyectosService', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('debe eliminar un proyecto y sus tareas', async () => {
    const proyectoMock = { _id: '1', nombre: 'Test' };

    (ProyectoModel.findById as jest.Mock).mockResolvedValue(proyectoMock);
    (Tarea.deleteMany as jest.Mock).mockResolvedValue({});
    (ProyectoModel.findByIdAndDelete as jest.Mock).mockResolvedValue(proyectoMock);

    const res = await proyectosService.eliminarProyecto('1');

    expect(Tarea.deleteMany).toHaveBeenCalledWith({ proyecto: '1' });
    expect(res).toEqual(proyectoMock);
  });

  it('debe retornar null si no existe', async () => {
    (ProyectoModel.findById as jest.Mock).mockResolvedValue(null);

    const res = await proyectosService.eliminarProyecto('999');

    expect(res).toBeNull();
  });
});