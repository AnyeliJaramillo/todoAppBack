/// <reference types="jest" />

import * as tareasModule from './tareas.service';
import Tarea from './tareas.model';

jest.mock('./tareas.model', () => ({
  __esModule: true,
  default: {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn()
  }
}));

describe('HU5 y HU6 - TareasService', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('debe crear una tarea', async () => {
    const data = {
      titulo: 'Nueva tarea',
      descripcion: 'Desc',
      proyecto: 'p1',
      ingenieroAsignado: 'u1',
      prioridad: 'Alta',
      estado: 'Pendiente'
    };

    (Tarea.create as jest.Mock).mockResolvedValue({ _id: 't1', ...data });
    (Tarea.findById as jest.Mock).mockReturnValue({
      populate: jest.fn().mockReturnThis()
    });

    const res = await tareasModule.crearTarea(data as any);

    expect(Tarea.create).toHaveBeenCalledWith(data);
    expect(res).toBeDefined();
  });
});