import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file for styling
const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`/api/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    try {
      await axios.post(`/api/add`, { task: newTodo });
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/delete/${id}`);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const startEditingTodo = (id, task) => {
    setEditingTodo(id);
    setEditedTask(task);
  };

  const saveEditedTodo = async () => {
    try {
      await axios.put(`/api/edit/${editingTodo}`, { task: editedTask });
      setEditingTodo(null);
      setEditedTask('');
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <h1>Welcome to actual  MERN Todo App from CICD</h1>
      <div className="input-container">
        <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <></>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id}>
            {editingTodo === todo._id ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button onClick={() => saveEditedTodo()}>Save</button>
              </>
            ) : (
              <>
                {todo.task}
                <div>
                  <button onClick={() => startEditingTodo(todo._id, todo.task)}>Edit</button>
                  <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
