var express = require('express');
var router = express.Router();

/* messages API listing. */
router.get('/', function(req, res, next) {
  res.send(Object.values(req.context.models.messages));
});
router.get('/:messageId', function(req, res, next) {
  res.send(req.context.models.messages[req.params.messageId]);
});
router.post('/', function(req, res, next) {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };
  req.context.models.messages[id] = message;
  res.send(message);
});
router.delete('/:messageId', function(req, res, next) {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;
  req.context.models.messages = otherMessages;
  res.send(message);
});

module.exports = router;
