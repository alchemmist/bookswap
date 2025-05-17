export function authorize(login) {
  localStorage.setItem("auth", login);
}

export function logout() {
  localStorage.removeItem("auth");
}

export function isAuthorized() {
  return localStorage.getItem("auth") !== null;
}

export function getAuthLogin() {
  return localStorage.getItem("auth");
}

export function changeAuthLogin(newLogin) {
  localStorage.setItem("auth", newLogin);
}
