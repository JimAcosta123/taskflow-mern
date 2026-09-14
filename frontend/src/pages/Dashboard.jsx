import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProjectList from '../components/ProjectList';
import TaskCard from '../components/TaskCard';

const nextStatus = {
  pendiente: 'en_progreso',
  en_progreso: 'completada',
  completada: 'pendiente',
};

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [newProjectName, setNewProjectName] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const loadProjects = async () => {
    const { data } = await api.get('/projects');
    setProjects(data);
    if (!selectedProject && data.length > 0) setSelectedProject(data[0]._id);
  };

  const loadTasks = async (projectId) => {
    if (!projectId) return setTasks([]);
    const { data } = await api.get(`/tasks?project=${projectId}`);
    setTasks(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    loadTasks(selectedProject);
  }, [selectedProject]);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    const { data } = await api.post('/projects', { name: newProjectName });
    setNewProjectName('');
    setProjects((prev) => [data, ...prev]);
    setSelectedProject(data._id);
  };

  const handleDeleteProject = async (id) => {
    await api.delete(`/projects/${id}`);
    setProjects((prev) => prev.filter((p) => p._id !== id));
    if (selectedProject === id) setSelectedProject(null);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !selectedProject) return;
    const { data } = await api.post('/tasks', { title: newTaskTitle, project: selectedProject });
    setNewTaskTitle('');
    setTasks((prev) => [data, ...prev]);
  };

  const handleToggleStatus = async (task) => {
    const { data } = await api.put(`/tasks/${task._id}`, { status: nextStatus[task.status] });
    setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
  };

  const handleDeleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="dashboard">
      <aside>
        <h3>Proyectos</h3>
        <form onSubmit={handleCreateProject}>
          <input
            placeholder="Nuevo proyecto"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <button type="submit">+</button>
        </form>
        <ProjectList
          projects={projects}
          selectedId={selectedProject}
          onSelect={setSelectedProject}
          onDelete={handleDeleteProject}
        />
      </aside>

      <main>
        <h3>Tareas</h3>
        {selectedProject ? (
          <>
            <form onSubmit={handleCreateTask}>
              <input
                placeholder="Nueva tarea"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
              <button type="submit">Agregar tarea</button>
            </form>
            <div className="task-grid">
              {tasks.map((t) => (
                <TaskCard key={t._id} task={t} onToggleStatus={handleToggleStatus} onDelete={handleDeleteTask} />
              ))}
              {tasks.length === 0 && <p className="muted">No hay tareas en este proyecto.</p>}
            </div>
          </>
        ) : (
          <p className="muted">Selecciona o crea un proyecto para ver sus tareas.</p>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
