import * as React from "react";
import "./Tasks.scss";

import Task from "../Task/Task";

import { ITasks, ITask } from "../interfaces";

class Tasks extends React.Component<ITasks, {}> {
  public renderTasks = (): JSX.Element[] => {
    return this.props.tasks.map(
      (task: ITask): JSX.Element => {
        return (
          <Task
            task={task}
            toggleCompleteTask={this.props.toggleCompleteTask}
            handleDeleteTask={this.props.handleDeleteTask}
            handleTaskTextChange={this.props.handleTaskTextChange}
            toggleTaskChange={this.props.toggleTaskChange}
          />
        );
      }
    );
  };

  render() {
    return (
      <section className="tdl__task-section">{this.renderTasks()}</section>
    );
  }
}

export default Tasks;
