const express = require('express');
const potterApi = require('../helpers/potterApi');
const { characters } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { house } = req.query;
    const condition = house ? { house } : {};

    const result = await characters.findAll({ where: condition });
    res.status(200).send({ result });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await characters.findOne({ where: { id } });
    res.status(200).send({ result });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

router.post('/', async (req, res) => {
  const character = req.body;
  try {
    const houses = await potterApi.getHouses();

    if(character.house && !houses.data.find(house => house._id === character.house)) {
      res.status(422).send({ err: 'Invalid house ID' });
      return;
    }

    if(!character.house) {
      const house = await potterApi.sortHouse();
      character.house = houses.data.find(h => h.name === house.data)._id;
    }

    const result = await characters.create(character);
    res.status(200).send({ result });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const character = req.body;
  try {
    const toUpdate = await characters.findOne({ where: { id } });
    const result = await toUpdate.update(character);
    res.status(200).send({ result });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await characters.destroy({ where: { id } });
    res.status(200).send({ result });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

module.exports = router;
