export function highlightActiveRoute() {
  const currentPage = document.body.dataset.page;
  document.querySelectorAll("[data-route]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.route === currentPage);
    if (link.dataset.route === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  });
}
