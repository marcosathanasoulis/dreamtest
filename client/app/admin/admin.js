(function () {
	'use strict';

	// register the route config on the application
	angular
		.module('cloudfastApp.admin', [
			'ui.router',
			'cloudfastApp.admin.main',
			'cloudfastApp.admin.user',
			'cloudfastApp.admin.conversion',
			'cloudfastApp.mainMenu'
		])
		.config(configAdminRoute);

	// inject configAdminRoute dependencies
	configAdminRoute.$inject = ['$urlRouterProvider', '$stateProvider'];

	// route config function configuring the passed $stateProvider
	function configAdminRoute($urlRouterProvider, $stateProvider) {
		var adminState = {
			name: 'admin',
			url: '/admin',
			abstract: true,
			templateUrl: 'app/admin/admin.html',
			controller: 'AdminController',
			controllerAs: 'vm'
		};

		$urlRouterProvider.when('/admin', '/admin/');
		$stateProvider.state(adminState);
	}

})();
