/*jshint -W030 */
'use strict';

describe('Controller: ConversionEditController', function () {

	// load the controller's module
	beforeEach(module('cloudfastApp.admin.conversion.list'));

	var controller;
	var conversion;

	var stateSpy;
	var dialogSpy;
	var updateServiceSpy;
	var removeServiceSpy;

	// simple mock for the ConversionService
	var conversionServiceMock = {update: noop, remove: noop};

	// simple mock to gesture the return of a promise
	var promiseMock = {
		then: function (cb) {
			cb(conversion);
			return {catch: noop};
		}
	};

	function noop() {}

	// Setup some states to test the navigation functions
	beforeEach(inject(function ($state, $mdDialog) {
		conversion = {_id: '1337id', name: 'wintest'};
		stateSpy = sinon.stub($state, 'go');
		dialogSpy = sinon.stub($mdDialog, 'show').returns(promiseMock);
		updateServiceSpy = sinon.stub(conversionServiceMock, 'update').returns(promiseMock);
		removeServiceSpy = sinon.stub(conversionServiceMock, 'remove').returns(promiseMock);
	}));

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller) {
		controller = $controller('ConversionEditController', {
			conversion: conversion,
			ConversionService: conversionServiceMock
		});
	}));

	afterEach(function () {
		conversionServiceMock.update.restore();
		conversionServiceMock.remove.restore();
	});

	it('object should exist', function () {
		Should.exist(controller);
		controller.should.be.an.instanceof(Object);
	});

	it('should have a conversion property which is the current conversion', function () {
		Should.exist(controller.conversion);
		controller.conversion
			.should.be.an.Object
			.and.eql(conversion);
	});

	it('should have a display property which equals the conversions name', function () {
		Should.exist(controller.displayName);
		controller.displayName
			.should.be.a.String
			.and.eql(conversion.name);
	});

	it('should have a method to navigate to the parent state', function () {
		Should.exist(controller.showList);
		controller.showList.should.be.a.Function;
		controller.showList();
		stateSpy.calledOnce.should.be.ok;
		stateSpy.withArgs('^').called.should.be.ok;
	});

	it('should have a method to navigate to the detail state', function () {
		Should.exist(controller.showList);
		controller.goBack.should.be.a.Function;
		controller.goBack();
		stateSpy.calledOnce.should.be.ok;
		stateSpy.withArgs('^.detail').called.should.be.ok;
	});

	it('should have a method to update the conversion', function () {
		Should.exist(controller.update);
		controller.update.should.be.a.Function;
	});

	it('should call the conversion service to update', function () {
		controller.update();
		updateServiceSpy.calledOnce.should.be.ok;
		updateServiceSpy.withArgs(conversion).called.should.be.ok;
	});

	it('should have a method to remove the conversion', function () {
		Should.exist(controller.remove);
		controller.remove.should.be.a.Function;
	});

	it('should show a confirm dialog when deleting the conversion', function () {
		controller.remove();
		dialogSpy.calledOnce.should.be.ok;
		removeServiceSpy.calledOnce.should.be.ok;
		removeServiceSpy.withArgs(conversion).called.should.be.ok;
	});

});
