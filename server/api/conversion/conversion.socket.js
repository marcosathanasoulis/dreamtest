/**
 * Module for registering broadcast updates to clients when
 * the Conversion model changes. Exports the Exports the
 * [register function]{@link conversion:socket~registerConversionSockets}
 * to register the model schema events on the socket instance.
 * @module {function} conversion:socket
 * @requires {@link conversion:model~Conversion}
 */
'use strict';

/**
 * The Conversion model instance
 * @type {conversion:model~Conversion}
 */
var Conversion = require('./conversion.model').model;

// export the function to register all socket broadcasts
exports.register = registerConversionSockets;

/**
 * Register Conversion model change events on the passed socket
 * @param {socket.io} socket - The socket object to register the Conversion model events on
 */
function registerConversionSockets(socket) {
	Conversion.schema.post('save', function (doc) {
		onSave(socket, doc);
	});

	Conversion.schema.post('remove', function (doc) {
		onRemove(socket, doc);
	});
}

/**
 * Emit a Conversion save event on a socket object: 'conversion:save'
 * @param {socket.io} socket - The socket object to emit the Conversion save event on
 * @param {MogooseDocument} doc - The saved document that triggered the event
 * @param {function} cb - The callback function
 */
function onSave(socket, doc, cb) {
	socket.emit('conversion:save', doc);
}

/**
 * Emit a Conversion remove event on a socket object: 'conversion:remove'
 * @param {socket.io} socket - The socket object to emit the Conversion remove event on
 * @param {MogooseDocument} doc - The removed document that triggered the event
 * @param {function} cb - The callback function
 */
function onRemove(socket, doc, cb) {
	socket.emit('conversion:remove', doc);
}
