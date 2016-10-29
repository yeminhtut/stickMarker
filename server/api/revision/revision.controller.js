'use strict';

var _ = require('lodash');
var Revision = require('./revision.model');

exports.getAll = function(req, res) {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const offset = req.query.offset || 0;
  Revision.paginate({}, { page: page, limit: limit, offset : offset }, function(err, result) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(result);
  });
};

// Get list of revisions with article id
exports.getAllWithArticleId = function(req, res) {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const offset = req.query.offset || 0;
  const articleId = req.params.articleId;
  Revision.paginate({articleId: articleId}, { page: page, limit: limit, offset : offset }, function(err, result) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(result);
  });
};

// Get list of revisions with article id
exports.getAllVersionsWithArticleId = function(req, res) {
  const select = '_id version'
  const limit = req.query.limit || 50;
  const page = req.query.page || 1;
  const offset = req.query.offset || 0;
  const articleId = req.params.articleId;
  Revision.paginate({articleId: articleId}, { page: page, limit: limit, offset : offset,select : select }, function(err, result) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(result.docs);
  });
};

// Get a single revision
exports.show = function(req, res) {
  Revision.findById(req.params.id, function (err, result) {
    if(err) { return handleError(res, err); }
    if(!result) { return res.status(404).send('Not Found'); }
    return res.json(result);
  });
};

// Creates a new revision in the DB.
exports.create = function(req, res) {
  Revision.create(req.body, function(err, result) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(result);
  });
};

// Updates an existing revision in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Revision.findById(req.params.id, function (err, result) {
    if (err) { return handleError(res, err); }
    if(!result) { return res.status(404).send('Not Found'); }
    var updated = _.merge(result, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(result);
    });
  });
};

// Deletes a revision from the DB.
exports.destroy = function(req, res) {
  Revision.findById(req.params.id, function (err, result) {
    if(err) { return handleError(res, err); }
    if(!result) { return res.status(404).send('Not Found'); }
    result.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}

function handleError(res, err) {
  return res.status(500).send(err);
}
