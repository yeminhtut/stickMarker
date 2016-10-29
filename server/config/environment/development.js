'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    //uri: 'mongodb://localhost/stickmarker-dev'
    uri : 'mongodb://yemin:yemin123@ds137207.mlab.com:37207/stick-marker'
  },

  seedDB: true
};

// module.exports = {
// 	'port': process.env.PORT || 8080,
// 	'database': 'mongodb://yemin:yemin123@apollo.modulusmongo.net:27017/toBa8nuq',
// 	'secret': 'iamsuperscret'
// };