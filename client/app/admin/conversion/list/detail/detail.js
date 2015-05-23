/**
 * @ngdoc overview
 * @name cloudfastApp.admin.conversion.list.detail
 * @description
 * The `cloudfastApp.admin.conversion.list.detail` module which provides:
 *
 * - {@link cloudfastApp.admin.conversion.list.detail.controller:ConversionDetailController ConversionDetailController}
 *
 * @requires ui.router
 * @requires angularMoment
 * @requires cloudfastApp.auth.conversion
 */
(function () {
	'use strict';

	angular
		.module('cloudfastApp.admin.conversion.list.detail', [
			'ui.router',
			'angularMoment',
			'cloudfastApp.auth.user',
			'ngDreamFactory'
		])
	    .constant('DSP_URL', 'http://api-internal.cloudfast.io')
        .constant('DSP_API_KEY', 'CloudFAST')				
   		.config(['$httpProvider', 'DSP_API_KEY', function ($httpProvider, DSP_API_KEY) {

        // Set default headers for http requests
        $httpProvider.defaults.headers.common["X-DreamFactory-Application-Name"] = DSP_API_KEY;

	    }])
		.config(configureConversionListDetail);


	/**
	 * Route configuration function configuring the passed $stateProvider.
	 * Register the 'conversion.detail' state with the detail template
	 * paired with the ConversionDetailController as 'detail' for the
	 * 'sidenav' sub view.
	 * 'conversion' is resolved as the conversion with the id found in
	 * the state parameters.
	 *
	 * @param {$stateProvider} $stateProvider - The state provider to configure
	 */

	configureConversionListDetail.$inject = ['$stateProvider'];

	function configureConversionListDetail($stateProvider) {
		// The detail state configuration
		var detailState = {
			name: 'admin.conversion.list.detail',
			parent: 'admin.conversion.list',
    		table_name: 'cfConversions',
			onEnter: onEnterConversionListDetail,
			views: {
				'detail@admin.conversion.list': {
					templateUrl: 'app/admin/conversion/list/detail/detail.html',
					controller: 'ConversionDetailController',
					controllerAs: 'detail',
	                resolve: {
	                    conversion: [
	                        'DSP_URL', '$http', function(DSP_URL, $http) {

	                            var requestDataObj = {
	                                include_schema: true, filter: 'userid in ("555d9a89189c4e84a526fddc")'
	                            };

	                            var result = $http.get(DSP_URL + '/rest/system/service', {params: requestDataObj});
								console.log($result);
	                            return result;
	                        }
	                    ]
	                }

				}
			}
		};

		$stateProvider.state(detailState);
	}

	// inject onConversionListDetailEnter dependencies
	onEnterConversionListDetail.$inject = ['$timeout', 'ToggleComponent'];

	/**
	 * Executed when entering the admin.conversion.list.detail state. Open the component
	 * registered with the component id 'conversion.detailView'.
	 *
	 * @params {$timeout} $timeout - The $timeout service to wait for view initialization
	 * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
	 */
	function onEnterConversionListDetail($timeout, ToggleComponent) {
		$timeout(showDetails, 0, false);

		function showDetails() {
			ToggleComponent('conversion.detailView').open();
		}
	}

	// inject resolveConversionFromArray dependencies
	resolveConversionFromArray.$inject = ['conversions', '$stateParams', '_'];

	/**
	 * Resolve dependencies for the conversion.detail state
	 *
	 * @params {Array} conversions - The array of conversions
	 * @params {$stateParams} $stateParams - The $stateParams to read the conversion id from
	 * @returns {Object|null} The conversion whose value of the _id property equals $stateParams._id
	 */
	function resolveConversionFromArray(conversions, $stateParams, _) {
		return _.find(conversions, {'_id': $stateParams.id});
	}

})();
