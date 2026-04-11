import { initializeStorage } from "./storage.js";
import { highlightActiveRoute, initializeUserSection } from "./router.js";
import { initializeDashboard } from "./ui/dashboard.js";
import { initializeProjectUI } from "./ui/projectUI.js";
import { initializeTaskUI } from "./ui/taskUI.js";
import { initializeLoginUI } from "./ui/loginUI.js";
import { requireAuthentication } from "./authService.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeStorage();
  highlightActiveRoute();
  initializeUserSection();

  // Check authentication for protected pages
  if (!requireAuthentication()) {
    return; // Redirected to login
  }

  const page = document.body.dataset.page;

  if (page === "dashboard") {
    initializeDashboard();
  }

  if (page === "projects") {
    initializeProjectUI();
  }

  if (page === "tasks") {
    initializeTaskUI();
  }

  if (page === "login") {
    initializeLoginUI();
  }
});
