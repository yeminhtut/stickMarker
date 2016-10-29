'use strict';

var mongoose         = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var AutoIncrement = require('mongoose-sequence');
 
var revisionSchema = new mongoose.Schema({ 
	title: String,
	content: String,
	articleId  : { type : mongoose.Schema.ObjectId, ref : 'Article' },
	created_date: { type: Date, default: Date.now },
	updated_date: { type: Date, default: Date.now }
});

revisionSchema.plugin(mongoosePaginate);
revisionSchema.plugin(AutoIncrement, {id: 'inhabitant_seq', inc_field: 'version', reference_fields: ['articleId'] });

module.exports = mongoose.model('revision', revisionSchema);