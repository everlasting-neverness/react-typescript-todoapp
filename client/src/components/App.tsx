import * as React from 'react';
import axios from 'axios';

import UserForm from './UserForm/UserForm';
import Tasks from './Tasks/Tasks';
import Spinner from './Spinner/Spinner';

import { IProps, IState, ITask } from './interfaces';

export class App extends React.Component<IProps, IState> {
  state: IState;

  constructor(IProps: any) {
    super(IProps);
    this.state = {
      currentTask: '',
      tasks: [],
      showValidationError: false,
      isLoading: false,
      isEditing: false,
      currentEditingItem: ''
    };
    this.getItems();
  }

  private getItems = (): void => {
    this.setState({ isLoading: true, isEditing: false, currentEditingItem: '' });
    axios
      .get('/api/items')
      .then(res => {
        this.setState({ tasks: res.data, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  public handleDeleteTask = (_id: string): void => {
    this.setState({ isLoading: true, isEditing: false, currentEditingItem: '' });
    axios.delete(`/api/items/${_id}`).then(res => {
      let updatedTasks = this.state.tasks.filter(item => item._id !== res.data._id);
      this.setState({ tasks: updatedTasks, isLoading: false });
    }).catch(err => {
      console.log(err);
      this.setState({ isLoading: false });
    })
  };

  public toggleCompleteTask = (_id: string): void => {
    this.setState({ isLoading: true, isEditing: false, currentEditingItem: '' });
    let tasks: Array<ITask> = [...this.state.tasks],
      toggledTask = tasks.filter(task => task._id === _id)[0];
    // let toggledTask,
    //   filteredTasks: Array<ITask> = this.state.tasks.reduce((tasks: Array<ITask>, task: ITask): Array<ITask> => {
    //     if (task._id === _id) {
    //       toggledTask = task;
    //     } else {
    //       return tasks.push(task);
    //     }
    //   }, []);
      toggledTask.completed = !toggledTask.completed;
    axios
      .patch(`/api/items/${_id}`, toggledTask)
      .then((res: any) => {
        tasks.splice(tasks.indexOf(toggledTask), 1, res.data);
        this.setState({ tasks, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      })
  };

  public toggleTaskChange = (_id: string): void => {
    let tasks: Array<ITask> = [...this.state.tasks];
    if (this.state.isEditing && this.state.currentEditingItem === _id) {
      this.setState({ isLoading: true });
      let changedTask = tasks.filter(task => task._id === _id)[0];
      axios
      .patch(`/api/items/${_id}`, changedTask)
      .then((res: any) => {
        tasks.splice(tasks.indexOf(changedTask), 1, res.data);
        this.setState({ tasks, isEditing: false, isLoading: false, currentEditingItem: '' });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      })
    } else if (this.state.isEditing && this.state.currentEditingItem !== _id) {

    } else {
      tasks.forEach((task: ITask) => {
        if (task._id === _id) {
          this.setState({
            isEditing: true,
            currentEditingItem: _id
          })
        }
      });
    }
  };

  public handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!this.state.currentTask) {
      this.setState({
        showValidationError: true
      });
    } else {
      this.setState({ isLoading: true });
      axios
        .post('/api/items', {
          value: this.state.currentTask,
          completed: false
        })
        .then(res => {
          this.setState({
            tasks: [...this.state.tasks, res.data],
            currentTask: '',
            isLoading: false
          })
        }
        )
        .catch(err => {
          console.log(err);
          this.setState({ isLoading: false });
        })
    }
  };

  public handleTaskTextChange = (
    _id: string,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value: string = e.target.value;
    const tasks: Array<ITask> = [...this.state.tasks];
    tasks.forEach((task: ITask) => {
      if (task._id === _id) {
        task.value = value;
      }
    });
    this.setState({ tasks });
  };

  public handleUserInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ currentTask: e.target.value });
  };

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <header className='tdl__header'>
          <h1 className='header__title'>
            React TypeScript Todo List
                    </h1>
        </header>
        <UserForm
          handleSubmit={this.handleSubmit}
          handleUserInput={this.handleUserInput}
          inputValue={this.state.currentTask}
          showError={this.state.showValidationError}
        />
        {this.state.isLoading ? <Spinner /> : null}
        {this.state.tasks.length > 0 ? (
          <Tasks
            tasks={this.state.tasks}
            isEditing={this.state.isEditing}
            currentEditingItem={this.state.currentEditingItem}
            toggleCompleteTask={this.toggleCompleteTask.bind(this)}
            toggleTaskChange={this.toggleTaskChange.bind(this)}
            handleTaskTextChange={this.handleTaskTextChange}
            handleDeleteTask={this.handleDeleteTask}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
