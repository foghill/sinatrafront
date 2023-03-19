import './App.css';
import './index.css';
import TodoList from './TodoList';
import Header from './Header';
import Form from './Form';
import React, { useState, useEffect } from 'react';


function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');


  return (
    <>
      <Header />
      <Form
        input={input}
        setInput={setInput}
        todos={todos}
        setTodos={setTodos}
      />
    <TodoList todos={todos} setTodos={setTodos} />
    </>
  )
}

export default App;
