const express = require("express");
const { addDoubt} = require("../controllers/doubtController");


const router = express.Router();

router.post('/doubts', addDoubt);

module.exports = {
    routes : router
}