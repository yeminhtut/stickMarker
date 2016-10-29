/* global io */
'use strict';

angular.module('stickMarkerApp')
  .factory('socket', function(socketFactory) {

    let ioSocket = io('', {
      path: '/socket.io-client'
    });

    let socket = socketFactory({
      ioSocket: ioSocket
    });

    return {
      socket: socket,
      syncUpdates: function (modelName, array, cb) {
        cb = cb || angular.noop;
        socket.on(modelName + ':save', function (item) {
          let oldItem = _.find(array, {_id: item._id});
          let index = array.indexOf(oldItem);
          let event = 'created';
          if (oldItem) {
            array.splice(index, 1, item);
            event = 'updated';
          } else {
            array.push(item);
          }

          cb(event, item, array);
        });
        socket.on(modelName + ':remove', function (item) {
          let event = 'deleted';
          _.remove(array, {_id: item._id});
          cb(event, item, array);
        });
      },
      syncArticleUpdate: function (modelName, updateData, cb) {
        cb = cb || angular.noop;
        socket.on(modelName + ':edit', function (item) {
          console.warn(item);
          let event= 'pushed';
          cb(event, updateData+ 'haha');
        });
        socket.on(modelName + ':remove', function (item) {
          let event = 'deleted';
          _.remove(array, {_id: item._id});
          cb(event, item, array);
        });
      },
      unsyncUpdates: function (modelName) {
        socket.removeAllListeners(modelName + ':save');
        socket.removeAllListeners(modelName + ':remove');
      }
    };
  });
