import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function TaskList({ tasks, onDelete }) {
  const [sortedTasks, setSortedTasks] = useState(tasks);
  useEffect(() => {
    setSortedTasks(tasks);
  }, [tasks]);
  // Initialize the state for sorted tasks
  const handleDelete = (taskId) => {
    console.log(taskId);
    onDelete(taskId);
  };
  const cattime = "Work";
  const getTimeLeft = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    const daysLeftRound = Math.ceil(diffDays);
    const styleHours = diffDays < 1 ? { color: "red" } : {};
    const styleTomorrow = diffDays < 2 ? { color: "#844E04" } : {};
    const styleOverdue = diffTime < 0 ? { fontWeight: "bold" } : {};

    if (diffTime < 0) {
      return <span style={styleOverdue}>Overdue</span>;
    } else if (diffDays < 1) {
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
      return <span style={styleHours}>{diffHours} hours left</span>;
    } else if (diffDays < 2) {
      return <span style={styleTomorrow}>Tomorrow</span>;
    } else {
      return `${daysLeftRound} days left`;
    }
  };
  const handleSortByTime = () => {
    const sortedByTime = [...sortedTasks].sort((a, b) => {
      const timeA = new Date(a.deadline).getTime();
      const timeB = new Date(b.deadline).getTime();
      return timeA - timeB;
    });
    setSortedTasks(sortedByTime); // Update the state with sorted tasks
  };
  const handleSortByCreated = () => {
    setSortedTasks(tasks); // Update the state with sorted tasks
  };

  const handleSortByPriority = () => {
    const sortedByPriority = [...sortedTasks].sort((a, b) => {
      const priorityA = parseInt(a.priority);
      const priorityB = parseInt(b.priority);
      return priorityA - priorityB;
    });
    setSortedTasks(sortedByPriority); // Update the state with sorted tasks
  };

  const handleFilterByCategory = (category) => {
    if (category === "All") {
      setSortedTasks(tasks);
      return;
    }
    const filteredTasks = tasks.filter((task) => task.category === category);
    setSortedTasks(filteredTasks); // Update the state with filtered tasks
  };

  const handleFilterByTime = (category) => {
    const now = new Date();
    if (category === "Days") {
      const filteredTasks = tasks.filter(
        (task) => (new Date(task.deadline) - now) / (1000 * 60 * 60) > 24
      );
      setSortedTasks(filteredTasks); // Update the state with filtered tasks
    } else if (category === "Hours") {
      const filteredTasks = tasks.filter(
        (task) =>
          (new Date(task.deadline) - now) / (1000 * 60 * 60) < 24 &&
          (new Date(task.deadline) - now) / (1000 * 60 * 60) > 0
      );
      setSortedTasks(filteredTasks); // Update the state with filtered tasks
    } else {
      const filteredTasks = tasks.filter(
        (task) => (new Date(task.deadline) - now) / (1000 * 60 * 60) < 0
      );
      setSortedTasks(filteredTasks);
    }
    return;
  };

  const generateTaskLoadBar = (tasks) => {
    const today = new Date();
    const daysInMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();
    const taskLoad = new Array(daysInMonth).fill(0);

    tasks.forEach((task) => {
      const start = new Date(task.deadline);
      const end = new Date(start.getTime() + task.duration * 60 * 1000);

      for (let day = start.getDate(); day <= end.getDate(); day++) {
        taskLoad[day - 1]++;
      }
    });

    const maxLoad = Math.max(...taskLoad);
    const colors = ["green", "orange", "lightcoral", "red"];
    const bar = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const load = taskLoad[day - 1];
      const color = colors[Math.floor((load / (maxLoad + 1)) * colors.length)];
      bar.push(
        <div style={{ backgroundColor: color, height: "20px", width: "3.2%" }}>
          {day}
        </div>
      );
    }

    return bar;
  };

  const taskLoadBar = generateTaskLoadBar(tasks);

  const changwstyl = (task) => {
    if (!task) {
      return { backgroundColor: "white" };
    }

    const currentDateTime = new Date();
    const deadline = new Date(task.deadline);
    let timeLeft = deadline.getTime() - currentDateTime.getTime();
    const daysDiff = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
    const difHoures = Math.ceil(timeLeft / (1000 * 60 * 60)) - 14 * daysDiff;
    const filterTaskList = tasks.filter(
      (t) => new Date(t.deadline).getTime() <= deadline.getTime()
    );
    let sum = 0;
    for (let index = 0; index < filterTaskList.length; index++) {
      sum += filterTaskList[index].duration;
    }
    if (difHoures < sum) {
      return {
        backgroundColor: "#FFCEC3",
      }; // skip tasks that have later deadlines
    }

    if (sum < difHoures - 2 * (filterTaskList.length + 1)) {
      return { backgroundColor: "#E1FBA0" }; // skip tasks that are already overdue
    }

    return {
      backgroundColor: "#FFDA57",
    };
  };
  const TimeToS = (Tdeadline) => {
    const deadline = new Date(Tdeadline);

    const options = {
      day: "numeric",
      month: "short",
      hour: "numeric",
    };
    const formattedDeadline = deadline.toLocaleString("en-US", options);
    return formattedDeadline;
  };

  return (
    <div className="container">
      <div id="tasks-container">
        <nav class="navbar sticky-top navbar-expand-lg navbar-dark bg-dark ">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              My Tasks
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sort By
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <a class="dropdown-item" onClick={handleSortByTime}>
                        Time Left
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" onClick={handleSortByPriority}>
                        Prayorty
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" onClick={handleSortByCreated}>
                        created
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Filter
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        onClick={() => handleFilterByCategory("Work")}
                      >
                        Work
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        onClick={() => handleFilterByCategory("Family")}
                      >
                        Family
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        onClick={() => handleFilterByCategory("Studies")}
                      >
                        Studies
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        onClick={() => handleFilterByCategory("Arrangements")}
                      >
                        Arrangements
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        onClick={() => handleFilterByCategory("All")}
                      >
                        All
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        onClick={() => handleFilterByTime("Hours")}
                      >
                        Hours left
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        onClick={() => handleFilterByTime("Days")}
                      >
                        Days left
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        onClick={() => handleFilterByTime("")}
                      >
                        No Time Left
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="task-list">
          {sortedTasks.map((task) => (
            <div key={task._id} className="list-group task-item">
              <a
                href="#"
                className="list-group-item list-group-item-action"
                aria-current="true"
                style={changwstyl(task)}
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{task.name}</h5>
                  <small>
                    {getTimeLeft(task.deadline)} - {TimeToS(task.deadline)}
                  </small>
                </div>
                <button
                  className="btn btn-danger btn-sm task-delete-btn"
                  onClick={() => handleDelete(task._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <div className="task-content">
                  <p className="mb-1">{task.category}</p>
                  <small>duration is about {task.duration} hours </small>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskList;
