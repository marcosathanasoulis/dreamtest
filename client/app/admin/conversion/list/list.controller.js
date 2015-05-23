(function () {
	'use strict';

	/**
	 * Register the list controller as ConversionListController
	 */
	angular
		.module('cloudfastApp.admin.conversion.list')
		.controller('ConversionListController', ConversionListController);

	// add ConversionListController dependencies to inject
	ConversionListController.$inject = ['conversions', '$state', 'ToggleComponent', '$scope', 'socket'];

	/**
	 * ConversionListController constructor
	 *
	 * @param {Array} conversions - The list of conversions resolved for this route
	 * @param {$state} $state - The $state to activate routing states on
	 * @param {ToggleComponent} ToggleComponent - The toggle component service for switching the detail view
	 */
	function ConversionListController(conversions, $state, ToggleComponent , $scope, socket) {
		var vm = this;

		// the array of conversions
		vm.conversions = conversions;
		// toggle detail view
		vm.toggleDetails = toggleDetails;

		// initialize the controller
		activate();


		/**
		 * Toggle the detail view
		 */
		function toggleDetails() {
			ToggleComponent('conversion.detailView').toggle();
		}
	}

})();
