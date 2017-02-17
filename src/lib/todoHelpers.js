export const addTodo = (list, item) => [...list, item];

export const generateId = () =>  Math.floor(Math.random() * 100000);

export const findById = (list, id) => list.find(item => item.id === id);

export const toggleTodo = (todo) => ({...todo, isDone: !todo.isDone});

export const updateTodo = (list, updateTodo) => {
  const updatedIndex = list.findIndex(item => item.id === updateTodo.id)
  return [
    ...list.slice(0, updatedIndex),
    updateTodo,
    ...list.slice(updatedIndex+1)
  ]
}

export const removeTodo = (list, id) => {
  const removeIndex = list.findIndex(item => item.id === id)
  return [
    ...list.slice(0, removeIndex),
    ...list.slice(removeIndex+1)
  ]
}

export const filterTodos = (list, route) => {
  if(route === '/') {
    return list
  } else if(route === '/active') {
    return list.filter((item) => !item.isDone)
  } else {
    return list.filter((item) => item.isDone)
  }
}
