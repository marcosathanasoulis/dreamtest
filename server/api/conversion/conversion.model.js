/**
 * An module for defining and initializing the Conversion model.
 * Exporting the Conversion model definition, schema and model instance.
 * @module {Object} conversion:model
 * @property {Object} definition - The [definition object]{@link conversion:model~ConversionDefinition}
 * @property {Schema} schema - The [mongoose model schema]{@link conversion:model~ConversionSchema}
 * @property {Model} model - The [mongoose model]{@link conversion:model~Conversion}
 */
'use strict';

var mongoose = require('mongoose');
var MongooseError = require('mongoose/lib/error');
var crypto = require('crypto');
var requestContext = require('mongoose-request-context');
var createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin;
var auth = require('../../lib/auth/auth.service');

var Schema = mongoose.Schema;

/**
 * The Conversion model definition
 * @type {Object}
 * @property {String} name - The name of this conversion
 * @property {String} role - The role of this conversion, defaults to 'conversion'
 * @property {String} info - Information and notes about this conversion
 * @property {Boolean} active - Flag indicating this conversion is active
 * @property {String} hashedPassword - The hashed password of this conversion
 * @property {String} provider - The authentication provider used by this conversion account
 * @property {String} salt - Salt used to build the password
 */
var ConversionDefinition = {
	name: {type: String, required: true},
	info: String,
	active: Boolean,
	provider: String,
};

/**
 * The Conversion model schema
 * @type {Schema}
 */
var ConversionSchema = new Schema(ConversionDefinition);

/*
 * Virtual definitions
 */


/**
 * Virtual 'profile'
 * Public profile information
 * @memberOf ConversionSchema
 */
ConversionSchema
	.virtual('profile')
	.get(getProfile);

/**
 * Virtual 'token'
 * Non-sensitive info we'll be putting in the token
 * @memberOf ConversionSchema
 */
ConversionSchema
	.virtual('token')
	.get(getToken);

/**
 * Validations
 */

// Validate conversionname is not taken
ConversionSchema
	.path('name')
	.validate(validateUniqueName, 'The specified conversionname is already in use.');

/**
 * Additional instance methods
 */


/**
 * Static methods
 */

/**
 * Attach pre hook plugins
 */
ConversionSchema.plugin(requestContext, {
	propertyName: 'modifiedBy',
	contextPath: 'request:acl.conversion.name'
});

/**
 * Attach pre-save and pre-remove hooks
 *
 * @api private
 */
ConversionSchema
	.pre('save', preSave)
	.pre('remove', preRemove);

/**
 * Attach post hook plugins
 */
ConversionSchema.plugin(createdModifiedPlugin);

/**
 * Return the value of the virtual profile property
 *
 * @api private
 * @returns {{_id: *, name: *, prename: *, surname: *, email: *, active: *, role: *, info: *}}
 */
function getProfile() {
	// jshint validthis: true
	return {
		'_id': this._id,
		'name': this.name,
		'active': this.active,
		'info': this.info
	};
}

/**
 * Return the value of the virtual token property
 *
 * @api private
 * @returns {{_id: *, role: *}}
 */
function getToken() {
	// jshint validthis: true
	return {
		'_id': this._id,
	};
}


/**
 * Check existence and length of the given value.
 *
 * @api private
 * @param {String} value - The value to check
 * @returns {Boolean} True if a value with a truthy length property is given
 */
function validatePresenceOf(value) {
	return value && value.length;
}

/**
 * Validate the uniqueness of the given conversionname
 *
 * @api private
 * @param {String} value - The conversionname to check for uniqueness
 * @param {Function} respond - The callback function
 */
function validateUniqueName(value, respond) {
	// jshint validthis: true
	var self = this;

	// check for uniqueness of conversion name
	this.constructor.findOne({name: value}, function (err, conversion) {
		if (err) {
			throw err;
		}

		if (conversion) {
			// the searched name is my name or a duplicate
			return respond(self.id === conversion.id);
		}

		respond(true);
	});
}


/**
 * Pre save hook for the Conversion model. Validates the existence of the
 * hashedPassword property if the document is saved for the first time.
 * Ensure that only the root conversion can update itself.
 *
 * @api private
 * @param {Function} next - The mongoose middleware callback
 * @returns {*} If an error occurs the passed callback with an Error as its argument is called
 */
function preSave(next) {
	// jshint validthis: true
	var self = this;

	// normal conversion update
	return next();
}

/**
 * Pre remove hook for the Conversion model.
 * Validates that the root conversion cannot be deleted.
 *
 * @api private
 * @param {Function} next - The mongoose middleware callback
 * @returns {*} If an error occurs the passed callback with an Error as its argument is called
 */
function preRemove(next) {

	return next();
}

module.exports = {

	/**
	 * The Conversion model definition object
	 * @type {Object}
	 * @see conversion:ConversionModel~ConversionDefinition
	 */
	definition: ConversionDefinition,

	/**
	 * The Conversion model schema
	 * @type {Schema}
	 * @see conversion:model~ConversionSchema
	 */
	schema: ConversionSchema,

	/**
	 *  The registered mongoose model instance of the Conversion model
	 *  @type {Conversion}
	 */
	model: mongoose.model('Conversion', ConversionSchema)
};
