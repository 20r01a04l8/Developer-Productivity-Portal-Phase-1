import { getAllProjects } from "../projectService.js";
import { createTask, deleteTask, filterTasks, getAllTasks, updateTask } from "../taskService.js";
import { createBadge, escapeHtml, formatDate, openDialog, showMessage, closeDialog, clearValidationState } from "../utils/helpers.js";

export function initializeTaskUI() {
  const elements = getTaskElements();
  const state = {
    editingId: null,
    filters: {
      projectId: "all",
      status: "all",
      priority: "all",
      search: ""
    }
  };

  hydrateProjectOptions(elements);
  renderTasks(elements, state.filters);

  elements.openModal.addEventListener("click", () => openTaskModal(elements, state));
  elements.closeModal.addEventListener("click", () => closeTaskModal(elements, state));
  elements.cancelModal.addEventListener("click", () => closeTaskModal(elements, state));
  elements.modal.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeTaskModal(elements, state);
  });

  elements.form.addEventListener("submit", (event) => {
    event.preventDefault();
    handleSubmit(elements, state);
  });

  [elements.projectFilter, elements.statusFilter, elements.priorityFilter, elements.search].forEach((input) => {
    const syncFilters = () => {
      state.filters = {
        projectId: elements.projectFilter.value,
        status: elements.statusFilter.value,
        priority: elements.priorityFilter.value,
        search: elements.search.value
      };
      renderTasks(elements, state.filters);
    };

    input.addEventListener("input", syncFilters);
    input.addEventListener("change", syncFilters);
  });

  elements.clearFilters.addEventListener("click", () => {
    elements.projectFilter.value = "all";
    elements.statusFilter.value = "all";
    elements.priorityFilter.value = "all";
    elements.search.value = "";
    state.filters = { projectId: "all", status: "all", priority: "all", search: "" };
    renderTasks(elements, state.filters);
  });

  elements.tableBody.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) {
      return;
    }

    const taskId = actionButton.dataset.taskId;
    if (actionButton.dataset.action === "edit") {
      populateTaskForm(elements, state, taskId);
    }

    if (actionButton.dataset.action === "delete" && window.confirm("Delete this task?")) {
      deleteTask(taskId);
      renderTasks(elements, state.filters);
      showMessage(elements.feedback, "Task deleted successfully.");
    }
  });
}

function getTaskElements() {
  return {
    openModal: document.getElementById("open-task-modal"),
    closeModal: document.getElementById("close-task-modal"),
    cancelModal: document.getElementById("cancel-task-modal"),
    modal: document.getElementById("task-modal"),
    form: document.getElementById("task-form"),
    title: document.getElementById("task-modal-title"),
    feedback: document.getElementById("task-feedback"),
    loading: document.getElementById("task-loading"),
    empty: document.getElementById("task-empty"),
    tableBody: document.getElementById("task-table-body"),
    projectFilter: document.getElementById("task-project-filter"),
    statusFilter: document.getElementById("task-status-filter"),
    priorityFilter: document.getElementById("task-priority-filter"),
    search: document.getElementById("task-search"),
    clearFilters: document.getElementById("clear-task-filters"),
    formError: document.getElementById("task-form-error"),
    fields: {
      id: document.getElementById("task-id"),
      projectId: document.getElementById("task-project"),
      title: document.getElementById("task-title"),
      status: document.getElementById("task-status"),
      priority: document.getElementById("task-priority")
    },
    errorFields: {
      title: document.getElementById("task-title-error")
    }
  };
}

function hydrateProjectOptions(elements) {
  const projects = getAllProjects();
  const currentFilter = elements.projectFilter.value;
  const currentFormProject = elements.fields.projectId.value;
  const optionMarkup = projects.map((project) => `<option value="${escapeHtml(project.id)}">${escapeHtml(project.name)}</option>`).join("");
  elements.projectFilter.innerHTML = `<option value="all">All Projects</option>${optionMarkup}`;
  elements.fields.projectId.innerHTML = optionMarkup;
  elements.openModal.disabled = !projects.length;
  elements.projectFilter.value = projects.some((project) => project.id === currentFilter) ? currentFilter : "all";
  elements.fields.projectId.value = projects.some((project) => project.id === currentFormProject) ? currentFormProject : (projects[0]?.id || "");
}

function renderTasks(elements, filters) {
  const projects = getAllProjects();
  const projectLookup = new Map(projects.map((project) => [project.id, project.name]));
  const tasks = filters ? filterTasks(filters) : getAllTasks();

  hydrateProjectOptions(elements);
  elements.loading.hidden = true;
  elements.tableBody.innerHTML = "";

  if (!tasks.length) {
    elements.empty.hidden = false;
    return;
  }

  elements.empty.hidden = true;
  elements.tableBody.innerHTML = tasks.map((task) => `
    <tr>
      <td>${escapeHtml(task.id)}</td>
      <td>${escapeHtml(task.title)}</td>
      <td>${escapeHtml(projectLookup.get(task.projectId) || "Deleted Project")}</td>
      <td>${createBadge(task.status, "status")}</td>
      <td>${createBadge(task.priority, "priority")}</td>
      <td>${formatDate(task.createdAt)}</td>
      <td>
        <div class="row-actions">
          <button type="button" class="text-button" data-action="edit" data-task-id="${escapeHtml(task.id)}">Edit</button>
          <button type="button" class="text-button delete" data-action="delete" data-task-id="${escapeHtml(task.id)}">Delete</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function openTaskModal(elements, state) {
  if (!getAllProjects().length) {
    showMessage(elements.feedback, "Create a project before adding tasks.", true);
    return;
  }

  state.editingId = null;
  elements.title.textContent = "Create task";
  elements.form.reset();
  clearValidationState(elements.errorFields, elements.formError);
  elements.fields.projectId.selectedIndex = 0;
  elements.fields.status.value = "To Do";
  elements.fields.priority.value = "Medium";
  openDialog(elements.modal);
  elements.fields.title.focus();
}

function populateTaskForm(elements, state, taskId) {
  const task = getAllTasks().find((item) => item.id === taskId);
  if (!task) {
    showMessage(elements.feedback, "Task not found.", true);
    return;
  }

  state.editingId = task.id;
  elements.title.textContent = "Edit task";
  elements.fields.id.value = task.id;
  elements.fields.projectId.value = task.projectId;
  elements.fields.title.value = task.title;
  elements.fields.status.value = task.status;
  elements.fields.priority.value = task.priority;
  clearValidationState(elements.errorFields, elements.formError);
  openDialog(elements.modal);
}

function closeTaskModal(elements, state) {
  state.editingId = null;
  elements.form.reset();
  clearValidationState(elements.errorFields, elements.formError);
  closeDialog(elements.modal);
}

function handleSubmit(elements, state) {
  clearValidationState(elements.errorFields, elements.formError);

  const payload = {
    projectId: elements.fields.projectId.value,
    title: elements.fields.title.value,
    status: elements.fields.status.value,
    priority: elements.fields.priority.value
  };

  try {
    if (state.editingId) {
      updateTask(state.editingId, payload);
      showMessage(elements.feedback, "Task updated successfully.");
    } else {
      createTask(payload);
      showMessage(elements.feedback, "Task created successfully.");
    }

    renderTasks(elements, state.filters);
    closeTaskModal(elements, state);
  } catch (error) {
    elements.formError.hidden = false;
    elements.formError.textContent = error.message;
    elements.errorFields.title.textContent = error.message.toLowerCase().includes("title") ? error.message : "";
  }
}
