import React from 'react';

export const TodoForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <input
      type="text"
      onChange={props.inputHandler}
      value={props.currentTodo}
    />
  </form>
)


TodoForm.proptypes = {
  currentTodo: React.PropTypes.string.isRequired,
  inputHandler: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
}
