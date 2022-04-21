const express = require('express');

const { httpGetLaunches, httpCreateLaunch, httpAbortLaunch } = require('./launches.controller');

const router = express.Router();

router.get('/', httpGetLaunches);
router.post('/', httpCreateLaunch);
router.delete('/:id', httpAbortLaunch);

module.exports = router;
