import {addTodo, findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './todoHelpers';

test('addTodo should add the passed todo to the list', () => {
  const startTodos = [
    {id:1, name: 'one', isDone: false},
    {id:2, name: 'two', isDone: false}
  ]
  const newTodo = {id:3, name: 'three', isDone: false}
  const expected = [
    {id:1, name: 'one', isDone: false},
    {id:2, name: 'two', isDone: false},
    {id:3, name: 'three', isDone: false}
  ]

  const result = addTodo(startTodos, newTodo)

  expect(result).toEqual(expected)
})

test('addTodo should not mutate the existing todo array', () => {
  const startTodos = [
    {id:1, name: 'one', isDone: false},
    {id:2, name: 'two', isDone: false}
  ]
  const newTodo = {id:3, name: 'three', isDone: false}
  const expected = [
    {id:1, name: 'one', isDone: false},
    {id:2, name: 'two', isDone: false},
    {id:3, name: 'three', isDone: false}
  ]

  const result = addTodo(startTodos, newTodo)

  expect(result).not.toBe(startTodos)

})

test('findById should return the expected item from an array', () => {
  const startTodos = [
    {id:1, name: 'one', isDone: false},
    {id:2, name: 'two', isDone: false},
    {id:3, name: 'three', isDone: false}
  ]
  const expected = {id:2, name: 'two', isDone: false}
  const result = findById(startTodos, 2)
  expect(result).toEqual(expected)
})

test('toggleTodo should toggle the isDone prop of a todo', () => {
  const startTodo = {id:2, name: 'two', isDone: false}
  const expected = {id:2, name: 'two', isDone: true}
  const result = toggleTodo(startTodo)
  expect(result).toEqual(expected)
})

test('toggleTodo should not mutate the original todo', () => {
  const startTodo = {id:2, name: 'two', isDone: false}
  const result = toggleTodo(startTodo)
  expect(result).not.toBe(startTodo)
})

test('updateTodo should update an item by id', () => {
  const startTodos = [
    {id:1, name: 'one', isDone: false},
    {id:2, name: 'two', isDone: false},
    {id:3, name: 'three', isDone: false}
  ]
  const updatedTodo = {id:2, name: 'two', isDone: true}
  const expectedTodos = [
    {id:1, name: 'one', isDone: false},
    {id:2, name: 'two', isDone: true},
    {id:3, name: 'three', isDone: false}
  ]

  const result = updateTodo(startTodos, updatedTodo)

  expect(result).toEqual(expectedTodos)
})

test('updateTodo should not mutate the original array', () => {
  const startTodos = [
    {id:1, name: 'one', isDone: false},
    {id:2, name: 'two', isDone: false},
    {id:3, name: 'three', isDone: false}
  ]
  const updatedTodo = {id:2, name: 'two', isDone: true}

  const result = updateTodo(startTodos, updatedTodo)

  expect(result).not.toBe(startTodos)
})

test('removeTodo should remove an item by id', () => {
  const startTodos = [
    {id:1, name: 'one', isDone: false},
    {id:2, name: 'two', isDone: false},
    {id:3, name: 'three', isDone: false}
  ]
  const targetId = 2
  const expectedTodos = [
    {id:1, name: 'one', isDone: false},
    {id:3, name: 'three', isDone: false}
  ]
  const result = removeTodo(startTodos, targetId)

  expect(result).toEqual(expectedTodos)
})

test('removeTodo should not mutate the original array', () => {
  const startTodos = [
    {id:1, name: 'one', isDone: false},
    {id:2, name: 'two', isDone: false},
    {id:3, name: 'three', isDone: false}
  ]
  const targetId = 2
  const result = removeTodo(startTodos, targetId)

  expect(result).not.toBe(startTodos)
})

test('filterTodos should return all items for the root route', () => {
  const startTodos = [
    {id:1, name: 'one', isDone: false},
    {id:2, name: 'two', isDone: true},
    {id:3, name: 'three', isDone: false}
  ]

  const result = filterTodos(startTodos, '/')

  expect(result).toEqual(startTodos)
})

test('filterTodos should return only completed items for the complete route', () => {
  const startTodos = [
    {id:1, name: 'one', isDone: false},
    {id:2, name: 'two', isDone: true},
    {id:3, name: 'three', isDone: false}
  ]
  const expected = [
    {id:2, name: 'two', isDone: true}
  ]

  const result = filterTodos(startTodos, '/complete')

  expect(result).toEqual(expected)
})

test('filterTodos should return only incompleted items for the active route', () => {
  const startTodos = [
    {id:1, name: 'one', isDone: false},
    {id:2, name: 'two', isDone: true},
    {id:3, name: 'three', isDone: false}
  ]
  const expected = [
    {id:1, name: 'one', isDone: false},
    {id:3, name: 'three', isDone: false}
  ]

  const result = filterTodos(startTodos, '/active')

  expect(result).toEqual(expected)
})
