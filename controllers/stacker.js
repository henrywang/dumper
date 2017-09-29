const express = require('express');
const bodyParser = require('body-parser');
const Stacker = require('../model/stacker');
const helperCode = require('../helper/statusCode');

const router = express.Router();
router.use(bodyParser.json());


router.get('/ipaddrs/:vmName', (req, res) => { /* eslint consistent-return: 0 */
  if (!req.accepts('application/json')) {
    Stacker.findOne({ vmName: req.params.vmName }, '-_id vmName ip', (err, stacker) => {
      if (err) {
        return res.status(422)
          .json(helperCode.make422(err));
      }
      if (!stacker) {
        return res.status(404)
          .json(helperCode.STATUSCODE.code404);
      }

      return res.set('Content-Type', 'application/json; charset=utf-8')
        .status(200)
        .json(stacker);
    });
  } else {
    return res.status(415)
      .json(helperCode.STATUSCODE.code415);
  }
});

router.post('/ipaddrs', (req, res) => {
  const stacker = new Stacker();
  stacker.vmName = req.body.vmName;
  stacker.ip = req.body.ip;
  stacker.save((err, collection) => {
    if (err) {
      return res.status(422)
        .json(helperCode.make422(err));
    }
    return res.status(200)
      .json(collection);
  });
});

module.exports = router;
