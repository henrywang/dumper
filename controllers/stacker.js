const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/ipaddrs', (req, resp) => {
  resp.send('stacker get api.')
})

router.post('/ipaddrs', (req, resp) => {
  resp.send('stacker post api.')
})

module.exports = router;
