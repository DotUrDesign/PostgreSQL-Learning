const express = require('express');
const app = express();
app.use(express.json());
const pool = require('./db');

/* ROUTES */

// get all todos
app.get("/allTodos", async (req, res) => {
    let allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
})

// get a todo
app.get("/todos/:id", async (req, res) => {
    const id = req.params.id;
    let todo = await pool.query(
        "SELECT * FROM todo WHERE todo_id = $1",
        [id]
    );
    
    res.json(todo.rows);
})

// create a todo
app.post("/createTodo", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *", 
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})

// update a todo 
app.patch("/updateTodo/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let { description } = req.body;
        const updatedTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
            );
        res.json({
            message: "todo was updated",
            updatedTodo: updatedTodo
        })
    } catch (error) {
        console.log(error.message);
    }
})

// delete a todo
app.delete("/deleteTodo/:id", async (req, res) => {
    let id = req.params.id;
    let deletedTodo = await pool.query(
        "DELETE FROM todo WHERE todo_id = $1", 
        [id]
    );

    res.json("todo deleted successfully");
})

app.listen(5000, () => {
    console.log("server is running at port 5000");
});

