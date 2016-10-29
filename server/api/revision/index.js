'use strict';

var express = require('express');
var controller = require('./revision.controller');

var router = express.Router();

router.get('/all/', controller.getAll);
router.get('/all/:articleId', controller.getAllWithArticleId);
router.get('/all/versions/:articleId', controller.getAllVersionsWithArticleId);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;