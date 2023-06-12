require("./db/conn");

const Task = require("./db/model");

const createTask = async (req, res) => {
  try {
    const task = req.body;

    if (!task.title || !task.description) {
      throw {
        status: 400,
        msg: "Please enter a title.",
      };
    }

    const newTask = new Task(task);
    
    await newTask.save();

    return res.status(201).send(newTask);
  } catch (error) {
    if (error.status === 400) {
      return res.status(error.status).send(error.msg);
    }
    console.log(error)
    return res.status(500).send("Oops! Something went wrong!");
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});

    if(!tasks.length) {
      throw new Error("There are no tasks");
    }

    return res.status(200).send(tasks);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const markTask = async (req, res) => {
  try {
    const {id, completed} = req.body;

    await Task.findByIdAndUpdate(id, { completed });

    return res.status(200).send("Task marked.");
  } catch (error) {
    return res.status(500).send("Oops! Something went wrong!");
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.body.id;
    
    await Task.findByIdAndDelete(id);

    return res.status(200).send("Task deleted.");
  } catch (error) {
    return res.status(500).send("Oops! Something went wrong!");
  }
};

module.exports = {
  getAllTasks,
  deleteTask,
  markTask,
  createTask,
};
