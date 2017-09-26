const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

router.get('/ipaddrs/:vm_name', (req, res) => {
  if (req.accepts('application/json')) {
    res.set('Content-Type', 'application/json; charset=utf-8')
       .json(req.params)
  } else {
    res.status(406)
       .send('Not Acceptable');
  }

})

router.post('/ipaddrs', (req, res) => {
  res.json(req.body)
})

module.exports = router;
