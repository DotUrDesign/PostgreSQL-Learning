CREATE DATABASE todo_database;

-- \c todo_database   -> to connnect to the database 

-- schema of the database
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,   -- you don't have to specify the todo_id, it will automatically take the next serial number.
    description VARCHAR(255)
);

-- \dt  -> to see the list of relations