const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON requests

let tasks = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { description } = req.body;
  const newTask = { id: tasks.length + 1, description, completed: false };
  tasks.push(newTask);
  res.json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  // Toggle the completion status directly
  task.completed = !task.completed;

  // Respond with the updated task
  res.json(task);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
