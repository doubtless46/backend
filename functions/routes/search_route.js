const express = require("express");
const { searchAnswer} = require("../controllers/searchController");


const router = express.Router();
router.post('/', searchAnswer);

module.exports = {
    routes : router
}