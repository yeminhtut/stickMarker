/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

// 'use strict';

// var User = require('../api/user/user.model');
// var Article = require('../api/article/article.model');
// var revision = require('../api/revision/revision.model');

// Article.find({}).remove(function() {
//   Article.create({
//     title : 'Development Tools',
//     content : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.',
//     owner : '580b9edba85c035f1db594b3',
//     is_published : true
//   }, {
//     title : 'Server and Client integration',
//     content : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
//   });
// });

// revision.find({}).remove(function() {
//   revision.create({
//     title : 'Development Tools',
//     content : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.(That is draft version)',
//     articleId : '580e1f82ed2c394a028f0c1f',
//   }, {
//     title : 'Development Tools',
//     content : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.(That is draft version)',
//     articleId : '580e1f82ed2c394a028f0c1f',
//   }, {
//     title : 'Server and Client integration',
//     content : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.(That is also draft version one for article two)',
//     articleId : '580e1f82ed2c394a028f0c1e',
//   },{
//     title : 'Server and Client integration',
//     content : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.(That is also draft version two for article two)',
//     articleId : '580e1f82ed2c394a028f0c1e',
//   },{
//     title : 'Server and Client integration',
//     content : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.(That is also draft version three for article two)',
//     articleId : '580e1f82ed2c394a028f0c1e',
//   },{
//     title : 'Server and Client integration',
//     content : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.(That is also draft version four for article two)',
//     articleId : '580e1f82ed2c394a028f0c1e',
//   });
// });

// User.find({}).remove(function() {
//   User.create({
//     provider: 'local',
//     name: 'Test User',
//     email: 'test@test.com',
//     password: 'test'
//   }, {
//     provider: 'local',
//     role: 'admin',
//     name: 'Admin',
//     email: 'admin@admin.com',
//     password: 'admin'
//   }, function() {
//       console.log('finished populating users');
//     }
//   );
// });