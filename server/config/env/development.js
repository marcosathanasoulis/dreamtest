'use strict';

process.env.DATABASE_NAME = process.env.DATABASE_NAME || 'cloudfast-dev';

module.exports = {

	mongo: {
		uri: 'mongodb://localhost/' + process.env.DATABASE_NAME
	},

	seedDB: true
};
