import { getCurrentUser, logout } from "./authService.js";

const PRIMARY_NAV_ITEMS = [
  {
    route: "dashboard",
    href: "./index.html",
    label: "Dashboard",
    description: "Portfolio summary and delivery visibility"
  },
  {
    route: "projects",
    href: "./projects.html",
    label: "Projects",
    description: "Ownership, scope, and project status"
  },
  {
    route: "tasks",
    href: "./tasks.html",
    label: "Tasks",
    description: "Execution tracking and work prioritization"
  }
];

export function renderPrimaryNavigation() {
  const nav = document.getElementById("primary-nav");

  if (!nav) {
    return;
  }

  nav.innerHTML = PRIMARY_NAV_ITEMS.map((item) => `
    <a href="${item.href}" data-route="${item.route}" class="nav-link">
      <span class="nav-link-accent"></span>
      <span class="nav-link-content">
        <span class="nav-link-label-row">
          <span class="nav-link-label">${item.label}</span>
          <span class="nav-link-tag">Module</span>
        </span>
        <span class="nav-link-copy">${item.description}</span>
      </span>
    </a>
  `).join("");
}

export function initializeResponsiveNavigation() {
  const sidebar = document.querySelector(".sidebar");
  const navPanel = document.getElementById("nav-panel");
  const toggle = document.getElementById("nav-toggle");

  if (!sidebar || !navPanel || !toggle) {
    return;
  }

  const closeNavigation = () => {
    sidebar.classList.remove("is-nav-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  const openNavigation = () => {
    sidebar.classList.add("is-nav-open");
    toggle.setAttribute("aria-expanded", "true");
  };

  toggle.addEventListener("click", () => {
    if (sidebar.classList.contains("is-nav-open")) {
      closeNavigation();
      return;
    }

    openNavigation();
  });

  navPanel.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (window.innerWidth <= 860 && target.closest("[data-route]")) {
      closeNavigation();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeNavigation();
    }
  });
}

export function highlightActiveRoute() {
  const currentPage = document.body.dataset.page;
  document.querySelectorAll("[data-route]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.route === currentPage);
    if (link.dataset.route === currentPage) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
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
