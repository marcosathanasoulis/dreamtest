(function () {
	'use strict';

	/**
	 * Introduce the cloudfastApp.conversion module
	 * and configure it.
	 *
	 * @requires ngResource
	 * @requires ui.router
	 * @requires {cloudfastApp.admin.conversion.list}
	 * @requires {cloudfastApp.admin.conversion.create}
	 */
	angular
		.module('cloudfastApp.admin.conversion', [
			'ngResource',
			'ui.router',
			'cloudfastApp.admin.conversion.list',
			'cloudfastApp.admin.conversion.create'
		])
		.config(configConversionRoutes);

	// inject configConversionRoutes dependencies
	configConversionRoutes.$inject = ['$urlRouterProvider', '$stateProvider'];

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the abstract conversion state with the conversion template
	 * paired with the ConversionController as 'index'.
	 * The injectable 'conversions' is resolved as a list of all conversions
	 * and can be injected in all sub controllers.
	 *
	 * @param {$urlRouterProvider} $urlRouterProvider - The URL router provider to redirect to the main state
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */
	function configConversionRoutes($urlRouterProvider, $stateProvider) {
		// The conversion state configuration
		var conversionState = {
			name: 'admin.conversion',
			parent: 'admin',
			url: '/conversion',
			abstract: true,
			templateUrl: 'app/admin/conversion/conversion.html',
			controller: 'ConversionController',
			controllerAs: 'index'
		};

		$urlRouterProvider.when('/admin/conversion', '/admin/conversion/');
		$stateProvider.state(conversionState);
	}

})();
