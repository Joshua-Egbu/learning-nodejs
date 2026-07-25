require("dotenv").config();

const express = require("express");
const app = express();

// body parsing middleware
app.use(express.json());
let todos = [
  { id: 1, task: "Learn Node.js", completed: false },
  { id: 2, task: "Build CRUD API", completed: false },
  { id: 3, task: "Wash the dishes", completed: true },
];

// get all
app.get("/todos", (req, res) => {
  res.status(200).json(todos); //Send array as JSON
});

// get active tasks
app.get("/todos/active", (req, res) => {
  const todo = todos.filter((t) => t.completed == false);
  return res.status(200).json(todo);
});

// get one
app.get("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.status(200).json(todo);
});

app.post("/todos", (req, res) => {
  const { task } = req.body;
  // check for empty task field
  if (!task)
    return res
      .status(400)
      .json({ error: "Empty field, Please fill in all fields" });

  const NewTodo = { id: todos.length + 1, task: task, completed: false }; //Auto-ID

  todos.push(NewTodo);
  res.status(201).json(NewTodo); //Echo back
});

app.patch("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id)); // Array.find()
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  Object.assign(todo, req.body); // Merge: e.g.. {completed: true}
  res.status(200).json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;
  todos = todos.filter((t) => t.id != id); // Array.filter() - non-destructive
  if (todos.length === initialLength)
    return res.status(404).json({ error: "Not found" });
  res.status(204).send(); //Silent success
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Server error!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
