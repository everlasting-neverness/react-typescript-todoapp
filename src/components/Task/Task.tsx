import * as React from "react";
import "./Task.scss";

import { ITaskRender } from "../interfaces";

const Task = (props: ITaskRender): JSX.Element => (
  <div className="tdl__task" key={props.task.id}>
    <div className="task__container">
      <button
        className="task__btn-icon btn"
        onClick={props.toggleCompleteTask.bind(this, props.task.id)}
      >
        {props.task.completed ? (
          <i className="task__icon task__icon--completed fas fa-check" />
        ) : (
            <i className="task__icon fas fa-circle" />
          )}
      </button>
      {!props.task.editMode ? (
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
            onChange={props.handleTaskTextChange.bind(this, props.task.id)}
          />
        )}
    </div>
    <div className="task__container">
      <button
        className="task__btn btn"
        onClick={props.toggleTaskChange.bind(this, props.task.id)}
      >
        {props.task.editMode ? "Save Changes" : "Change"}
      </button>
      <button
        className="task__btn btn"
        onClick={props.handleDeleteTask.bind(this, props.task.id)}
      >
        Delete
      </button>
    </div>
  </div>
);

export default Task;
