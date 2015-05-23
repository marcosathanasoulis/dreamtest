	/**
	 * @ngdoc overview
	 * @name cloudfastApp.admin.user.list.items
	 * @requires ui.router
	 * @requires components/listImage
	 *
	 * @description
	 * The `cloudfastApp.admin.user.list.items` module which provides:
	 *
	 * - {@link cloudfastApp.admin.user.list.items.controller:UserItemsController UserItemsController}
	 */

(function () {
	'use strict';

	angular
		.module('cloudfastApp.admin.user.list.items', [
			'ui.router',
			'cloudfastApp.listImage'
		]);

})();
