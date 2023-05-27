const express = require("express");
const { postAnswer} = require("../controllers/postAnswerController");


const router = express.Router();

router.post('/', postAnswer);

module.exports = {
    routes : router
}