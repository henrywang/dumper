const express = require('express');
const bodyParser = require('body-parser');
const Stacker = require('../model/stacker');
const jsonMaker = require('../helper/jsonMaker');

const router = express.Router();
router.use(bodyParser.json());

router.get('/ipaddrs/:vmName', (req, res) => {
  if (req.accepts('application/json')) {
    Stacker.findOne({ vmName: req.params.vmName }, '-_id vmName ip', (err, stacker) => {
      if (err) {
        return res.status(500)
                  .json(jsonMaker.failJson([err]));
      }
      if (!stacker) {
        return res.status(404)
                  .json(jsonMaker.failJson([jsonMaker.ERRORS.code34]));
      }

      res.set('Content-Type', 'application/json; charset=utf-8')
         .json(jsonMaker.successJson(stacker));
    })
  } else {
    res.status(406)
       .json(jsonMaker.failJson([jsonMaker.ERRORS.code54]));
  }
})

router.post('/ipaddrs', (req, res) => {
  const stacker = new Stacker();
  stacker.vmName = req.body.vmName;
  stacker.ip = req.body.ip;
  stacker.save((err, collection) => {
    if (err) {
      return res.status(500)
                .json(jsonMaker.failJson([err]));
    }
    res.status(200)
       .json(jsonMaker.successJson(collection))
  })
})

module.exports = router;
