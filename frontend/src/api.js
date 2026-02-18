import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000" // your Flask API
});

// GET all tasks
export const getTasks = async () => {
  const res = await API.get("/tasks");
  return res.data;
};

// POST create task
export const createTask = async (task) => {
  const res = await API.post("/tasks", task);
  return res.data;
};

// PUT update task
export const updateTask = async (id, task) => {
  const res = await API.put(`/tasks/${id}`, task);
  return res.data;
};

// DELETE task
export const deleteTask = async (id) => {
  const res = await API.delete(`/tasks/${id}`);
  return res.data;
};
