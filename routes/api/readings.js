const express = require('express')
const router = express.Router();

//Public GET Route
router.get('/', (req, res) => res.send('Readings Router'))

module.exports = router