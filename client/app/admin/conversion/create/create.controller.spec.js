/**
 * @ngdoc controller
 * @name cloudfastApp.admin.conversion.create.controller:ConversionCreateController
 * @description
 * Controller of the conversion create page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the create controller as ConversionCreateController
	 */

	angular
		.module('cloudfastApp.admin.conversion.create')
		.controller('ConversionCreateController', ConversionCreateController);

	/**
	 * @ngdoc function
	 * @name cloudfastApp.admin.conversion.create.provider:ConversionCreateController
	 * @description
	 * Provider of the {@link cloudfastApp.admin.conversion.create.controller:ConversionCreateController ConversionCreateController}
	 *
	 * @param {Service} Auth The Auth service to use
	 * @param {Service} Conversion The Conversion service to use
	 * @param {Service} Toast The Toast service to use
	 * @param {Service} $mdDialog The mdDialog service to use
	 * @returns {Service} {@link cloudfastApp.admin.conversion.create.controller:ConversionCreateController ConversionCreateController}
	 */

	ConversionCreateController.$inject = ['$mdDialog', 'Auth', 'Conversion', 'Toast'];

	function ConversionCreateController($mdDialog, Auth, Conversion, Toast) {
		var vm = this;

	
		/**
		 * @ngdoc property
		 * @name conversion
		 * @propertyOf cloudfastApp.admin.conversion.create.controller:ConversionCreateController
		 * @description
		 * The new conversion data
		 *
		 * Defaults:
		 * - active	=	true
		 * @returns {Conversion} Conversion data
		 */
		vm.conversion = new Conversion({active: true});

		// view model bindings (documented below)
		vm.create = createConversion;
		vm.close = hideDialog;
		vm.cancel = cancelDialog;

		/**
		 * @ngdoc function
		 * @name create
		 * @methodOf cloudfastApp.admin.conversion.create.controller:ConversionCreateController
		 * @description
		 * Create a new conversion by using the ConversionService create method
		 *
		 * @param {form} [form] The form to gather the information from
		 */
		function createConversion(form) {
			// refuse to work with invalid data
			if (vm.conversion._id || (form && !form.$valid)) {
				return;
			}

			Auth.createConversion(vm.conversion)
				.then(createConversionSuccess)
				.catch(createConversionCatch);

			function createConversionSuccess(newConversion) {
				Toast.show({
					type: 'success',
					text: 'Conversion ' + newConversion.name + ' has been created',
					link: {state: 'admin.conversion.list.detail', params: {id: newConversion._id}}
				});
				vm.close();
			}

			function createConversionCatch(err) {
				if (form && err) {
					form.setResponseErrors(err);
				}

				Toast.show({
					type: 'warn',
					text: 'Error while creating conversion'
				});
			}
		}

		/**
		 * @ngdoc function
		 * @name hide
		 * @methodOf cloudfastApp.admin.conversion.create.controller:ConversionCreateController
		 * @description
		 * Hide the dialog
		 */
		function hideDialog() {
			$mdDialog.hide();
		}

		/**
		 * @ngdoc function
		 * @name cancel
		 * @methodOf cloudfastApp.admin.conversion.create.controller:ConversionCreateController
		 * @description
		 * Cancel the dialog
		 */
		function cancelDialog() {
			$mdDialog.cancel();
		}
	}
})();
