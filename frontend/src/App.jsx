import "./App.css";

import Container from "./components/UI/Container";
import Form from "./components/Form/Form";
import TaskList from "./components/TaskList/TaskList";
import Modal from "./components/Modal/Modal";

import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const markTask = async (id, completed) => {
  const response = await fetch(`${API_URL}/update`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ id, completed }),
  });

  return response;
};

const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/delete`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  return response;
};

const createTasks = async (task) => {
  const response = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  return response;
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [modalShow, setModalShow] = useState("none");
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");

  const formSubmitHandler = async (title, description) => {
    if (title.length === 0 || description.length === 0) {
      setModalShow("block");
      setModalTitle("Invalid Input");
      setModalContent(
        "Do not leave fields empty! \nPlease enter title and description both."
      );
      return;
    }

    let newTask = { title, description };

    const response = await createTasks(newTask);

    // If response is 201 then we will display new task in tasks list
    if (response.status === 201) {
      newTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
      return;
    }

    // Else we will display the error
    setModalShow("block");
    setModalTitle("Something went wrong!");
    setModalContent(
      "There is something that went wrong! Please check your inputs and try again."
    );
  };

  const closeModalHandler = () => {
    setModalShow("none");
  };

  useEffect(() => {
    try {
      const getTasks = async () => {
        let response = await fetch(`${API_URL}`);

        if (response.status !== 200) {
          return;
        }

        let tasks = await response.json();

        setTasks(tasks);
      };

      getTasks();
    } catch (error) {
      setModalShow("block");
      setModalTitle("Something went wrong!");
      setModalContent("There is something that went wrong! Please try again.");
    }
  }, []);

  const markItemHandler = async (id) => {
    const oldTask = tasks.filter((task) => task._id === id)[0];

    const response = await markTask(id, !oldTask.completed);

    if (response.status === 200) {
      // Changing the completed property of the marked task to opposite of what it was
      let newTask = [...tasks];
      let i;
      for (i = 0; i < newTask.length; ++i) {
        if (newTask[i]._id === id) {
          newTask[i].completed = !newTask[i].completed;
          break;
        }
      }

      setTasks(newTask);

      return;
    }

    setModalShow("block");
    setModalTitle("Something went wrong!");
    setModalContent("There is something that went wrong! Please try again.");
  };

  const taskDeleteHandler = async (id) => {
    const response = await deleteTask(id);

    // If response is 200 then we will display new tasks list
    if (response.status == 200) {
      const newTasks = tasks.filter((task) => task._id !== id);
      setTasks(newTasks);
      return;
    }

    // Else we will display the error
    setModalShow("block");
    setModalTitle("Something went wrong!");
    setModalContent("There is something that went wrong! Please try again.");
  };

  // Seperating completed and uncompleted tasks
  const completed = tasks.filter((task) => task.completed === true);
  const uncompleted = tasks.filter((task) => task.completed === false);

  return (
    <main>
      <Container>
        <Form onSubmit={formSubmitHandler} />
      </Container>

      <section>
        <Container className="tasks-container">
          <p className="task-list-heading">Tasks</p>
          {tasks.length === 0 && <p> No tasks are there!</p>}
          {tasks.length !== 0 && (
            <TaskList
              onItemClick={markItemHandler}
              onTaskDelete={taskDeleteHandler}
            >
              {uncompleted}
            </TaskList>
          )}
        </Container>
        <Container className="tasks-container">
          <p className="task-list-heading">Completed</p>
          {tasks.length === 0 && <p> No tasks are completed!</p>}
          {tasks.length !== 0 && (
            <TaskList
              onItemClick={markItemHandler}
              onTaskDelete={taskDeleteHandler}
            >
              {completed}
            </TaskList>
          )}
        </Container>
      </section>

      <Modal
        onClose={closeModalHandler}
        show={modalShow}
        title={modalTitle}
        content={modalContent}
      ></Modal>
    </main>
  );
}

export default App;
