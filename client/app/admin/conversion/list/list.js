(function () {
	'use strict';

	/**
	 * Introduce the cloudfastApp.admin.conversion.list module
	 * and configure it.
	 *
	 * @requires ui.router
	 * @requires ngMaterial
	 * @requires {cloudfastApp.socket}
	 * @requires cloudfastApp.mainMenu
	 * @requires components/toggleComponent
	 * @requires cloudfastApp.admin.conversion.list.detail
	 * @requires cloudfastApp.admin.conversion.list.edit
	 * @requires cloudfastApp.admin.conversion.list.items
	 */

	angular
		.module('cloudfastApp.admin.conversion.list', [
			'ngMaterial',
			'ui.router',
			'cloudfastApp.socket',
			'cloudfastApp.mainMenu',
			'cloudfastApp.toggleComponent',
			'cloudfastApp.admin.conversion.list.detail',
			'cloudfastApp.admin.conversion.list.edit',
			'cloudfastApp.admin.conversion.list.items'
		])
		.config(configConversionListRoutes);

	// inject configConversionListRoutes dependencies
	configConversionListRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the conversion.list state with the list template fpr the
	 * 'main' view paired with the ConversionListController as 'list'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configConversionListRoutes($stateProvider, mainMenuProvider) {
		// The list state configuration
		var listState = {
			name: 'admin.conversion.list',
			parent: 'admin.conversion',
			url: '/',
			authenticate: true,
			role: 'admin',
			resolve: {conversions:  resolveConversions},
			views: {

				// target the unnamed view in the conversion state
				'@admin.conversion': {
					templateUrl: 'app/admin/conversion/list/list.html',
					controller: 'ConversionListController',
					controllerAs: 'list'
				},

				// target the content view in the admin.conversion.list state
				'content@admin.conversion.list': {
					templateUrl: 'app/admin/conversion/list/items/items.html',
					controller: 'ConversionItemsController',
					controllerAs: 'items'
				}
			}
		};

		$stateProvider.state(listState);

		mainMenuProvider.addSubMenuItem('admin.main', {
			name: 'Conversions',
			state: listState.name,
			order: Infinity
		});
	}

	// inject resolveConversions dependencies
	resolveConversions.$inject = ['Conversion'];

	/**
	 * Resolve dependencies for the admin.conversion.list state
	 *
	 * @params {Conversion} Conversion - The service to query conversions
	 * @returns {Promise} A promise that, when fullfilled, returns an array of conversions
	 */
	function resolveConversions(Conversion) {
		return Conversion.query().$promise;
	}

})();
