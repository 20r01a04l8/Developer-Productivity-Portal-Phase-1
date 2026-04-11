import { getAllProjects } from "../projectService.js";
import { getAllTasks } from "../taskService.js";
import { createBadge, escapeHtml, formatDate } from "../utils/helpers.js";

export function initializeDashboard() {
  const projects = getAllProjects();
  const tasks = getAllTasks();

  document.getElementById("total-projects").textContent = projects.length;
  document.getElementById("active-tasks").textContent = tasks.filter((task) => task.status !== "Done").length;
  document.getElementById("completed-tasks").textContent = tasks.filter((task) => task.status === "Done").length;
  document.getElementById("high-priority-tasks").textContent = tasks.filter((task) => task.priority === "High").length;

  renderProjectSnapshot(projects);
  renderTaskSnapshot(tasks, projects);
}

function renderProjectSnapshot(projects) {
  const container = document.getElementById("dashboard-projects");
  const state = document.getElementById("dashboard-project-state");

  if (!projects.length) {
    state.hidden = false;
    state.textContent = "No projects available yet. Create a project to populate the dashboard.";
    return;
  }

  container.innerHTML = projects.slice(0, 3).map((project) => `
    <article class="list-card">
      <header>
        <div>
          <strong>${escapeHtml(project.name)}</strong>
          <p class="meta-line">Owned by ${escapeHtml(project.owner)}</p>
        </div>
        ${createBadge(project.status, "status")}
      </header>
      <div class="meta-line">
        <span>${escapeHtml(project.id)}</span>
        <span>Created ${formatDate(project.createdAt)}</span>
      </div>
    </article>
  `).join("");
}

function renderTaskSnapshot(tasks, projects) {
  const container = document.getElementById("dashboard-tasks");
  const state = document.getElementById("dashboard-task-state");
  const projectLookup = new Map(projects.map((project) => [project.id, project.name]));

  if (!tasks.length) {
    state.hidden = false;
    state.textContent = "No tasks available yet. Add tasks from the task module to see workload trends.";
    return;
  }

  container.innerHTML = tasks
    .filter((task) => task.priority === "High" || task.status === "In Progress")
    .slice(0, 4)
    .map((task) => `
      <article class="list-card">
        <header>
          <div>
            <strong>${escapeHtml(task.title)}</strong>
            <p class="meta-line">${escapeHtml(projectLookup.get(task.projectId) || "Unknown Project")}</p>
          </div>
          ${createBadge(task.priority, "priority")}
        </header>
        <div class="meta-line">
          ${createBadge(task.status, "status")}
          <span>${formatDate(task.createdAt)}</span>
        </div>
      </article>
    `)
    .join("");
}
