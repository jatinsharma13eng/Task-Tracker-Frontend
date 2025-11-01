import TaskCard from './TaskCard';
import '../styles/TaskList.css';

function TaskList({ tasks, onDelete, onUpdate, emptyMessage = 'No tasks found' }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default TaskList;
