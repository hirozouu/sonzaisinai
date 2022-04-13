const { Client } = require('pg');
const client = require('pg/lib/native/client');

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

const insertQuiz = function(quiz)
{
    client.query("INSERT INTO question (name, writer, text_question, selection0, selection1, selection2, selection3, text_answer, answer, text_explanation) VALUES ("
    + quiz.name + ", " 
    + quiz.writer + ", "
    + quiz.text_question + ", "
    + quiz.selection0 + ", "
    + quiz.selection1 + ", "
    + quiz.selection2 + ", "
    + quiz.selection3 + ", "
    + quiz.text_answer + ", "
    + quiz.answer + ", "
    + quiz.text_explanation + ");")
}

module.exports.selectRandom = selectRandom;
module.exports.insertQuiz = insertQuiz;