const axios = require('axios');
const { key } = require('../.keys/potterApi.json');
const { potterApiUrl } = require('../config/development.json');

const getCharacters = () => {
  return axios.get(`${potterApiUrl}/characters`, { params: { key } });
};

const getHouses = () => {
  return axios.get(`${potterApiUrl}/houses`, { params: { key } });
}

const sortHouse = () => {
  return axios.get(`${potterApiUrl}/sortingHat`);
}

module.exports = {
  getCharacters,
  getHouses,
  sortHouse,
};
