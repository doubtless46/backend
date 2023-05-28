const express = require("express");
const { searchAnswer} = require("../controllers/searchController");


const router = express.Router();

router.post('/search', searchAnswer);

module.exports = {
    routes : router
}