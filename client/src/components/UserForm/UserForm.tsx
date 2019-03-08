import * as React from "react";
import "./UserForm.scss";

import { IForm } from "../interfaces";

const UserForm = (props: IForm): JSX.Element => (
  <section className="tdl__form-section">
    <form className="tdl__form" onSubmit={props.handleSubmit}>
      <label htmlFor="todo-input" className="form__label">
        {" "}
        Enter your task here
      </label>
      <input
        id="todo-input"
        type="text"
        className="form__input input"
        placeholder={props.showError ? "Task text can not be empty" : ""}
        value={props.inputValue}
        onChange={props.handleUserInput}
      />
      <button className="form__btn btn">Add Task</button>
    </form>
  </section>
);

export default UserForm;
