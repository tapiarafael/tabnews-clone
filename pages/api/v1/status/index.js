import database from "infra/database.js";

async function status(request, response) {
  const pgVersionResult = await database.query(`SHOW SERVER_VERSION;`);
  const maxConnectionsResult = await database.query(`SHOW MAX_CONNECTIONS;`);
  const connectionsResult = await database.query(
    `SELECT count(1) FROM pg_stat_activity;`,
  );

  const updatedAt = new Date().toISOString();
  const pgVersion = pgVersionResult.rows[0].server_version;
  const maxConnections = Number(maxConnectionsResult.rows[0].max_connections);
  const usedConnections = Number(connectionsResult.rows[0].count);

  response.status(200).json({
    updated_at: updatedAt,
    database: {
      version: pgVersion,
      max_connections: maxConnections,
      used_connections: usedConnections,
    },
  });
}

export default status;
