const { default: axios } = require("axios");

const httpClientPlugin = {
  get: async (url) => {
    const res = await axios.get(url);
    return res.data;
  },
  post: async (url, body) => { },
  put: async (url, body) => { },
  delete: async (url) => { },
};

module.exports = httpClientPlugin;