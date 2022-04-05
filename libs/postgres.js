const { get } = require('express/lib/response');
const {Pool} = require('pg');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString});

class Postgres
{
    async init() 
    {
        this.client = await pool.connect();
    }

    async execute(query, params = [])
    {
        return (await this.client.query(query, params)).rows();
    }

    async release()
    {
        await this.client.release(true);
    }

    async begin()
    {
        await this.client.query("BEGIN");
    }

    async commit()
    {
        await this.client.query("COMMIT");
    }

    async rollback() 
    {
        await this.client.query("ROLLBACK");
    }
}

const getClient = async () =>
{
    const postgres = new Postgres();
    await postgres.init();
    return postgres;
};

module.exports.getPostgresClient = getClient;