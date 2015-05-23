/**
 * Module for the controller definition of the conversion api.
 * The ConversionController is handling /api/conversions requests.
 * @module {conversion:controller~ConversionController} conversion:controller
 * @requires {@link module:config}
 * @requires {@link ParamController}
 */
'use strict';

var _ = require('lodash');
var ParamController = require('../../lib/controllers/param.controller');
var config = require('../../config');

/**
 * The Conversion model instance
 * @type {conversion:model~Conversion}
 */
var Conversion = require('./conversion.model').model;

exports = module.exports = ConversionController;

/**
 * ConversionController constructor
 * @classdesc Controller that handles /api/conversions route requests
 * for the conversion api.
 * Uses the 'id' parameter and the 'conversion' request property
 * to operate with the [main conversion API Model]{@link conversion:model~Conversion} model.
 * @constructor
 * @inherits ParamController
 * @see conversion:model~Conversion
 */
function ConversionController(router) {
	ParamController.call(this, Conversion, 'id', 'conversionDocument', router);
	this.defaultReturn = 'profile';
}

ConversionController.prototype = {

	/**
	 * Set our own constructor property for instanceof checks
	 * @private
	 */
	constructor: ConversionController,

	/**
	 * Get the authenticated conversion for the current request.
	 * The requested conversion id is read from the conversionInfo parameter of the request object.
	 * @param {IncomingMessage} req - The request message object the conversion object is read from
	 * @param {ServerResponse} res - The outgoing response object
	 * @param {function} next - The next handler function
	 * @returns {ServerResponse} The virtual 'profile' of this conversion or UNAUTHORIZED if no document has been found
	 */
	me: function (req, res, next) {
		if (!req.conversionInfo) {
			return res.unauthorized();
		}

		return res.ok(req.conversionInfo.profile);
	},

	/**
	 * Authentication callback function, redirecting to '/'.
	 * @param {IncomingMessage} req - The request message object
	 * @param {ServerResponse} res - The outgoing response object that is redirected
	 */
	authCallback: function (req, res) {
		res.redirect('/');
	}
};

ConversionController.prototype = _.create(ParamController.prototype, ConversionController.prototype);
