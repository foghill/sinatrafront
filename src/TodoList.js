import React, { useState, useEffect } from 'react';
import { Button, Container, Header, Input, List, Segment } from 'semantic-ui-react';

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
      .then(response => response.json())
      .then(data => {
        const filteredTodos = todos.filter(todo => todo.id !== data.id);
        setTodos(filteredTodos);
      });
  };

  return (
    <Container style={{ marginTop: '2rem' }}>
      <Segment style={{ border: '2px solid #2185d0' }}>
        <Header as="h1" textAlign="center">Todo List</Header>
        <List divided relaxed>
          {todos.map(todo => (
            <List.Item key={todo.id}>
              <Input
                fluid
                value={todo.title}
                onChange={event => updateTodo(todo.id, event.target.value)}
              />
              <Button icon="edit" onClick={() => updateTodoForm(todo.id, todo.title)} />
              <Button icon="delete" onClick={() => deleteTodo(todo.id)} />
            </List.Item>
          ))}
          <List.Item>
            <Input
              fluid
              placeholder="Enter new todo"
              value={newTodo}
              onChange={event => setNewTodo(event.target.value)}
            />
            <Button icon="add" onClick={addTodo} />
          </List.Item>
        </List>
      </Segment>
    </Container>
  );
}

export default TodoList;
