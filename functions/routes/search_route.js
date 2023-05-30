const express = require("express");
const { searchAnswer} = require("../controllers/searchController");


const router = express.Router();

router.get('/search', searchAnswer);

module.exports = {
    routes : router
}