const ProjectList = ({ projects, selectedId, onSelect, onDelete }) => {
  return (
    <ul className="project-list">
      {projects.map((p) => (
        <li key={p._id} className={p._id === selectedId ? 'active' : ''}>
          <span onClick={() => onSelect(p._id)}>{p.name}</span>
          <button className="link-danger" onClick={() => onDelete(p._id)}>x</button>
        </li>
      ))}
      {projects.length === 0 && <li className="muted">Sin proyectos todavia</li>}
    </ul>
  );
};

export default ProjectList;
