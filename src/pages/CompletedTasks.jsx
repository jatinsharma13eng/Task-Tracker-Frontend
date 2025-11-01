import { useState, useEffect } from 'react';
import { taskService } from '../services/api';
import TaskList from '../components/TaskList';
import '../styles/Pages.css';

function CompletedTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchCompletedTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getAllTasks();
      const completedTasks = response.data.filter((task) => task.status === 'completed');
      setTasks(completedTasks);
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
      alert('Failed to fetch completed tasks. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleUpdate = (updatedTask) => {
    if (updatedTask.status === 'completed') {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    } else {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== updatedTask.id));
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Completed Tasks</h1>
        <p className="page-subtitle">View all your completed tasks</p>
      </div>

      {loading ? (
        <div className="loading">Loading completed tasks...</div>
      ) : (
        <>
          <div className="completed-count">
            <span className="count-badge">{tasks.length}</span>
            <span className="count-label">Tasks Completed</span>
          </div>
          <TaskList
            tasks={tasks}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            emptyMessage="No completed tasks yet. Start completing some tasks!"
          />
        </>
      )}
    </div>
  );
}

export default CompletedTasks;
