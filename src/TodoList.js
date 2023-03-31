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

// In your TodoList component
useEffect(() => {
  // Fetch todos
  fetch("http://localhost:9292/todos")
    .then((response) => response.json())
    .then((data) => setTodos(data));

  // Fetch categories
  fetch("http://localhost:9292/categories")
    .then((response) => response.json())
    .then((data) =>
      setCategories(
        data.map((category) => ({
          key: category.id,
          value: category.name,
          text: category.name,
        }))
      )
    );
}, []);



/* Here is the explanation for the code below:
1. The addTodo function is called when the user clicks the Add Todo button.
2. The newTodo and selectedCategory are used to create a new todo.
3. The new todo is sent to the server using the fetch API.
4. The new todo is added to the todos array.
5. The newTodo and selectedCategory states are reset to empty strings. */
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

  /* The code below does the following:
1. It takes in a todo's id (which is the number in the URL) and the new title for that todo.
2. It makes a PUT fetch request to the backend to update the todo with that id.
3. It updates the todo in state with the data from the response.

This is how we update a todo's title and category. */
const updateTodo = (id, newTitle, category) => {
  fetch(`http://localhost:9292/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle, category }),
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
  /* Here is the explanation for the code above:
1. We use the fetch method to make a DELETE request to the server, and pass the id of the todo we want to delete as a parameter.
2. We then use the filter method to remove the todo with the corresponding id from the todos array, and update the state using the setTodos method.
3. We also need to add a button to the Todo component so we can call the deleteTodo function when we click on it. */


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
                  onChange={(event, data) => setSelectedCategory(data.value)}

                />
               <Button
  primary
  onClick={() => updateTodo(todo.id, editingTitle, selectedCategory)}
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
  value={selectedCategory}
  onChange={(event, data) => setSelectedCategory(data.value)}
/>


          <Button positive onClick={addTodo} disabled={!newTodo || !selectedCategory}>
  Add
</Button>

        </List.Item>
      </List>
    </div>
  );
}

export default TodoList;
