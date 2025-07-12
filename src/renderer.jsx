import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

const TaskTimeTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.running ? { ...task, time: task.time + 1 } : task
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        name: newTask.trim(),
        time: 0,
        running: false,
      },
    ]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, running: !task.running } : task
      )
    );
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        padding: 20,
        maxWidth: 400,
        margin: "0 auto",
      }}
    >
      <h2>Task Time Tracker</h2>
      <div style={{ marginBottom: 10 }}>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task name"
          style={{ padding: 6, width: "70%" }}
        />
        <button
          onClick={addTask}
          style={{ padding: "6px 10px", marginLeft: 8 }}
        >
          Add
        </button>
      </div>
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
            borderBottom: "1px solid #ccc",
          }}
        >
          <div>
            <strong>{task.name}</strong>
            <div style={{ fontSize: 12, color: "#666" }}>
              {formatTime(task.time)}
            </div>
          </div>
          <button onClick={() => toggleTask(task.id)}>
            {task.running ? "Stop" : "Start"}
          </button>
        </div>
      ))}
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<TaskTimeTracker />);
