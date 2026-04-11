import { getCurrentUser, logout } from "./authService.js";

export function highlightActiveRoute() {
  const currentPage = document.body.dataset.page;
  document.querySelectorAll("[data-route]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.route === currentPage);
    if (link.dataset.route === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });
}

export function initializeUserSection() {
  const userSection = document.getElementById("user-section");
  const userInfo = document.getElementById("user-info");
  const logoutBtn = document.getElementById("logout-btn");

  if (!userSection || !userInfo || !logoutBtn) {
    return; // User section not present on this page
  }

  const user = getCurrentUser();

  if (user) {
    // User is authenticated
    userInfo.innerHTML = `
      <p class="panel-label">Current User</p>
      <h3 id="user-info-title">${user.name}</h3>
      <p style="color: rgba(238, 248, 242, 0.76); margin: 0; font-size: 0.85rem;">${user.role}</p>
    `;
    userSection.style.display = "block";
    logoutBtn.style.display = "block";

    logoutBtn.addEventListener("click", handleLogout);
  } else {
    // User not authenticated
    userSection.style.display = "none";
  }
}

function handleLogout() {
  if (confirm("Are you sure you want to sign out?")) {
    logout();
    window.location.href = "login.html";
  }
}
