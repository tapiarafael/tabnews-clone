import database from "infra/database.js";

async function status(request, response) {
  const pgVersionResult = await database.query(`SHOW server_version;`);
  const maxConnectionsResult = await database.query(`SHOW max_connections;`);
  const dbName = process.env.POSTGRES_DB;
  const openedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [dbName],
  });

  const updatedAt = new Date().toISOString();
  const pgVersion = pgVersionResult.rows[0].server_version;
  const maxConnections = Number(maxConnectionsResult.rows[0].max_connections);
  const openedConnections = openedConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: pgVersion,
        max_connections: maxConnections,
        opened_connections: openedConnections,
      },
    },
  });
}

export default status;
