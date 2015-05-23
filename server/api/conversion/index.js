/**
 * Module for handling conversion requests.
 * Initializing the [ConversionController]{@link conversion:controller~ConversionController}
 * and configuring the express router to handle the conversion api
 * for /api/conversions routes. Authentication middleware is added to
 * all requests except the '/' route - where everyone can POST to.
 * Export the configured express router for the conversion api routes
 * @module {express.Router}
 * @requires {request-context}
 * @requires {@link conversion:controller}
 * @requires {@link auth:service}
 */
'use strict';

var router = require('express').Router();
var contextService = require('request-context');
var ConversionController = require('./conversion.controller');
var auth = require('../../lib/auth/auth.service');

// Export the configured express router for the conversion api routes
module.exports = router;

/**
 * The api controller
 * @type {conversion:controller~ConversionController}
 */
var controller = new ConversionController(router);

// add context for auth sensitive resources
var addRequestContext = contextService.middleware('request');

// add the authenticated conversion to the created request context
var addConversionContext = auth.addAuthContext('request:acl.conversion');

// check if the used is authenticated at all
var isAuthenticated = auth.isAuthenticated();

// check if the authenticated conversion has at least the 'admin' role
var isAdmin = auth.hasRole('admin');

// wrap in domain, check authentication and attach conversionInfo object, set conversion request context
router.route('*')
	.all(addRequestContext, isAuthenticated, addConversionContext);

// register conversion routes
router.route('/')
	.get(isAdmin, controller.index)
	.post(isAdmin, controller.create);

// fetch authenticated conversion info
router.route('/me')
	.get(controller.me);

// conversion crud routes
router.route('/' + controller.paramString)
	.get(isAdmin, controller.show)
	.delete(isAdmin, controller.destroy)
	.put(isAdmin, controller.update)
	.patch(isAdmin, controller.update);

// set the password for a conversion
router.route('/' + controller.paramString +  '/password')
	.put(controller.changePassword)
	.patch(controller.changePassword);

// admin only - administrative tasks for a conversion resource (force set password)
router.route('/' + controller.paramString + '/admin')
	.put(isAdmin, controller.setPassword)
	.patch(isAdmin, controller.setPassword);
