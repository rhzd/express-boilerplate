var express = require('express');
var router = express.Router();

/* session API listing. */
router.get('/', function(req, res, next) {
  res.send(req.context.models.users[req.context.me.id]);
});

module.exports = router;
