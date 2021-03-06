'use strict';

/**
 * @ngdoc directive
 * @name geoCtfApp.directive:login
 * @description
 * # login
 */
angular.module('geoCtfApp')
  .directive('login', function ($log, $http, Auth, $cookies) {
    return {
      templateUrl: 'views/partials/login.html',
      restrict: 'E',
      // link: function postLink(scope, element, attrs) {
      // },
      controller: function($scope, RestApi, $rootScope, $cookies){

        $rootScope.logout = logout;
        $scope.acessar = acessar;
        $scope.login = {};

        function logout(){
          $rootScope.logged = false;
          Auth.setUser(false, false);
          $cookies.remove('dataUser');
        };


        function base64_encode(data) {
          var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
          var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
            ac = 0,
            enc = '',
            tmp_arr = [];

          if (!data) {
            return data;
          }

          do { // pack three octets into four hexets
            o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++);

            bits = o1 << 16 | o2 << 8 | o3;

            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;

            // use hexets to index into b64, and append result to encoded string
            tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
          } while (i < data.length);

          enc = tmp_arr.join('');

          var r = data.length % 3;

          return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
        }

      	function acessar(obj){

          $scope.error = false;
          $scope.login.carregar = true;

          if(!obj){
            obj = {};
            obj.login = 'null';
            obj.password = 'null';
          } else{
            obj.login = obj.login;
            obj.password = obj.password;
          }

          $scope.obj = obj;

          RestApi.getToken({ username: obj.login, password: obj.password}, 
            function success(data){
              $('#loginModal').modal('hide');

              var dataUser = {};
              dataUser.name = $scope.obj.login;
              dataUser.token = data.token;

              Auth.setUser(dataUser);
              $cookies.put('dataUser', JSON.stringify(dataUser));
              $scope.login.carregar = false;


              $rootScope.logged = true;
            }, function error(data) {
              $rootScope.logged = false;
              $scope.error = true;
              $scope.errorLogin = 'Usu' + String.fromCharCode(225) +'rio ou senha Inv' + String.fromCharCode(225) + 'lidos';
              $scope.login.carregar = false;

            }
          );
          
          $scope.login.carregar = false;
      	};

      }
    };
  });
