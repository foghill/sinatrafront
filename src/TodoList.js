import React, { useState, useEffect } from 'react';
import { Button, Header, Input, List } from 'semantic-ui-react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetch('http://localhost:9292/todos')
      .then(response => response.json())
      .then(data => setTodos(data))
  }, []);

  const addTodo = () => {
    fetch('http://localhost:9292/todos', {
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
    fetch(`http://localhost:9292/todos/${id}`, {
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
    fetch(`http://localhost:9292/todos/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        const filteredTodos = todos.filter(todo => todo.id !== id);
        setTodos(filteredTodos);
      });
  };

  return (
    <div>
      <Header as="h1">Todo List</Header>
      <List>
        {todos.map(todo => (
          <List.Item key={todo.id}>
            <Input
              type="text"
              value={todo.title}
              onChange={event => updateTodo(todo.id, event.target.value)}
            />
            <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
          </List.Item>
        ))}
        <List.Item>
          <Input
            type="text"
            value={newTodo}
            onChange={event => setNewTodo(event.target.value)}
          />
          <Button onClick={addTodo}>Add</Button>
        </List.Item>
      </List>
    </div>
  );
}

export default TodoList;
