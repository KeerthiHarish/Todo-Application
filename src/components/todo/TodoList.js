import React from 'react';
import {TodoItem} from  './TodoItem';

export const TodoList = (props) => {
  return (
    <div className="todo-list">
      <ul>
        {props.todos.map(todo =>
          <TodoItem {...todo} key={todo.id} handleToggle={props.handleToggle} handleRemove={props.handleRemove}/>
        )}
      </ul>
    </div>
  )
}

TodoList.proptypes = {
  todos: React.PropTypes.array.isRequired
}
