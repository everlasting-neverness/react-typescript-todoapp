export interface IProps {}

export interface IState {
  currentTask: string;
  tasks: Array<ITask>;
  showValidationError: boolean;
  isLoading: boolean;
  isEditing: boolean;
  currentEditingItem: string;
}

export interface ITasks {
  tasks: Array<ITask>;
  isEditing: boolean;
  currentEditingItem: string;
  toggleCompleteTask(_id: string): void;
  handleDeleteTask(_id: string): void;
  handleTaskTextChange(
    _id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ): void;
  toggleTaskChange(_id: string): void;
}

export interface ITask {
  _id: string;
  value: string;
  completed: boolean;
}

export interface ITaskRender {
  task: ITask;
  isEditing: boolean;
  currentEditingItem: string;
  toggleCompleteTask(_id: string): void;
  handleDeleteTask(_id: string): void;
  handleTaskTextChange(
    _id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ): void;
  toggleTaskChange(_id: string): void;
}

export interface IForm {
  inputValue: string;
  showError: boolean;
  handleUserInput(e: React.ChangeEvent<HTMLInputElement>): void;
  handleSubmit(e: React.FormEvent<HTMLFormElement>): void;
}
