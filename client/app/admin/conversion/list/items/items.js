	/**
	 * @ngdoc overview
	 * @name cloudfastApp.admin.conversion.list.items
	 * @requires ui.router
	 * @requires components/listImage
	 *
	 * @description
	 * The `cloudfastApp.admin.conversion.list.items` module which provides:
	 *
	 * - {@link cloudfastApp.admin.conversion.list.items.controller:ConversionItemsController ConversionItemsController}
	 */

(function () {
	'use strict';

	angular
		.module('cloudfastApp.admin.conversion.list.items', [
			'ui.router',
			'cloudfastApp.listImage'
		]);

})();
