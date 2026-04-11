const PROJECT_STATUSES = ["Active", "Completed"];
const TASK_STATUSES = ["To Do", "In Progress", "Done"];
const TASK_PRIORITIES = ["Low", "Medium", "High"];

export function validateProject(project) {
  if (!project.name || project.name.trim().length < 3) {
    return { isValid: false, message: "Project name must be at least 3 characters long." };
  }

  if (!project.owner || project.owner.trim().length < 3) {
    return { isValid: false, message: "Project owner must be at least 3 characters long." };
  }

  if (!PROJECT_STATUSES.includes(project.status)) {
    return { isValid: false, message: "Project status is invalid." };
  }

  return { isValid: true, message: "" };
}

export function validateTask(task) {
  if (!task.projectId) {
    return { isValid: false, message: "Task project selection is required." };
  }

  if (!task.title || task.title.trim().length < 3) {
    return { isValid: false, message: "Task title must be at least 3 characters long." };
  }

  if (!TASK_STATUSES.includes(task.status)) {
    return { isValid: false, message: "Task status is invalid." };
  }

  if (!TASK_PRIORITIES.includes(task.priority)) {
    return { isValid: false, message: "Task priority is invalid." };
  }

  return { isValid: true, message: "" };
}
