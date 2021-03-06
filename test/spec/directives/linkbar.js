'use strict';

describe('Directive: linkbar', function () {

  // load the directive's module
  beforeEach(module('geoCtfApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<linkbar></linkbar>');
    element = $compile(element)(scope);
  }));
});
