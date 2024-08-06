import database from "infra/database";

async function cleanDatabase() {
  await database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
}

beforeAll(cleanDatabase);

test("POST to /api/v1/migrations should return 200", async () => {
  const firstResponse = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(firstResponse.status).toBe(201);

  const firstResponseBody = await firstResponse.json();

  expect(Array.isArray(firstResponseBody)).toBe(true);
  expect(firstResponseBody.length).toBeGreaterThan(0);
  expect(firstResponseBody[0]).toHaveProperty("name");
  expect(firstResponseBody[0]).toHaveProperty("path");
  expect(firstResponseBody[0]).toHaveProperty("timestamp");

  const lastResponse = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(lastResponse.status).toBe(200);

  const lastResponseBody = await lastResponse.json();

  expect(Array.isArray(lastResponseBody)).toBe(true);
  expect(lastResponseBody.length).toBe(0);
});
