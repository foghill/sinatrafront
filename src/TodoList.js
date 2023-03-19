import React, { useState, useEffect } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetch("http://localhost:9292/todos")
      .then(response => response.json())
      .then(data => setTodos(data))
  }, []);

  const addTodo = () => {
    fetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo })
    })
      .then(response => response.json())
      .then(data => {
        setTodos([...todos, data]);
        setNewTodo('');
      });
  };

  const updateTodo = (id, newTitle) => {
    fetch(`/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle })
    })
      .then(response => response.json())
      .then(data => {
        const updatedTodos = todos.map(todo => {
          if (todo.id === id) {
            return data;
          } else {
            return todo;
          }
        });
        setTodos(updatedTodos);
      });
  };

  const deleteTodo = id => {
    fetch(`/todos/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        const filteredTodos = todos.filter(todo => todo.id !== data.id);
        setTodos(filteredTodos);
      });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="text"
              value={todo.title}
              onChange={event => updateTodo(todo.id, event.target.value)}
            />
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
        <li>
          <input
            type="text"
            value={newTodo}
            onChange={event => setNewTodo(event.target.value)}
          />
          <button onClick={addTodo}>Add</button>
        </li>
      </ul>
    </div>
  );
}

export default TodoList;
