import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from "../projectService.js";
import { resetStorage } from "../storage.js";
import { createBadge, escapeHtml, formatDate, openDialog, showMessage, closeDialog, clearValidationState } from "../utils/helpers.js";

export function initializeProjectUI() {
  const elements = getProjectElements();
  const state = { editingId: null };

  renderProjects(elements);

  elements.openModal.addEventListener("click", () => openProjectModal(elements, state));
  elements.closeModal.addEventListener("click", () => closeProjectModal(elements, state));
  elements.cancelModal.addEventListener("click", () => closeProjectModal(elements, state));
  elements.modal.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeProjectModal(elements, state);
  });

  elements.form.addEventListener("submit", (event) => {
    event.preventDefault();
    handleSubmit(elements, state);
  });

  elements.resetData.addEventListener("click", () => {
    resetStorage();
    renderProjects(elements);
    showMessage(elements.feedback, "Seed data restored successfully.");
  });

  elements.tableBody.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) {
      return;
    }

    const projectId = actionButton.dataset.projectId;

    if (actionButton.dataset.action === "edit") {
      populateProjectForm(elements, state, projectId);
    }

    if (actionButton.dataset.action === "delete" && window.confirm("Delete this project and its related tasks?")) {
      deleteProject(projectId);
      renderProjects(elements);
      showMessage(elements.feedback, "Project deleted. Related tasks were removed too.");
    }
  });
}

function getProjectElements() {
  return {
    openModal: document.getElementById("open-project-modal"),
    closeModal: document.getElementById("close-project-modal"),
    cancelModal: document.getElementById("cancel-project-modal"),
    modal: document.getElementById("project-modal"),
    form: document.getElementById("project-form"),
    title: document.getElementById("project-modal-title"),
    feedback: document.getElementById("project-feedback"),
    loading: document.getElementById("project-loading"),
    empty: document.getElementById("project-empty"),
    tableBody: document.getElementById("project-table-body"),
    resetData: document.getElementById("reset-project-data"),
    formError: document.getElementById("project-form-error"),
    fields: {
      id: document.getElementById("project-id"),
      name: document.getElementById("project-name"),
      owner: document.getElementById("project-owner"),
      status: document.getElementById("project-status")
    },
    errorFields: {
      name: document.getElementById("project-name-error"),
      owner: document.getElementById("project-owner-error")
    }
  };
}

function renderProjects(elements) {
  const projects = getAllProjects();
  elements.loading.hidden = true;
  elements.tableBody.innerHTML = "";

  if (!projects.length) {
    elements.empty.hidden = false;
    return;
  }

  elements.empty.hidden = true;
  elements.tableBody.innerHTML = projects.map((project) => `
    <tr>
      <td>${escapeHtml(project.id)}</td>
      <td>${escapeHtml(project.name)}</td>
      <td>${escapeHtml(project.owner)}</td>
      <td>${createBadge(project.status, "status")}</td>
      <td>${formatDate(project.createdAt)}</td>
      <td>
        <div class="row-actions">
          <button type="button" class="text-button" data-action="edit" data-project-id="${escapeHtml(project.id)}">Edit</button>
          <button type="button" class="text-button delete" data-action="delete" data-project-id="${escapeHtml(project.id)}">Delete</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function openProjectModal(elements, state) {
  state.editingId = null;
  elements.title.textContent = "Create project";
  elements.form.reset();
  elements.fields.id.value = "";
  clearValidationState(elements.errorFields, elements.formError);
  openDialog(elements.modal);
  elements.fields.name.focus();
}

function populateProjectForm(elements, state, projectId) {
  const project = getProjectById(projectId);
  if (!project) {
    showMessage(elements.feedback, "Project not found.", true);
    return;
  }

  state.editingId = project.id;
  elements.title.textContent = "Edit project";
  elements.fields.id.value = project.id;
  elements.fields.name.value = project.name;
  elements.fields.owner.value = project.owner;
  elements.fields.status.value = project.status;
  clearValidationState(elements.errorFields, elements.formError);
  openDialog(elements.modal);
}

function closeProjectModal(elements, state) {
  state.editingId = null;
  elements.form.reset();
  clearValidationState(elements.errorFields, elements.formError);
  closeDialog(elements.modal);
}

function handleSubmit(elements, state) {
  clearValidationState(elements.errorFields, elements.formError);

  const payload = {
    name: elements.fields.name.value,
    owner: elements.fields.owner.value,
    status: elements.fields.status.value
  };

  try {
    if (state.editingId) {
      updateProject(state.editingId, payload);
      showMessage(elements.feedback, "Project updated successfully.");
    } else {
      createProject(payload);
      showMessage(elements.feedback, "Project created successfully.");
    }

    renderProjects(elements);
    closeProjectModal(elements, state);
  } catch (error) {
    mapValidationError(error.message, elements);
  }
}

function mapValidationError(message, elements) {
  elements.formError.hidden = false;
  elements.formError.textContent = message;

  if (message.toLowerCase().includes("name")) {
    elements.errorFields.name.textContent = message;
  }

  if (message.toLowerCase().includes("owner")) {
    elements.errorFields.owner.textContent = message;
  }
}
