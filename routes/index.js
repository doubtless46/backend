var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next)=> {
  res.send('<h1>Hello World</h1>');
});

module.exports = router;