const { Client } = require('pg');

// This script was used to create the tables in the Postgres Cloud Database
// DONT RUN THIS SCRIPT


try {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    client.connect()

    // 

    const createBlockTableText = `CREATE TABLE IF NOT EXISTS Block (
        id serial PRIMARY KEY,
        block_hash VARCHAR(50) NOT NULL,
        height INTEGER NOT NULL,
        time  INTEGER NOT NULL,
        body VARCHAR(255) NOT NULL,
        previous_block_hash NOT NULL
     );`

     const createStarTableText = `CREATE TABLE IF NOT EXISTS Star (
        id serial PRIMARY KEY,
        star_data JSON NOT NULL
     );`

    await client.query(createBlockTableText)

    await client.query(createStarTableText)
    
    client.end()

    console.info("database tables created")
  } catch (error) {
    console.info("failed to create database tables")
    console.error(error) 
  }
