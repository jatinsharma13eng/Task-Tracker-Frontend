import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskService } from '../services/api';
import '../styles/TaskCard.css';

function TaskCard({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const navigate = useNavigate();

  const handleStatusToggle = async () => {
    try {
      const updatedTask = {
        ...task,
        status: task.status === 'pending' ? 'completed' : 'pending',
      };
      await taskService.updateTask(task.id, updatedTask);
      onUpdate(updatedTask);
    } catch (error) {
      console.error('Error updating task status:', error);
      alert('Failed to update task status');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(task.id);
        onDelete(task.id);
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task');
      }
    }
  };

  const handleSave = async () => {
    try {
      await taskService.updateTask(task.id, editedTask);
      onUpdate(editedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isEditing) {
    return (
      <div className="task-card editing">
        <input
          type="text"
          value={editedTask.title}
          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          className="edit-input"
          placeholder="Task title"
        />
        <textarea
          value={editedTask.description}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          className="edit-textarea"
          placeholder="Task description"
        />
        <input
          type="date"
          value={editedTask.dueDate}
          onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
          className="edit-input"
        />
        <div className="edit-actions">
          <button onClick={handleSave} className="btn-save">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-card ${task.status}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`task-status-badge ${task.status}`}>
          {task.status}
        </span>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-footer">
        <div className="task-date">
          <span className="date-label">Due:</span>
          <span className="date-value">{formatDate(task.dueDate)}</span>
        </div>
        <div className="task-actions">
          <button
            onClick={handleStatusToggle}
            className="btn-toggle"
            title={task.status === 'pending' ? 'Mark as completed' : 'Mark as pending'}
          >
            {task.status === 'pending' ? '✓' : '↻'}
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="btn-edit"
            title="Edit task"
          >
            ✎
          </button>
          <button
            onClick={handleDelete}
            className="btn-delete"
            title="Delete task"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
