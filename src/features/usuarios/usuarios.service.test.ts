/// <reference types="jest" />

import * as usuariosModule from './usuarios.service';
import Usuario from './usuarios.model';

jest.mock('./usuarios.model', () => ({
  __esModule: true,
  default: {
    find: jest.fn(),
    create: jest.fn()
  }
}));

describe('HU3 - UsuariosService', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('debe obtener lista de usuarios', async () => {
    const mockUsuarios = [{ nombre: 'Jose' }];

    (Usuario.find as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue(mockUsuarios)
    });

    const res = await usuariosModule.obtenerUsuarios();

    expect(res.length).toBe(1);
    expect(res[0].nombre).toBe('Jose');
  });
});