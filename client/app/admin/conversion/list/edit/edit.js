/**
 * @ngdoc overview
 * @name cloudfastApp.admin.conversion.list.edit
 * @description
 * The `cloudfastApp.admin.conversion.list.edit` module which provides:
 *
 * - {@link cloudfastApp.admin.conversion.list.items.controller:ConversionItemsController ConversionItemsController}
 *
 * @requires ui.router
 * @requires ngMaterial
 * @requires ngMessages
 * @requires components/auth
 * @requires components/repeatInput
 * @requires components/toast
 * @requires components/mongooseError
 * @requires components/remoteUnique
 */

(function () {
	'use strict';

	angular
		.module('cloudfastApp.admin.conversion.list.edit', [
			'ui.router',
			'ngMaterial',
			'ngMessages',
			'cloudfastApp.auth',
			'cloudfastApp.repeatInput',
			'cloudfastApp.toast',
			'cloudfastApp.mongooseError',
			'cloudfastApp.remoteUnique'
		])
		.config(configureConversionListEdit);


	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the admin.conversion.list.edit state with the edit template
	 * paired with the ConversionEditController as 'edit' for the
	 * 'detail@admin.conversion.list' view.
	 * 'conversion' is resolved as the conversion with the id found in
	 * the state parameters.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */

	configureConversionListEdit.$inject = ['$stateProvider'];

	function configureConversionListEdit($stateProvider) {
		// The edit state configuration.
		var editState = {
			name: 'admin.conversion.list.edit',
			parent: 'admin.conversion.list',
			url: 'edit/:id',
			authenticate: true,
			role: 'admin',
			onEnter: onEnterConversionListEdit,
			views: {
				'detail@admin.conversion.list': {
					templateUrl: 'app/admin/conversion/list/edit/edit.html',
					controller: 'ConversionEditController',
					controllerAs: 'edit',
					resolve: {conversion: resolveConversionFromArray}
				}
			}
		};

		$stateProvider.state(editState);
	}


	/**
	 * Executed when entering the admin.conversion.list.detail state. Open the component
	 * registered with the component id 'conversion.detailView'.
	 *
	 * @params {$timeout} $timeout - The $timeout service to wait for view initialization
	 * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
	 * @params {Auth} Auth - The auth service to check conversion rights with
	 */

	onEnterConversionListEdit.$inject = ['$timeout', 'ToggleComponent', 'Auth'];

	function onEnterConversionListEdit($timeout, ToggleComponent) {
		$timeout(showDetails, 0, false);

		function showDetails() {
			ToggleComponent('conversion.detailView').open();
		}
	}

	/**
	 * Resolve dependencies for the admin.conversion.list.edit state
	 *
	 * @params {Array} conversions - The array of conversions
	 * @params {$stateParams} $stateParams - The $stateParams to read the conversion id from
	 * @returns {Object|null} The conversion whose value of the _id property equals $stateParams._id
	 */

	resolveConversionFromArray.$inject = ['conversions', '$stateParams', '_'];

	function resolveConversionFromArray(conversions, $stateParams, _) {
		return _.find(conversions, {'_id': $stateParams.id});
	}

})();
