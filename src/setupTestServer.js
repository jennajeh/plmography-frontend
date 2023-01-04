import server from './testServer';

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
