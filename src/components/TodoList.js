// TodoList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    // Fetching todos from the API
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = () => {
    // Dummy POST request to add a new todo
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: newTodo,
      completed: false,
    })
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.error('Error adding todo:', error));
  };

  const updateTodo = (id, updatedTitle) => {
    // Dummy PUT request to update a todo
    axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      title: updatedTitle,
    })
      .then(response => {
        const updatedTodos = todos.map(todo =>
          todo.id === id ? { ...todo, title: updatedTitle } : todo
        );
        setTodos(updatedTodos);
      })
      .catch(error => console.error('Error updating todo:', error));
  };

  const deleteTodo = (id) => {
    // Dummy DELETE request to delete a todo
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(() => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
      })
      .catch(error => console.error('Error deleting todo:', error));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => updateTodo(todo.id, prompt('Update todo:', todo.title))}>
              Update
            </button>
            <button onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
    </div>
  );
};

export default TodoList;
