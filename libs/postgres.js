const { Client } = require('pg');

// select randomly from database
const selectRandom = async () =>
{
    const client = new Client(
        {
            connectionString: process.env.DATABASE_URL, 
            ssl: 
            {
                rejectUnauthorized: false
            }
        }
    );
    try
    {
        await client.connect();
        console.log("CONNECT : PostgreSQL");
        const result = await client.query(
            "SELECT * FROM question WHERE id=(SELECT id FROM question ORDER BY random() LIMIT 1);");
        console.log("SELECT : id = %s", result.rows[0].id);
        return result.rows[0];
    }
    catch(err)
    {
        console.log(err.stack);
    }
    finally
    {
        await client.end();
        console.log("DISCONNECT : PostgreSQL");
    }
}

module.exports.selectRandom = selectRandom;