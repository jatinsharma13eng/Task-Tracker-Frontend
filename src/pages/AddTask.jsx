import TaskForm from '../components/TaskForm';
import '../styles/Pages.css';

function AddTask() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Add New Task</h1>
        <p className="page-subtitle">Create a new task to track</p>
      </div>
      <div className="form-container">
        <TaskForm />
      </div>
    </div>
  );
}

export default AddTask;
