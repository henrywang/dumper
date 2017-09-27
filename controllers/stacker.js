const express = require('express');
const bodyParser = require('body-parser');
const Stacker = require('../model/stacker');

const router = express.Router();
router.use(bodyParser.json());

router.get('/ipaddrs/:vmName', (req, res) => {
  if (req.accepts('application/json')) {
    Stacker.findOne({ vmName: req.params.vmName }, '-_id vmName ip', (err, stacker) => {
      if (err) return res.status(500).json({'error': err});
      if (!stacker) return res.status(404).json({'error': 'There is no resource behind the URI.'})
      res.set('Content-Type', 'application/json; charset=utf-8')
         .json(stacker)
    })
  } else {
    res.status(406)
       .json({'error': 'Not Acceptable'});
  }
})

router.post('/ipaddrs', (req, res) => {
  Stacker.create({
    vmName: req.body.vm_name,
    ip: req.body.ip
  },
  (err, stacker) => {
    if (err) return res.status(500).json({'error': err});
    res.status(200)
       .json(stacker)
  })
})

module.exports = router;
