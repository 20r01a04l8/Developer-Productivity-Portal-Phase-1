export function generateId(prefix, sequence) {
  return `${prefix}-${String(sequence).padStart(3, "0")}`;
}

export function sanitizeInput(value) {
  return value
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export function sortByDateDesc(items) {
  return [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function createBadge(value, type) {
  const normalized = value.toLowerCase().replace(/\s+/g, "-");
  return `<span class="badge badge-${type}-${normalized}">${escapeHtml(value)}</span>`;
}

export function showMessage(element, message, isError = false) {
  element.hidden = false;
  element.textContent = message;
  element.style.color = isError ? "var(--danger)" : "var(--text-soft)";
  element.style.borderStyle = isError ? "solid" : "dashed";
}

export function clearValidationState(errorFields, banner) {
  Object.values(errorFields).forEach((field) => {
    field.textContent = "";
  });

  if (banner) {
    banner.hidden = true;
    banner.textContent = "";
  }
}

export function openDialog(dialog) {
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  }
}

export function closeDialog(dialog) {
  if (dialog.open) {
    dialog.close();
  }
}
