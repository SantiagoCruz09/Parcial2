import { loadRemoteModule } from '@angular-architects/module-federation';
import { RemoteFallbackComponent } from './remote-fallback.component';
import { routes } from './app.routes';

jest.mock('@angular-architects/module-federation', () => ({
  loadRemoteModule: jest.fn(),
}));

describe('rutas federadas del host', () => {
  const loadRemote = loadRemoteModule as jest.MockedFunction<
    typeof loadRemoteModule
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('define las tres rutas remotas y la redirección', () => {
    expect(routes.map((route) => route.path)).toEqual([
      'books',
      'authors',
      'loans',
      '**',
    ]);
  });

  it('carga el componente remoto cuando responde', async () => {
    class RemotePage {}
    loadRemote.mockResolvedValue({ BooksPage: RemotePage });

    const component = await routes[0].loadComponent!();

    expect(component).toBe(RemotePage);
    expect(loadRemote).toHaveBeenCalledWith({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './BooksPage',
    });
  });

  it('carga los remotos de autores y préstamos', async () => {
    class AuthorsPage {}
    class LoansPage {}
    loadRemote
      .mockResolvedValueOnce({ AuthorsPage })
      .mockResolvedValueOnce({ LoansPage });

    expect(await routes[1].loadComponent!()).toBe(AuthorsPage);
    expect(await routes[2].loadComponent!()).toBe(LoansPage);
  });

  it('devuelve el fallback cuando el remoto falla', async () => {
    loadRemote.mockRejectedValue(new Error('remoto caído'));

    const component = await routes[0].loadComponent!();

    expect(component).toBe(RemoteFallbackComponent);
  });
});
