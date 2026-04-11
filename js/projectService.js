import { getProjects, getTasks, saveProjects, saveTasks } from "./storage.js";
import { generateId, sanitizeInput, sortByDateDesc } from "./utils/helpers.js";
import { validateProject } from "./utils/validators.js";

export function getAllProjects() {
  return sortByDateDesc(getProjects());
}

export function getProjectById(projectId) {
  return getProjects().find((project) => project.id === projectId) || null;
}

export function createProject(payload) {
  const validation = validateProject(payload);
  if (!validation.isValid) {
    throw new Error(validation.message);
  }

  const projects = getProjects();
  const project = {
    id: generateId("PRJ", projects.length + 101),
    name: sanitizeInput(payload.name),
    owner: sanitizeInput(payload.owner),
    status: payload.status,
    createdAt: new Date().toISOString()
  };

  projects.push(project);
  saveProjects(projects);
  return project;
}

export function updateProject(projectId, payload) {
  const validation = validateProject(payload);
  if (!validation.isValid) {
    throw new Error(validation.message);
  }

  const projects = getProjects().map((project) => {
    if (project.id !== projectId) {
      return project;
    }

    return {
      ...project,
      name: sanitizeInput(payload.name),
      owner: sanitizeInput(payload.owner),
      status: payload.status
    };
  });

  saveProjects(projects);
}

export function deleteProject(projectId) {
  saveProjects(getProjects().filter((project) => project.id !== projectId));
  saveTasks(getTasks().filter((task) => task.projectId !== projectId));
}
