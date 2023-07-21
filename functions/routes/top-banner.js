const express = require('express');
const banner = require('../controllers/topBanners');

const router = express.Router();

router.post('/', banner.topBanner);

module.exports = {
    routes : router
}
