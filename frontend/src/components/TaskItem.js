
export default function TaskItem({ task, onDelete, onUpdate }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: 5, padding: 5 }}>
      <h3>{task.title}</h3>
      <p>{task.description || "No description"}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <button onClick={() => onUpdate(task)}>Update</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}
