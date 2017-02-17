import React from 'react';
import {partial} from './../../lib/utils'

export const TodoItem = (props) => {
  const getToggleId = partial(props.handleToggle, props.id)
  const getRemoveId = props.handleRemove.bind(null, props.id)
  return (
    <li key={props.id}>
      <span className="delete-item"><a href="#" onClick={getRemoveId}>X</a></span>
      <input type="checkbox" onChange={getToggleId} checked={props.isDone}/>{props.name}
    </li>
  )
}

TodoItem.proptypes = {
  name: React.PropTypes.string.isRequired,
  isDone: React.PropTypes.bool,
  id: React.PropTypes.number.isRequired
}
