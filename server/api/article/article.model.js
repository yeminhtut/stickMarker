'use strict';

// var mongoose = require('mongoose'),
//     Schema = mongoose.Schema;

var mongoose         = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
 
var ArticleSchema = new mongoose.Schema({ 
	title: String,
	content: String,
	owner  : String,
	is_published:  { type: Boolean, default: false},
	created_date: { type: Date, default: Date.now },
	updated_date: { type: Date, default: Date.now }
});
ArticleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Article', ArticleSchema);