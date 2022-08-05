const { Client } = require("pg");

// Queries to fetch data from Postgres Database

const READ_STARS_QUERY = `SELECT * FROM Star;`;
const READ_BLOCKS_QUERY = `SELECT * FROM BLOCK;`;
const CREATE_BLOCK_QUERY = `INSERT INTO Block(block_hash, height, time, body, previous_block_hash)
VALUES($1, $2, $3, $4, $5) returning *;`;

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
  return queryResult;
};

const readBlocks = async (client, queryArgs = null) => {
  const queryResult = await client.query(READ_BLOCKS_QUERY);
  return queryResult;
};

const createBlock = async (client, values) => {
  console.info("Values: ", values);
  const {
    blockHash: block_hash,
    height,
    time,
    body,
    previousBlockHash: previous_block_hash,
  } = values;
  const queryResult = await client.query(CREATE_BLOCK_QUERY, [
    block_hash,
    height,
    time,
    body,
    previous_block_hash,
  ]);
  return queryResult;
};

const createStar = async (client, starData) => {};

module.exports = {
  executeQuery,
  readStars,
  readBlocks,
  createStar,
  createBlock,
};
