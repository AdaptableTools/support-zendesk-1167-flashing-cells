export const fetchApi = {
  get: async (relativeUrl: string) =>
    await fetch(`${configuration.serverUrl}${relativeUrl}`, {
      method: 'GET',
    }),
  post: async <TBody>(relativeUrl: string, body: TBody) =>
    await fetch(`${configuration.serverUrl}${relativeUrl}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }),
  delete: async (relativeUrl: string) =>
    await fetch(`${configuration.serverUrl}${relativeUrl}`, {
      method: 'DELETE',
    }),
};
