import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (task) => {
    await createTask(task);
    fetchTasks();
  };

  const handleUpdate = async (task) => {
    await updateTask(editingTask.id, task);
    setEditingTask(null);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div>
      <h2>{editingTask ? "Update Task" : "Create Task"}</h2>
      <TaskForm
        onSubmit={editingTask ? handleUpdate : handleCreate}
        task={editingTask}
      />

      <h2>All Tasks</h2>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={handleDelete}
          onUpdate={setEditingTask}
        />
      ))}
    </div>
  );
}
