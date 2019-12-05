var express = require('express');
var router = express.Router();

/* users API listing. */
router.get('/', function(req, res, next) {
  res.send(Object.values(req.context.models.users));
});
router.get('/:userId', function(req, res, next) {
  res.send(req.context.models.users[req.params.userId]);
});

module.exports = router;
