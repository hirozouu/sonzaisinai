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
        const result = await client.query("SELECT * FROM question");
        console.log(result.rows[0].name);
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