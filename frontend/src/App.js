import React, { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState("medium");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async () => {
    if (!newTitle) return;
    await createTask({ title: newTitle, priority: newPriority });
    setNewTitle("");
    setNewPriority("medium");
    fetchTasks();
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setNewTitle(task.title);
    setNewPriority(task.priority);
  };

  const handleUpdate = async () => {
    if (!editingTask) return;
    const updated = { title: newTitle, priority: newPriority };
    await updateTask(editingTask.id, updated);
    setEditingTask(null);
    setNewTitle("");
    setNewPriority("medium");
    fetchTasks();
  };

const handleDelete = async (id) => {
  try {
    await deleteTask(id);
  } catch (err) {
    // Ignore if task already deleted
    if (err.response?.status !== 404) {
      console.error(err);
    }
  }
  fetchTasks();
};


  const toggleStatus = async (task) => {
    const updated = { ...task, status: task.status === "pending" ? "completed" : "pending" };
    await updateTask(task.id, updated);
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>Smart Task Manager</h1>

      <div className="add-task">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New task title"
        />
        <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={editingTask ? handleUpdate : handleAdd}>
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task ${task.status}`}>
            <span className="task-title" onClick={() => toggleStatus(task)}>
              {task.title} - <span className={`badge ${task.priority}`}>{task.priority}</span> - {task.status}
            </span>
            <button className="edit" onClick={() => startEditing(task)}>Edit</button>

            <button onClick={() => handleDelete(task.id)}disabled={task.deleting}> Delete</button>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
