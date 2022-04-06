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
        console.log("DATABASE : CONNECT");
        const result = await client.query(
            "SELECT * FROM question WHERE id=(SELECT id FROM question ORDER BY random() LIMIT 1);");
        console.log(result.rows[0].name);
        return result.rows[0];
    }
    catch(err)
    {
        console.log(err.stack);
    }
    finally
    {
        await client.end();
        console.log("DATABASE : DISCONNECT");
    }
}

module.exports.selectRandom = selectRandom;