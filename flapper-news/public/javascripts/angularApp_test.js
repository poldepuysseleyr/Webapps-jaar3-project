describe("angular", function() {
  // Aanmaken van lokale var
   var $controller;
   var $scope;
   var $httpBackend, $http;
   var posts;
    beforeEach(function() {
        module('flapperNews');
        //Posts in controllers dit object laten gebruiken
        module(function($provide) {
          $provide.value('posts', {
            posts : [{id: '34kd34', title: 'testpost', comments: [{id: 'comment1',body: 'tekst', upvotes: 10}],upvotes: 10, text:"Latijn"}],
            upvote : function(post) {
              post.upvotes += 1;
            },
            downvote: function(post){
              post.upvotes += -1;
            },
            create: function(post) {
              this.posts.push(post);
            },
            upvoteComment : function(post,comment){
              post.comments.get(comment).upvotes += 1;
            },
            downvoteComment : function(post,comment){
              post.comments.get(comment).upvotes -= 1;
            }
          });
        });
        inject(function(_posts_) {
          posts = _posts_.posts;
        });
        inject(function(_$http_) {
          $http = _$http_;
        });
        inject(function(_$httpBackend_) {
          $httpBackend = _$httpBackend_;
          $httpBackend.when('GET','http://localhost/test').respond(200, {name: 'rudy'});
          $httpBackend.when('GET','/posts').respond(200, {name: 'rudy'});

          /*
          Vanaf angular 1.5
          $httpBackend.whenRoute('GET', '/posts/:post/upvote').respond(function(method, url, data, headers, params){

          });
          $httpBackend.expect('GET', 'http://post/1');
          $httpBackend.expect('GET', 'http://post/2');
          $httpBackend.expect('GET', 'http://post/3');
          */

          $httpBackend.when('GET', /\/posts\/(.+)/).respond(function(method, url, data, headers) {
            var args = url.match(/\/posts\/(.+)/);
            for (i in posts) {
              if (posts[i].id === args[1]) {
                return [200, {post: posts[i]}];
              }
            }
            return [400, {}]; // args[1] is de waarde tussen de haakjes in de reguliere expressie
          });

          $httpBackend.when('PUT', /\/posts\/(.+)\/upvote/).respond(function(method, url, data, headers,params) {
            for (i in posts) {
              if (posts[i].id) {
                posts[i].upvotes += 1;
                return [200, {post: posts[i]}];
              }
            }
            return [400, {}]; // args[1] is de waarde tussen de haakjes in de reguliere expressie
          });



        });
        // Injecteren van onze controller wanneer de andere wordt aangemaakt
        inject(function(_$controller_) {
          $controller = _$controller_;
        });
        //Wanneer de rootScope wordt aangemaakt, maak dan de scope (injecteer onze scope)
        inject(function($rootScope) {
          $scope = $rootScope.$new();
        });

    });
    afterEach(function() { // Altijd plaatsen zodat alle calls die niet werden beantwoord errors geven
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    })
    it("module", function() {
      var ctrl = $controller('MainController', {$scope : $scope});
      var post = { id: "34kd34" , title : 'test', upvotes: 4 , text:'latijn'};
      //ctrl.incrementUpvotes(post);

      // var nrPosts = ctrl.posts.length;
      // ctrl.title = 'google';
      // ctrl.link = 'google';
      // ctrl.text = 'google';
      // ctrl.addPost();

      //
      $http.get('http://localhost/test').success(function(data, status, header, config){
        ctrl.valid = true;
        ctrl.name = data.name;
      });

      $http.get('/posts/34kd34').success(function(data, status, header, config){
        ctrl.post = data.post;
      });

      $http.put('/posts/34kd34/upvote').success(function(data, status, header, config){
        ctrl.post = data.post;
      });



      $httpBackend.flush(); //Verwerken van alle httpcalls (assynchroon faken)
      // expect(ctrl.posts.length).toBe(nrPosts + 1);
      expect(ctrl.post.upvotes).toBe(11);



      expect(ctrl.valid).toBe(true);
      expect(ctrl.name).toEqual('rudy');
      expect(ctrl.post.id).toEqual('34kd34');
    });
});
