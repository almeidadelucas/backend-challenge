const express = require('express');
const router = express.Router();

router.use('/characters', require('../controllers/characters'));

module.exports = router;
