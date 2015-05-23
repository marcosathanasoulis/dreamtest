/**
 * @ngdoc controller
 * @name cloudfastApp.admin.conversion.list.detail.controller:ConversionDetailController
 * @description
 * Controller for the conversion detail page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the edit controller as ConversionDetailController
	 */
	angular
		.module('cloudfastApp.admin.conversion.list.detail')
		.controller('ConversionDetailController', ConversionDetailController);

	/**
	 * @ngdoc function
	 * @name cloudfastApp.admin.conversion.list.detail.provider:ConversionDetailController
	 * @description
	 * Provider of the {@link cloudfastApp.admin.conversion.list.detail.controller:ConversionDetailController ConversionDetailController}
	 *
	 * @param {Service} $state The state service to use
	 * @param {Conversion|Object} conversion The conversion data to use
	 * @param {Service} Auth The Auth service to use
	 * @returns {Service} {@link cloudfastApp.admin.conversion.list.detail.controller:ConversionDetailController ConversionDetailController}
	 */

	ConversionDetailController.$inject = ['$state', 'conversion', 'Auth'];

	function ConversionDetailController($state, conversion, Auth) {
		var vm = this;

		// switch to the edit state
		vm.edit = edit;
		// switch to the parent state
		vm.goBack = goBack;

		/**
		 * @ngdoc property
		 * @name conversion
		 * @propertyOf cloudfastApp.admin.conversion.list.detail.controller:ConversionDetailController
		 * @description
		 * the current conversion object
		 * @returns {Conversion|Object} the current conversion object
		 */
		vm.conversion = conversion;

		/**
		 * @ngdoc function
		 * @name edit
		 * @methodOf cloudfastApp.admin.conversion.list.detail.controller:ConversionDetailController
		 * @description
		 * Open the edit state with the current conversion
		 */
		function edit() {
			$state.go('^.edit', {'id': vm.conversion._id});
		}

		/**
		 * @ngdoc function
		 * @name goBack
		 * @methodOf cloudfastApp.admin.conversion.list.detail.controller:ConversionDetailController
		 * @description
		 * Return to the parent state
		 */
		function goBack() {
			$state.go('^');
		}
	}
})();
