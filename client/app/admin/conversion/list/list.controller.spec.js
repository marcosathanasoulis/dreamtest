'use strict';

describe('Controller: ConversionListController', function () {

	// load the controller's module
	beforeEach(module('cloudfastApp.admin.conversion.list'));
	beforeEach(module('socketMock'));

	var controller;
	var conversions;
	var scope;
	var socket;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope, _socket_) {
		scope = $rootScope.$new();
		conversions = [{name: 'admin'}, {name: 'testconversion'}];
		socket = _socket_;
		controller = $controller('ConversionListController', {
			conversions: conversions,
			$scope: scope,
			socket: socket
		});
	}));

	it('object should exist', function () {
		Should.exist(controller);
		controller.should.be.an.instanceof(Object);
	});

	it('conversions should exist', function () {
		Should.exist(controller.conversions);
		controller.conversions.should.be.eql(conversions);
	});
});
