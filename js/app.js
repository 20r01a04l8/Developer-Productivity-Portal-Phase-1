import { initializeStorage } from "./storage.js";
import { highlightActiveRoute } from "./router.js";
import { initializeDashboard } from "./ui/dashboard.js";
import { initializeProjectUI } from "./ui/projectUI.js";
import { initializeTaskUI } from "./ui/taskUI.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeStorage();
  highlightActiveRoute();

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
});
