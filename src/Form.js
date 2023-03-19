import React from 'react'

const Form = ({input,setInput,todos,setTodos}) => {


    const onInputChange = (e) => {
        setInput(e.target.value)
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        setTodos([
            ...todos,
            {text: input, completed: false, id: Math.random() * 1000}
        ])
        setInput('')
    }
    
  return (
    <form onSubmit={onFormSubmit}>
        <input 
        type="text" 
        placeholder="Add Todo"
        className='task-input'
        value={input}
        required
        onChange={onInputChange} />
        <button type="submit">Add Todo</button>
    </form>
  )
}

export default Form