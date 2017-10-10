const StackerModel = require('../models/stacker.model');
const helperCode = require('../helper/statusCode');

const stackerController = {
  getIp: (req, res) => { /* eslint consistent-return: 0 */
    if (req.accepts('application/json')) {
      StackerModel.findOne({ vmName: req.params.vmName }, '-_id vmName ip', (err, stacker) => {
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
  },
  postIp: (req, res) => {
    const stackerModel = new StackerModel();
    stackerModel.vmName = req.body.vmName;
    stackerModel.ip = req.body.ip;
    stackerModel.save((err, collection) => {
      if (err) {
        return res.status(422)
          .json(helperCode.make422(err));
      }
      return res.status(200)
        .json(collection);
    });
  },
};

module.exports = stackerController;
