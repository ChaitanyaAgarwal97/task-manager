import taskListClasses from "./TaskList.module.css";

import ListItem from "./ListItem/ListItem";

const TaskList = (props) => {
  const listItemClickHandler = (id) => {
    props.onItemClick(id);
  };

  const taskDeleteHandler = (id) => {
    props.onTaskDelete(id);
  };

  const liArray = props.children.map((child) => {
    return (
      <li
        id={child._id}
        key={child._id}
        className={child.completed ? taskListClasses["strike-through"] : ""}
      >
        <ListItem
          marked={child.completed}
          onMark={listItemClickHandler}
          id={child._id}
          onDelete={taskDeleteHandler}
          title={child.title}
          desc={child.description}
        />
      </li>
    );
  });

  return <ul>{liArray}</ul>;
};

export default TaskList;
