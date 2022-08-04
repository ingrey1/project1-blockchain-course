const { Client } = require("pg");

// Queries to fetch data from Postgres Database

const READ_STARS_QUERY = `SELECT * FROM Stars;`;
const READ_BLOCKS_QUERY = `SELECT * FROM BLOCKS;`;

const executeQuery = async (queryFunction, queryArgs = null) => {
  let client;
  let result;
  try {
    client = new Client({
      connectionString: process.env.DATABASE_URL,
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

test()



module.exports.query = {
    executeQuery,
    readStars,
    readBlocks
};
