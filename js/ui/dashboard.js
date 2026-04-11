import { getAllProjects } from "../projectService.js";
import { getAllTasks } from "../taskService.js";
import { createBadge, escapeHtml, formatDate } from "../utils/helpers.js";

export function initializeDashboard() {
  const projects = getAllProjects();
  const tasks = getAllTasks();
  const activeTasks = tasks.filter((task) => task.status !== "Done");
  const completedTasks = tasks.filter((task) => task.status === "Done");
  const highPriorityTasks = tasks.filter((task) => task.priority === "High");

  document.getElementById("total-projects").textContent = projects.length;
  document.getElementById("active-tasks").textContent = activeTasks.length;
  document.getElementById("completed-tasks").textContent = completedTasks.length;
  document.getElementById("high-priority-tasks").textContent = highPriorityTasks.length;

  renderDeliveryHealth(projects, tasks, activeTasks, highPriorityTasks);
  renderProjectSnapshot(projects);
  renderTaskSnapshot(tasks, projects);
}

function renderDeliveryHealth(projects, tasks, activeTasks, highPriorityTasks) {
  const healthContainer = document.getElementById("dashboard-health");
  const totalTasks = tasks.length;
  const completedRate = totalTasks ? Math.round(((totalTasks - activeTasks.length) / totalTasks) * 100) : 0;
  const activeProjects = projects.filter((project) => project.status === "Active").length;

  healthContainer.innerHTML = [
    {
      label: "Active projects",
      value: `${activeProjects}/${projects.length || 0}`,
      detail: "Projects currently in motion across the portfolio."
    },
    {
      label: "Completion rate",
      value: `${completedRate}%`,
      detail: "Tasks completed out of the current tracked workload."
    },
    {
      label: "High-priority pressure",
      value: `${highPriorityTasks.length}`,
      detail: "Critical items that deserve immediate visibility."
    }
  ].map((item) => `
    <div class="health-item">
      <dt>${item.label}</dt>
      <dd>${item.value}</dd>
      <p>${item.detail}</p>
    </div>
  `).join("");
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
  const highlightedTasks = tasks.filter((task) => task.priority === "High" || task.status === "In Progress");

  if (!highlightedTasks.length) {
    state.hidden = false;
    state.textContent = "No high-priority or in-progress tasks yet. Add tasks from the task module to activate the dashboard queue.";
    return;
  }

  container.innerHTML = highlightedTasks
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
