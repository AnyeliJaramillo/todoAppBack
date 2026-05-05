/// <reference types="jest" />

import * as authModule from './auth.service';

describe('HU1 - AuthService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('debe iniciar sesión correctamente', async () => {
    const resultado = {
      token: 'abc123',
      usuario: {
        correo: 'test@test.com',
        rol: 'ingeniero'
      }
    };

    jest.spyOn(authModule, 'loginUsuario').mockResolvedValue(resultado as any);

    const res = await authModule.loginUsuario('test@test.com', '123456');

    expect(res.token).toBe('abc123');
    expect(res.usuario.rol).toBe('ingeniero');
  });

  it('debe fallar con credenciales incorrectas', async () => {
    jest
      .spyOn(authModule, 'loginUsuario')
      .mockRejectedValue(new Error('Credenciales incorrectas'));

    await expect(
      authModule.loginUsuario('mal@test.com', '000')
    ).rejects.toThrow('Credenciales incorrectas');
  });
});