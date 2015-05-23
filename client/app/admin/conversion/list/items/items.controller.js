/**
 * @ngdoc controller
 * @name cloudfastApp.admin.conversion.list.items.controller:ConversionItemsController
 * @description
 * Controller of the conversion list items page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the list controller as ConversionItemsController
	 */

	angular
		.module('cloudfastApp.admin.conversion.list.items')
		.controller('ConversionItemsController', ConversionItemsController);


	/**
	 * @ngdoc function
	 * @name cloudfastApp.admin.conversion.list.items.provider:ConversionItemsController
	 * @description
	 * Provider of the {@link cloudfastApp.admin.conversion.list.items.controller:ConversionItemsController ConversionItemsController}
	 *
	 */

	ConversionItemsController.$inject = ['$state', 'Auth'];

	function ConversionItemsController($state, Auth) {
		var vm = this;

		// the selected item id
		var curConversionId = null;

		// check if this item is selected
		vm.isSelected = isSelected;
		// switch to the detail state
		vm.showInDetails = showInDetails;

		/**
		 * @ngdoc function
		 * @name isSelected
		 * @methodOf cloudfastApp.admin.conversion.list.items.controller:ConversionItemsController
		 * @description
		 * Check if the passed item is the current selected item
		 *
		 * @param {Object} conversion The object to check for selection
		 * @returns {Boolean} True if the current selected item is equals the passed item
		 */
		function isSelected(conversion) {
			return curConversionId === conversion._id;
		}

		/**
		 * @ngdoc function
		 * @name showInDetails
		 * @methodOf cloudfastApp.admin.conversion.list.items.controller:ConversionItemsController
		 * @description
		 * Open the detail state with the selected item
		 *
		 * @param {Conversion|Object} conversion The conversion to edit
		 */
		function showInDetails(conversion) {
			curConversionId = conversion._id;
			$state.go('admin.conversion.list.detail', {'id': curConversionId});
		}
	}

})();
