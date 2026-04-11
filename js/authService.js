const STORAGE_KEYS = {
  auth: "dpp.auth",
  user: "dpp.user"
};

// Mock user credentials for prototype
const MOCK_USERS = [
  { username: "admin", password: "admin123", role: "admin", name: "Administrator" },
  { username: "developer", password: "dev123", role: "developer", name: "Developer" },
  { username: "manager", password: "mgr123", role: "manager", name: "Project Manager" }
];

export function isAuthenticated() {
  try {
    const authData = localStorage.getItem(STORAGE_KEYS.auth);
    if (!authData) return false;

    const { token, expires } = JSON.parse(authData);
    if (!token || !expires) return false;

    // Check if token is expired (24 hours)
    return Date.now() < expires;
  } catch (error) {
    console.error("Authentication check failed:", error);
    return false;
  }
}

export function getCurrentUser() {
  if (!isAuthenticated()) return null;

  try {
    const userData = localStorage.getItem(STORAGE_KEYS.user);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
}

export function login(username, password) {
  // Input validation
  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  if (username.length < 3 || password.length < 6) {
    throw new Error("Invalid credentials format");
  }

  // Find user (in real app, this would be an API call)
  const user = MOCK_USERS.find(u =>
    u.username.toLowerCase() === username.toLowerCase() &&
    u.password === password
  );

  if (!user) {
    throw new Error("Invalid username or password");
  }

  // Create session
  const session = {
    token: generateToken(),
    expires: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    userId: user.username
  };

  // Store session and user data
  localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify(session));
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify({
    username: user.username,
    name: user.name,
    role: user.role
  }));

  return { success: true, user: { username: user.username, name: user.name, role: user.role } };
}

export function logout() {
  localStorage.removeItem(STORAGE_KEYS.auth);
  localStorage.removeItem(STORAGE_KEYS.user);
}

// Simple token generation (not cryptographically secure, but sufficient for prototype)
function generateToken() {
  return 'token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Check authentication on page load and redirect if needed
export function requireAuthentication() {
  const currentPage = window.location.pathname.split('/').pop();

  // Pages that don't require authentication
  const publicPages = ['login.html'];

  if (!publicPages.includes(currentPage) && !isAuthenticated()) {
    window.location.href = 'login.html';
    return false;
  }

  return true;
}