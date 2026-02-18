import React, { useState } from "react";
import API from "../api";


const TaskForm = ({ onSuccess }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/tasks", { title });
    setTitle("");
    onSuccess(); // refresh task list
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Task title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
