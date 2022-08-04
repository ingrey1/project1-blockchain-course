const { Client } = require("pg");

// Queries to fetch data from Postgres Database

const READ_STARS_QUERY = `SELECT * FROM Stars;`;
const READ_BLOCKS_QUERY = `SELECT * FROM BLOCKS;`;

const executeQuery = async (queryFunction, queryArgs = null) => {
  let client;
  let result;
  try {
    client = new Client({
      connectionString: "postgres://mjqquacxxeqqrh:8d292df6419db1fc8f622207c114279cd3dc5cff8b8414897efc9fce9f09143e@ec2-44-206-197-71.compute-1.amazonaws.com:5432/d4n1vs2p9glj0s",// process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    client.connect();

    result = await queryFunction(client, queryArgs);
  } catch (error) {
    console.info("executeQuery failed");
    result = error;
  }
  client.end();
  return result;
};

const readStars = async (client, queryArgs = null) => {
  const queryResult = await client.query(READ_STARS_QUERY);
  return queryResult
};

const readBlocks = async (client, queryArgs = null) => {
    const queryResult = await client.query(READ_BLOCKS_QUERY);
    return queryResult
};

const test = async () => {
  const result = await executeQuery(readStars)
  console.info(result)
}

module.exports.query = {
    executeQuery,
    readStars,
    readBlocks
};
