import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList, Footer} from './components/todo/index'
import {generateId, addTodo, findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './lib/todoHelpers';
import {pipe, partial} from './lib/utils';
import {loadTodos, createTodo, saveTodo, deleteTodo} from './lib/todoService';

class App extends Component {
  state = {
    todos: [],
    currentTodo: ''
  }

  static contextTypes = {
    route: React.PropTypes.string
  }

  componentDidMount() {
    loadTodos()
    .then(todos => this.setState({todos}))
  }

  handleRemove = (id, evt) => {
    evt.preventDefault();
    const updateTodos = removeTodo(this.state.todos, id);
    this.setState({todos: updateTodos})
    deleteTodo(id).then(() => this.showTempMessage('Todo Updated'))
  }

  handleToggle = (id) => {
    // const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos))
    // const updateTodos = getUpdatedTodos(this.state.todos, id)
    // this.setState({todos: updateTodos});

    const getToggledTodo = pipe(findById, toggleTodo)
    const updated = getToggledTodo(this.state.todos, id)
    const getUpdatedTodos = partial(updateTodo, this.state.todos)
    const updatedTodos = getUpdatedTodos(updated)
    this.setState({todos: updatedTodos})
    saveTodo(updated)
      .then(() => this.showTempMessage('Todo Updated'))
  }

  inputHandler = (evt) => {
    this.setState({
      currentTodo: evt.target.value,
      errorMessage: ''
    });
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const newId = generateId();
    const newTodo = { id: newId, name: this.state.currentTodo, isDone: false};
    const updatedTodo = addTodo(this.state.todos, newTodo);
    this.setState({
      todos: updatedTodo,
      currentTodo: ''
    });
    createTodo(newTodo).then(() => alert("Created"))
  }

  handleEmptySubmit = (evt) => {
    evt.preventDefault();
    this.setState({
      errorMessage: "Please enter something to todo desc."
    });
  }

  showTempMessage = (msg) => {
    this.setState({message: msg})
    setTimeout(() => this.setState({message: ''}), 2500)
  }

  render() {
    const submitHandler = this.state.currentTodo? this.handleSubmit : this.handleEmptySubmit;
    const filteredTodos = filterTodos(this.state.todos, this.context.route)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Todo application</h2>
        </div>
        <div className="todo-app">
          {this.state.errorMessage && <span className='error'>{this.state.errorMessage}</span>}
          {this.state.message && <span className='success'>{this.state.message}</span>}
          <TodoForm
            inputHandler={this.inputHandler}
            currentTodo={this.state.currentTodo}
            handleSubmit={submitHandler} />
          <TodoList
            todos={filteredTodos}
            handleToggle={this.handleToggle}
            handleRemove={this.handleRemove}/>
          <Footer />
        </div>
      </div>
    )
  }
}

export default App;
