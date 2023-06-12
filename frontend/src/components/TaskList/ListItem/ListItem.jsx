import listItemClasses from "./ListItem.module.css";

const ListItem = (props) => {
  const deleteClickHandler = () => {
    props.onDelete(props.id);
  };

  const checkBoxClickHandler = () => {
    props.onMark(props.id);
  };

  return (
    <table>
      <tbody>
        <tr>
          <td className={listItemClasses["task"]}>
            <div className={listItemClasses["task-title"]}>{props.title}</div>
            <p className={listItemClasses["task-desc"]}>{props.desc}</p>
          </td>
          <td>
            <span
              onClick={deleteClickHandler}
              className={`material-symbols-outlined ${listItemClasses["task-delete-button"]}`}
            >
              delete
            </span>
            <div className={listItemClasses["checkbox-wrapper-1"]}>
              <input
                defaultChecked={props.marked}
                onClick={checkBoxClickHandler}
                id={`checkbox-${props.id}`}
                className={listItemClasses["substituted"]}
                type="checkbox"
                aria-hidden="true"
              />
              <label htmlFor={`checkbox-${props.id}`}></label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ListItem;
