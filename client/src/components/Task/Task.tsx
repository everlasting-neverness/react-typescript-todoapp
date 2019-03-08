import * as React from "react";
import "./Task.scss";

import { ITaskRender } from "../interfaces";

const Task = (props: ITaskRender): JSX.Element => (
  <div className="tdl__task" key={props.task._id}>
    <div className="task__container">
      <button
        className="task__btn-icon btn"
        onClick={props.toggleCompleteTask.bind(null, props.task._id)}
      >
        {props.task.completed ? (
          <i className="task__icon task__icon--completed fas fa-check" />
        ) : (
            <i className="task__icon fas fa-circle" />
          )}
      </button>
      {props.currentEditingItem !== props.task._id ? (
        <span
          className={
            "task__value" +
            (props.task.completed ? " task__value--completed" : "")
          }
        >
          {props.task.value}
        </span>
      ) : (
          <input
            type="text"
            className="task__value task_value--editable input"
            value={props.task.value}
            onChange={props.handleTaskTextChange.bind(this, props.task._id)}
          />
        )}
    </div>
    <div className="task__container">
      <button
        className="task__btn btn"
        onClick={props.toggleTaskChange.bind(null, props.task._id)}
      >
        {props.isEditing && props.currentEditingItem === props.task._id ? "Save Changes" : "Change"}
      </button>
      <button
        className="task__btn btn"
        onClick={props.handleDeleteTask.bind(null, props.task._id)}
      >
        Delete
      </button>
    </div>
  </div>
);

export default Task;
