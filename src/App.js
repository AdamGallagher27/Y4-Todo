import React, { useEffect, useState } from 'react'
import { Button, Container, ListGroup, ListGroupItem, Form, Row, Col } from 'react-bootstrap'

const authToken = process.env.REACT_APP_API_KEY

const updateTodo = async (todo) => {
  try {
    const response = await fetch(`/api/collections/Todos-349528/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(todo)
    })

    const responseData = await response.json()
    return responseData.body
  }
  catch (error) {
    console.error('Error updating Todo', error)
  }
}


const getAllTodos = async () => {
  try {
    const response = await fetch('/api/collections/Todos-349528', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
    })

    const responseData = await response.json()
    return responseData.body
  }
  catch (error) {
    console.error('Error getting Todos', error)
  }
}

const createNewTodo = async (todo) => {
  try {
    const response = await fetch('/api/collections/Todos-349528', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(todo)
    })

    const responseData = await response.json()
    return responseData.body
  }
  catch (error) {
    console.error('Error creating Todo', error)
  }
}


const deleteTodo = async (id) => {

  try {
    const response = await fetch(`/api/collections/Todos-349528/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
    })

    const responseData = await response.json()
    return responseData.body
  }
  catch (error) {
    console.error('Error getting Todos', error)
  }
}

const App = () => {

  const [todo, setTodo] = useState({ id: '', body: '', isDone: false })
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const handleGetTodos = async () => {
      const response = await getAllTodos()

      if (response && response.length > 0) {
        setTodos(response)
      }
    }

    handleGetTodos()
  }, [])


  const handleInputChange = (e) => {
    setTodo({ body: e.target.value, isDone: false })
  }

  const handleAddTodo = () => {
    createNewTodo(todo)
    setTodos([...todos, todo])
    setTodo({ body: '', isDone: false })
  }

  const handleToggleDone = (index) => {
    const updatedTodos = todos.map((todo, i) => {

      if (i === index) {
        const updatedTodo = { ...todo, isDone: !todo.isDone }
        updateTodo(updatedTodo)
        return updatedTodo
      }

      else {
        return todo
      }
    }
    )
    setTodos(updatedTodos)
  }

  const handleDelete = (index, id) => {
    const updatedTodos = todos.filter((_, i) => i !== index)
    setTodos(updatedTodos)
    deleteTodo(id)
  }

  return (
    <Container className='mt-5'>
      <h1 className='text-center mb-4'>Todos App</h1>

      <Row className='mb-3'>
        <Col>
          <Form.Control
            type='text'
            placeholder='Enter your todo here...'
            value={todo.body}
            onChange={handleInputChange}
          />
        </Col>
        <Col>
          {todo.body && <Button variant='primary' onClick={handleAddTodo} className='w-100'>
            Add Todo
          </Button>}
        </Col>
      </Row>
      <ListGroup>
        {todos.map((todo, index) => (
          <ListGroupItem key={todo.id} className='d-flex justify-content-between align-items-center'>
            <Form.Check
              type='checkbox'
              checked={todo.isDone}
              onChange={() => handleToggleDone(index)}
              label={todo.body}
              style={{ textDecoration: todo.isDone ? 'line-through' : 'none' }}
            />
            <Button
              variant='danger'
              size='sm'
              onClick={() => handleDelete(index, todo.id)}
              className='ml-2'
            >
              Delete
            </Button>

          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  )
}

export default App
