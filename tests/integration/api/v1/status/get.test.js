test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedDate = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedDate);

  expect(responseBody.database.version).toBeDefined();
  expect(typeof responseBody.database.version).toEqual("string");

  expect(responseBody.database.max_connections).toBeDefined();
  expect(typeof responseBody.database.max_connections).toEqual("number");

  expect(responseBody.database.used_connections).toBeDefined();
  expect(typeof responseBody.database.used_connections).toEqual("number");
});
