import React, { useState, useEffect } from "react";
import { Button, Header, Input, List, Dropdown } from "semantic-ui-react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([
    { key: 1, value: "Work", text: "Work" },
    { key: 2, value: "Personal", text: "Personal" },
    { key: 3, value: "Shopping", text: "Shopping" },
    { key: 4, value: "Health", text: "Health" },
    { key: 5, value: "Travel", text: "Travel" },
  ]);

  useEffect(() => {
    fetch("http://localhost:9292/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = () => {
    fetch("http://localhost:9292/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodo, category: selectedCategory }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([...todos, data]);
        setNewTodo("");
        setSelectedCategory("");
      });
  };

  const updateTodo = (id, newTitle) => {
    fetch(`http://localhost:9292/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, category: selectedCategory }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === id) {
            return data;
          } else {
            return todo;
          }
        });
        setTodos(updatedTodos);
        setEditingId(null);
        setEditingTitle("");
        setSelectedCategory("");
      });
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:9292/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredTodos = todos.filter((todo) => todo.id !== data.id);
        setTodos(filteredTodos);
      });
  };

  const editTodo = (id, title) => {
    setEditingId(id);
    setEditingTitle(title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: 600,
        border: "1px solid grey",
        padding: "20px",
      }}
    >
      <Header as="h1">Todo List</Header>
      <List>
        {todos.map((todo) => (
          <List.Item key={todo.id}>
            {editingId === todo.id ? (
              <>
                <Input
                  type="text"
                  value={editingTitle}
                  onChange={(event) => setEditingTitle(event.target.value)}
                />
                <Dropdown
                  placeholder="Select category"
                  selection
                  options={categories}
                  name={selectedCategory}
                  onChange={(event, data) => setSelectedCategory(data.name)}
                />
                <Button
                  primary
                  onClick={() => updateTodo(todo.id, editingTitle)}
                >
                  Save
                </Button>
                <Button onClick={cancelEdit}>Cancel</Button>
              </>
            ) : (
              <>
                <Input
                  type="text"
                  value={todo.title}
                  onChange={() => {}}
                  disabled
                />
                <Button primary onClick={() => editTodo(todo.id, todo.title)}>
                  Edit
                </Button>
                <Button negative onClick={() => deleteTodo(todo.id)}>
                  Delete
                </Button>
              </>
            )}
          </List.Item>
        ))}
        <List.Item>
          <Input
            type="text"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            placeholder="Enter new task"
          />
          <Dropdown
            placeholder="Select category"
            selection
            options={categories}
            name={selectedCategory}
            onChange={(event, data) => setSelectedCategory(data.name)}
          />
          <Button positive onClick={addTodo} disabled={!newTodo}>
            Add
          </Button>
        </List.Item>
      </List>
    </div>
  );
}

export default TodoList;
