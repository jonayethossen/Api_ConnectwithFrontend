const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/dbConfig");
const todoModel = require("./model/todoModel");
const app = express();

dbConnect();
app.use(cors());

// express middleware
app.use(express.json());

// defult route
app.get("/", (req, res) => {
  res.send("Welcome to our world");
});

// create todo
app.post("/todos/add", async (req, res) => {
  let { task } = req.body;
  let createtodo = new todoModel({
    task: task,
  });
  await createtodo.save();
  res.status(201).send({ success: "todo created", data: createtodo });
});

// get all todo
app.get("/todos", async (req, res) => {
  let getalltodo = await todoModel.find({});
  res
    .status(200)
    .send({ success: "data fetch successfully", data: getalltodo });
});
// singletodo
app.get("/todos/:id", async (req, res) => {
  let { id } = req.params;
  let singletodo = await todoModel.findOne({ _id: id });
  res
    .status(200)
    .send({ success: "singletodo fetch successfull", data: singletodo });
});
// delet todo
app.delete("/todos/delete/:id", async (req, res) => {
  let { id } = req.params;
  let deletetodo = await todoModel.findOneAndDelete({ _id: id });
  res.status(200).send({ success: "todo deleted", data: deletetodo });
});
// update todo
app.patch("/todos/update/:id", async (req, res) => {
  let { id } = req.params;
  let { task } = req.body;
  let updatetodo = await todoModel.findOneAndUpdate(
    { _id: id },
    { task: task },
    { new: true }
  );
  res
    .status(200)
    .send({ success: "Todo Updated successfull", date: updatetodo });
});

// start server
app.listen(3000, () => {
  console.log("server is running port number 3000");
});
