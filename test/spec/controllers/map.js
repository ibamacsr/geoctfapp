'use strict';

describe('Controller: MapCtrl', function () {

  // load the controller's module
  beforeEach(module('geoCtfApp'));

  var MapCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MapCtrl = $controller('MapCtrl', {
      $scope: scope
    });
  }));

});
