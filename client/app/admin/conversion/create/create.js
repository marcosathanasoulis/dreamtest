/**
 * @ngdoc overview
 * @name cloudfastApp.admin.conversion.create
 * @description
 * The `cloudfastApp.admin.conversion.create` module which provides
 *
 * - {@link cloudfastApp.admin.conversion.create.controller:ConversionCreateController ConversionCreateController}
 *
 * @requires ui.router
 * @requires ngMaterial
 * @requires ngMessages
 * @requires components/auth
 * @requires components/toast
 * @requires components/remoteUnique
 */

(function () {
	'use strict';

	angular
		.module('cloudfastApp.admin.conversion.create', [
			'ui.router',
			'ngMessages',
			'ngMaterial',
			'cloudfastApp.auth',
			'cloudfastApp.toast',
			'cloudfastApp.remoteUnique',
			'cloudfastApp.mongooseError'
		])
		.config(configureConversionCreateRoutes);

	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the global create-conversion state with the edit template
	 * paired with the ConversionCreateController as 'create'.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */

	configureConversionCreateRoutes.$inject = ['$stateProvider'];

	function configureConversionCreateRoutes($stateProvider) {
		var  createListState = {
			name: 'admin.conversion.list.create',
			parent: 'admin.conversion.list',
			url: 'create',
			authenticate: true,
			role: 'admin',
			onEnter: onEnterConversionListCreateView
		};

		$stateProvider.state(createListState);
	}


	/**
	 * Function executed when entering the admin.conversion.create state.
	 * Open the create dialog
	 */

	onEnterConversionListCreateView.$inject = ['$rootScope', '$state', '$mdDialog'];

	function onEnterConversionListCreateView($rootScope, $state, $mdDialog) {
		var unregisterListener = $rootScope.$on('$stateChangeStart', onStateChange);

		$mdDialog.show({
			controller: 'ConversionCreateController',
			controllerAs: 'create',
			templateUrl: 'app/admin/conversion/create/create.html',
			clickOutsideToClose: false
		}).then(transitionTo, transitionTo);

		/**
		 * Function executed when resolving or rejecting the
		 * dialog promise.
		 *
		 * @param {*} answer - The result of the dialog callback
		 * @returns {promise}
		 */
		function transitionTo(answer) {
			return $state.transitionTo('admin.conversion.list');
		}

		/**
		 * Function executed when changing the state.
		 * Closes the create dialog
		 */
		function onStateChange() {
			unregisterListener();
			$mdDialog.hide();
		}
	}

})();
