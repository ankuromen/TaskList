import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Home = () => {
  let navigate = useNavigate();

  let handlelogout = () => {
    localStorage.clear('token');
    navigate('/');
  };

  let [tasks, setTasks] = useState([]);
  let [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  let fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5055/api/tasks');
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  let handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newTask.trim() === '') {
      return;
    }

    try {

      await fetch('http://localhost:5055/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newTask }),
      });

      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    }

    setNewTask('');
  };

  let handleEdit = async (taskId, content) => {
    try {

      await fetch(`http://localhost:5055/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      fetchTasks();
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  let handleToggleEdit = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, editing: !task.editing } : task
      )
    );
  };

  let handleDelete = async (taskId) => {
    try {

      await fetch(`http://localhost:5055/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <>
      <nav>
        <nav className="navbar">
          <div className="container">
            <div className="logo">
              TASK LIST
            </div>
            <div className="nav-elements">
              <button id="logout-btn" onClick={handlelogout}>Logout</button>
            </div>
          </div>
        </nav>
      </nav>
      <h1 id="heading-top"> Task List</h1>

      <div className='content'>
        <form onSubmit={handleSubmit}>
          <input id='input-add' placeholder="   What's On your Mind?" type="text" value={newTask} onChange={handleInputChange} maxLength={60} />
          <button type="submit" id="submit-btn">Add Task</button>
        </form>
        <h2 id='heading-top'>Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task._id} id='task-list'>
              {task.editing ? (
                <>
                  <input maxLength={60} className='inpt-task' type="text" value={task.content} onChange={(e) => setTasks((prevTasks) =>
                    prevTasks.map((prevTask) =>
                      prevTask._id === task._id
                        ? { ...prevTask, content: e.target.value }
                        : prevTask
                    )
                  )}
                  />
                  <button className='btns' id='Save-btn' onClick={() => handleEdit(task._id, task.content)}>Save</button>
                </>
              ) : (
                <>
                  <div className='text-content'>
                    {task.content}
                  </div>
                  <div className='btns-content'>
                    <button className='btns' onClick={() => handleToggleEdit(task._id)}>Edit</button>
                    <button className='del-btns' onClick={() => handleDelete(task._id)}>Delete</button>
                  </div>

                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
