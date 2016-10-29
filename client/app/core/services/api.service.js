(function() {
  'use strict';

  angular
    .module('stickMarkerApp')
    .factory('Api', Api) 

    Api.$inject= ['$http', '$httpParamSerializer']
    function Api($http, parmaSerialize){
     const base= 'http://localhost:9000/api/';

     return {
        getArticle: function(articleId) {
          return $http.get(base + 'articles/'+ articleId)
                .then(function (res) { return res.data; }, 
                  function(err) { return err; });
        },
        getArticles: function() {
          return $http.get(base + 'articles')
                .then(function (res) { return res.data; }, 
                  function(err) { return err; });
        },
        createArticle: function(article, status) {
          let data= {
            title: article.title,
            content: article.content,
            is_published: status
          }
          return $http.post(base + 'articles', data)
                .then(function (res) { return res.data; }, 
                  function(err) { return err; });
        },
        updateArticle: function(article, status, articleId) {
          let data= {
            title: article.title,
            content: article.content,
            is_published: status,
            updated_date: new Date(),
            created_date: article.created_date,
            owner: article.owner
          }
          return $http.put(base + 'articles/' + articleId, data)
                .then(function (res) { return res.data; });
        },
        deleteArticle: function(id) {
          return $http.delete(base + 'articles/'+ id)
                .then(function (res) { return res.data; });
        },
        getHistory: function(id) {
          return $http.get(base + 'revisions/'+ id)
                .then(function (res) { console.log(res);
                 return res.data; }, 
                  function(err) { return err; });
        },
        getHistories: function(articleId) {
          return $http.get(base + 'revisions/all/'+ articleId)
              .then(function (res) { 
                return res.data; }
              , function(error) { return error});
        },
        getVersions: function(articleId) {
          return $http.get(base + 'revisions/all/versions/'+ articleId)
              .then(function (res) { 
                return res.data; }
              , function(error) { return error});
        },
        createHistory: function(article) {
          let data= {
            title : article.title,
            content : article.content,
            articleId : article._id,
            isPublish: article.isPublish
          }
          return $http.post(base + 'revisions', data)
                .then(function (res) { return res.data; });
        },
        updateHistory: function() {
          return $http.put(base + 'revisions')
                .then(function (res) { return res.data; });
        },
        deleteHistory: function(id) {
          return $http.delete(base + 'revisions/'+ id)
                .then(function (res) { return res.data; });
        }
     }
     
    }
})()