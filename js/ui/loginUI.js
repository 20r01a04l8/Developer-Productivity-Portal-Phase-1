import { login, getCurrentUser } from "../authService.js";

export function initializeLoginUI() {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");
  const submitButton = document.getElementById("login-submit");

  if (!loginForm || !errorMessage || !submitButton) {
    console.error("Login UI elements not found");
    return;
  }

  // Check if already authenticated
  if (getCurrentUser()) {
    redirectToDashboard();
    return;
  }

  loginForm.addEventListener("submit", handleLogin);
  setupFormValidation();
}

function handleLogin(event) {
  event.preventDefault();

  const submitButton = document.getElementById("login-submit");
  const errorMessage = document.getElementById("error-message");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  // Clear previous errors
  errorMessage.textContent = "";
  errorMessage.classList.add("hidden");

  // Get form data
  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  // Basic client-side validation
  if (!username || !password) {
    showError("Please enter both username and password");
    return;
  }

  // Disable form during submission
  submitButton.disabled = true;
  submitButton.textContent = "Signing in...";

  try {
    const result = login(username, password);

    if (result.success) {
      // Successful login - redirect to dashboard
      redirectToDashboard();
    }
  } catch (error) {
    showError(error.message);
  } finally {
    // Re-enable form
    submitButton.disabled = false;
    submitButton.textContent = "Sign In";
  }
}

function showError(message) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");

  // Focus the first empty field
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  if (!usernameInput.value.trim()) {
    usernameInput.focus();
  } else {
    passwordInput.focus();
  }
}

function setupFormValidation() {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  // Real-time validation feedback
  usernameInput.addEventListener("input", () => {
    validateField(usernameInput, usernameInput.value.trim().length >= 3);
  });

  passwordInput.addEventListener("input", () => {
    validateField(passwordInput, passwordInput.value.length >= 6);
  });
}

function validateField(input, isValid) {
  input.classList.toggle("invalid", !isValid);
  input.classList.toggle("valid", isValid);
}

function redirectToDashboard() {
  // Add a small delay for better UX
  setTimeout(() => {
    window.location.href = "index.html";
  }, 500);
}

// Demo credentials helper (for development)
export function showDemoCredentials() {
  const demoSection = document.getElementById("demo-credentials");
  if (demoSection) {
    demoSection.classList.toggle("hidden");
  }
}