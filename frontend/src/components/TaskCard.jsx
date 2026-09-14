const statusLabels = {
  pendiente: 'Pendiente',
  en_progreso: 'En progreso',
  completada: 'Completada',
};

const TaskCard = ({ task, onToggleStatus, onDelete }) => {
  return (
    <div className={`task-card priority-${task.priority}`}>
      <div>
        <h4>{task.title}</h4>
        {task.description && <p>{task.description}</p>}
        <span className={`badge status-${task.status}`}>{statusLabels[task.status]}</span>
      </div>
      <div className="task-actions">
        <button onClick={() => onToggleStatus(task)}>Avanzar estado</button>
        <button className="link-danger" onClick={() => onDelete(task._id)}>Eliminar</button>
      </div>
    </div>
  );
};

export default TaskCard;
