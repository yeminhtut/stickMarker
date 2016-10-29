/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /articles              ->  index
 * POST    /articles              ->  create
 * GET     /articles/:id          ->  show
 * PUT     /articles/:id          ->  update
 * DELETE  /articles/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Article = require('./article.model');

// Get list of articles
exports.index = function(req, res) {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const offset = req.query.offset || 0;
  const sort = { updated_date : -1 };
  //const sort =,
  Article.paginate({}, { page: page, limit: limit, offset : offset, sort: sort}, function(err, result) {
    if(err) { return handleError(res, err); }
    // result.docs 
    // result.total 
    // result.limit - 10 
    // result.page - 3 
    // result.pages 
    return res.status(200).json(result);
  });
};

// Get a single article
exports.show = function(req, res) {
  Article.findById(req.params.id, function (err, article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.status(404).send('Not Found'); }
    return res.json(article);
  });
};

// Creates a new article in the DB.
exports.create = function(req, res) {
  Article.create(req.body, function(err, article) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(article);
  });
};

// Updates an existing article in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Article.findById(req.params.id, function (err, article) {
    if (err) { return handleError(res, err); }
    if(!article) { return res.status(404).send('Not Found'); }
    var updated = _.merge(article, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(article);
    });
  });
};

// Deletes a article from the DB.
exports.destroy = function(req, res) {
  Article.findById(req.params.id, function (err, article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.status(404).send('Not Found'); }
    article.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
