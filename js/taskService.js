import { getProjects, getTasks, saveTasks } from "./storage.js";
import { generateId, sanitizeInput, sortByDateDesc } from "./utils/helpers.js";
import { validateTask } from "./utils/validators.js";

export function getAllTasks() {
  return sortByDateDesc(getTasks());
}

export function createTask(payload) {
  const validation = validateTask(payload);
  if (!validation.isValid) {
    throw new Error(validation.message);
  }

  const tasks = getTasks();
  const task = {
    id: generateId("TSK", tasks.length + 201),
    projectId: payload.projectId,
    title: sanitizeInput(payload.title),
    status: payload.status,
    priority: payload.priority,
    createdAt: new Date().toISOString()
  };

  tasks.push(task);
  saveTasks(tasks);
  return task;
}

export function updateTask(taskId, payload) {
  const validation = validateTask(payload);
  if (!validation.isValid) {
    throw new Error(validation.message);
  }

  const tasks = getTasks().map((task) => {
    if (task.id !== taskId) {
      return task;
    }

    return {
      ...task,
      projectId: payload.projectId,
      title: sanitizeInput(payload.title),
      status: payload.status,
      priority: payload.priority
    };
  });

  saveTasks(tasks);
}

export function deleteTask(taskId) {
  saveTasks(getTasks().filter((task) => task.id !== taskId));
}

export function filterTasks({ projectId, status, priority, search }) {
  const projectLookup = new Map(getProjects().map((project) => [project.id, project.name]));

  return getAllTasks().filter((task) => {
    const matchesProject = projectId === "all" || task.projectId === projectId;
    const matchesStatus = status === "all" || task.status === status;
    const matchesPriority = priority === "all" || task.priority === priority;
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || task.title.toLowerCase().includes(query) || (projectLookup.get(task.projectId) || "").toLowerCase().includes(query);
    return matchesProject && matchesStatus && matchesPriority && matchesSearch;
  });
}
