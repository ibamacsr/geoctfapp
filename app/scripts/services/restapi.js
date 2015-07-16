'use strict';

/**
 * @ngdoc service
 * @name geoCtfApp.RestApi
 * @description
 * # RestApi
 * Service in the geoCtfApp.
 */
angular.module('geoCtfApp')
  .factory('RestApi', function ($resource) {
    // return $resource('//' + window.location.hostname + window.location.pathname + '/moduleGeoCTF.php?:type', {},
    return $resource('http://10.1.8.178:8000/api/:type/?:subtype', {type: '@type', subtype: '@subtype'},
      {
        get: {
          method:'GET',
          isArray: true,
          headers: {
            'Content-Type': 'application/json'
          },
        },
        getObject: {
          method:'GET',
          params:{ format:'json' },
          headers: {
            'Content-Type': 'application/json'
          },
        },
        getMunicipios: {
          url: 'http://10.1.8.178:8000/api/:type/:estado',
          method:'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        },
        getPoints: {
          url: 'http://10.1.8.178:8000/api/atividades/:municipio/:categoria',
          method:'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        },
        post: {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },

          isArray: true,
        },
      },
      {stripTrailingSlashes: false}
    );
  });



