const express = require("express");
const { addDoubt} = require("../controllers/doubtController");
const {isQuestion} = require('../middleware/isQuestion')


const router = express.Router();

router.post('/',isQuestion, addDoubt);

module.exports = {
    routes : router
}