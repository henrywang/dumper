const express = require('express');
const bodyParser = require('body-parser');
const StackerController = require('../controllers/stacker.controller');

const router = express.Router();
router.use(bodyParser.json());

router.get('/ipaddrs/:vmName', StackerController.getIp);
router.post('/ipaddrs', StackerController.postIp);

module.exports = router;
