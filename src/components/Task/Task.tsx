import * as React from "react";
import "./Task.scss";

import { ITaskRender } from "../interfaces";

const Task = (props: ITaskRender): JSX.Element => (
  <div className="tdl__task" key={props.task.id}>
    <div className="task__container">
      <span
        className={
          "task__value" +
          (props.task.completed ? " task__value--completed" : "")
        }
      >
        {props.task.value}
      </span>
    </div>
    <div className="task__container">
      <button
        className="task__btn btn"
        onClick={props.handleDeleteTask.bind(this, props.task.id)}
      >
        Delete
      </button>
      <button
        className="task__btn btn"
        onClick={props.toggleCompleteTask.bind(this, props.task.id)}
      >
        {props.task.completed ? "Undo" : "Done"}
      </button>
    </div>
  </div>
);

export default Task;
