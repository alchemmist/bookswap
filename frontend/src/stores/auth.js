export function authorize(login, id, isAdmin) {
  localStorage.setItem("username", login);
  localStorage.setItem("id", id);
  localStorage.setItem("is_admin", isAdmin);
}

export function logout() {
  localStorage.clear();
}

export function isAdmin() {
  return localStorage.getItem("is_admin") === 'true';
}

export function isAuthorized() {
  return localStorage.getItem("username") !== null;
}

export function getAuthLogin() {
  return localStorage.getItem("username");
}

export function getAuthId() {
  return localStorage.getItem("id");
}

export function changeAuthLogin(newLogin) {
  localStorage.setItem("username", newLogin);
}
