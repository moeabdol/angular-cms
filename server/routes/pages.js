const express = require('express');

const router = express.Router();

const pages = require('../controllers/pages');

router.get('/', pages.index);
router.get('/:slug', pages.show);

module.exports = router;
