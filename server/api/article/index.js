'use strict';

var express = require('express');
var controller = require('./article.controller');

var router = express.Router();

//toDelete
//router.get('/limit=:articleLimit&skipped=:articleSkipped',controller.test);

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;