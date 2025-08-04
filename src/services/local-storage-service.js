import config from "../config/config";

const getKey = (property) => {
  return `${config.project_key}-${property}`;
};

const setToken = (token) => {
  localStorage.setItem(getKey("token"), JSON.stringify(token));
};

const getToken = () => {
  const token = localStorage.getItem(getKey("token"));
  return token ? JSON.parse(token) : null;
};

const removeToken = () => {
  localStorage.removeItem(getKey("token"));
};

export default {
  getToken,
  setToken,
  removeToken
};
