const jwt = require("jsonwebtoken");
const config = require("./config.json");



const create = user => {
  const { _id } = user;
  const payload = {
    user: {
      id: _id
    }
  };

  return jwt.sign(payload, config.secret);
};

const setToken = token => {
  // set an item in local storage called "token" and set it equal to any value we pass to it
  localStorage.setItem("token", token);
};

const getToken = () => {
  // retrieve our token from local storage
  return localStorage.getItem("token");
};

const removeToken = () => {
  // remove our token from local storage
  localStorage.removeItem("token");
};

module.exports = {
  create,
  setToken,
  getToken,
  removeToken
};
