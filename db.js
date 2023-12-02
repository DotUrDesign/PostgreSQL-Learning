const Pool = require('pg').Pool;

// this is how we connect the database in postgreSQL
const pool = new Pool({
    user: "postgres",
    password: "Pratyush",
    database: "todo_database",
    host: "localhost",
    port: "5432"
});

module.exports = pool;