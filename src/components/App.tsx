import * as React from "react";

import UserForm from "./UserForm/UserForm";
import Tasks from "./Tasks/Tasks";

import { IState, ITask } from "./interfaces";

export class App extends React.Component<{}, IState> {
  state: IState = {
    currentTask: "",
    tasks: [],
    showValidationError: false
  };

  private _timeInMilliseconds = (): number => {
    const date: Date = new Date();
    return date.getTime();
  };

  public handleDeleteTask = (id: number): void => {
    this.setState({
      tasks: this.state.tasks.filter((task: ITask) => task.id !== id)
    });
  };

  public toggleCompleteTask = (id: number): void => {
    const tasks: Array<ITask> = [...this.state.tasks];
    tasks.forEach((task: ITask) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
    });
    this.setState({ tasks });
  };

  public handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!this.state.currentTask) {
      this.setState({
        showValidationError: true
      });
    } else {
      this.setState({
        currentTask: "",
        showValidationError: false,
        tasks: [
          ...this.state.tasks,
          {
            value: this.state.currentTask,
            id: this._timeInMilliseconds(),
            completed: false,
            editMode: false
          }
        ]
      });
    }
  };

  public handleTaskTextChange = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    const tasks: Array<ITask> = [...this.state.tasks];
    tasks.forEach((task: ITask) => {
      if (task.id === id) {
        task.value = value;
      }
    });
    this.setState({ tasks });
  };

  public toggleTaskChange = (id: number): void => {
    const tasks: Array<ITask> = [...this.state.tasks];
    tasks.forEach((task: ITask) => {
      if (task.id === id) {
        task.editMode = !task.editMode;
      }
    });
    this.setState({ tasks });
  };

  public handleUserInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ currentTask: e.target.value });
  };

  public renderTasks = (): JSX.Element[] => {
    return this.state.tasks.map((task: ITask, index: number) => {
      return (
        <div className="tdl__task" key={task.id}>
          <span
            className={
              "task__value" + task.completed ? " task__value--completed" : ""
            }
          >
            {task.value}
          </span>
          <span className="">Completed: {String(task.completed)}</span>
          <button onClick={this.handleDeleteTask.bind(this, task.id)}>
            Delete
          </button>
          <button onClick={this.toggleCompleteTask.bind(this, task.id)}>
            {task.completed ? "Incomplete" : "Complete"}
          </button>
        </div>
      );
    });
  };

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <header className="tdl__header">
          <h1 className="header__title">React TypeScript Todo List</h1>
        </header>
        <UserForm
          handleSubmit={this.handleSubmit}
          handleUserInput={this.handleUserInput}
          inputValue={this.state.currentTask}
          showError={this.state.showValidationError}
        />
        {this.state.tasks.length > 0 ? (
          <Tasks
            tasks={this.state.tasks}
            toggleCompleteTask={this.toggleCompleteTask}
            toggleTaskChange={this.toggleTaskChange}
            handleTaskTextChange={this.handleTaskTextChange}
            handleDeleteTask={this.handleDeleteTask}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
