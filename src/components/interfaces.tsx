export interface IState {
  currentTask: string;
  tasks: Array<ITask>;
  showValidationError: boolean;
}

export interface ITasks {
  tasks: Array<ITask>;
  toggleCompleteTask(id: number): void;
  handleDeleteTask(id: number): void;
}

export interface ITask {
  id: number;
  value: string;
  completed: boolean;
}

export interface ITaskRender {
  task: ITask;
  toggleCompleteTask(id: number): void;
  handleDeleteTask(id: number): void;
}

export interface IForm {
  inputValue: string;
  showError: boolean;
  handleUserInput(e: React.ChangeEvent<HTMLInputElement>): void;
  handleSubmit(e: React.FormEvent<HTMLFormElement>): void;
}
