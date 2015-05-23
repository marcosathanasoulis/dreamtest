/**
 * @ngdoc controller
 * @name cloudfastApp.admin.conversion.list.edit.controller:EditPasswordController
 * @description
 * Controller for the edit password dialog
 */

(function () {
	'use strict';

	// register the controller as EditPasswordController
	angular
		.module('cloudfastApp.admin.conversion.list.edit')
		.controller('EditPasswordController', EditPasswordController);


	/**
	 * @ngdoc function
	 * @name cloudfastApp.admin.conversion.list.edit.provider:EditPasswordController
	 * @description
	 * Provider of the {@link cloudfastApp.admin.conversion.list.edit.controller:EditPasswordController EditPasswordController}
	 *
	 * @param {Service} $mdDialog The mdDialog service to use
	 * @param {Service} ConversionService The ConversionService to use
	 * @param {Conversion|Object} conversion The conversion data to use
	 * @param {Service} Toast The Toast service to use
	 * @returns {Service} {@link cloudfastApp.admin.conversion.list.edit.controller:EditPasswordController EditPasswordController}
	 */

	EditPasswordController.$inject = ['$mdDialog', 'ConversionService', 'conversion', 'Toast'];

	function EditPasswordController($mdDialog, ConversionService, conversion, Toast) {
		var vm = this;

		vm.change = changePassword;
		vm.close = closeDialog;
		vm.cancel = cancelDialog;
		vm.conversion = angular.copy(conversion);

		/**
		 * @ngdoc function
		 * @name changePassword
		 * @methodOf cloudfastApp.admin.conversion.list.edit.controller:EditPasswordController
		 * @description
		 * The function to use when submitting the form of the dialog
		 * @param {Form} [form] The form of the edit password dialog to submit from
		 */
		function changePassword(form) {
			if (form && form.$invalid) {
				return;
			}

			ConversionService
				.setPassword(vm.conversion)
				.then(changePasswordSuccess)
				.catch(changePasswordCatch);

			function changePasswordSuccess(savedConversion) {
				// reset the password to avoid display when the dialog opens again
				delete vm.conversion.password;
				vm.close();
				Toast.show({
					type: 'info',
					text: 'Updated password for conversion ' + savedConversion.name
				});
			}

			function changePasswordCatch(err) {
				if (form) {
					form.setResponseErrors(err);
				}
			}
		}

		/**
		 * @ngdoc function
		 * @name closeDialog
		 * @methodOf cloudfastApp.admin.conversion.list.edit.controller:EditPasswordController
		 * @description
		 * Function to close the dialog with
		 */
		function closeDialog() {
			$mdDialog.hide();
		}

		/**
		 * @ngdoc function
		 * @name cancelDialog
		 * @methodOf cloudfastApp.admin.conversion.list.edit.controller:EditPasswordController
		 * @description
		 * Function to cancel the dialog with
		 */
		function cancelDialog() {
			$mdDialog.cancel();
		}
	}

})();
