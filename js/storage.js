import { seedData } from "./seedData.js";

const STORAGE_KEYS = {
  projects: "dpp.projects",
  tasks: "dpp.tasks",
  seeded: "dpp.seeded"
};

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error(`Failed to read LocalStorage key: ${key}`, error);
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function initializeStorage() {
  if (localStorage.getItem(STORAGE_KEYS.seeded)) {
    return;
  }

  writeJson(STORAGE_KEYS.projects, seedData.projects);
  writeJson(STORAGE_KEYS.tasks, seedData.tasks);
  localStorage.setItem(STORAGE_KEYS.seeded, "true");
}

export function resetStorage() {
  writeJson(STORAGE_KEYS.projects, seedData.projects);
  writeJson(STORAGE_KEYS.tasks, seedData.tasks);
  localStorage.setItem(STORAGE_KEYS.seeded, "true");
}

export function getProjects() {
  return readJson(STORAGE_KEYS.projects, []);
}

export function saveProjects(projects) {
  writeJson(STORAGE_KEYS.projects, projects);
}

export function getTasks() {
  return readJson(STORAGE_KEYS.tasks, []);
}

export function saveTasks(tasks) {
  writeJson(STORAGE_KEYS.tasks, tasks);
}
