/**
 * @ngdoc controller
 * @name cloudfastApp.admin.conversion.list.edit.controller:ConversionEditController
 * @description
 * Controller of the conversion edit page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the edit controller as ConversionEditController
	 */

	angular
		.module('cloudfastApp.admin.conversion.list.edit')
		.controller('ConversionEditController', ConversionEditController);

	/**
	 * @ngdoc function
	 * @name cloudfastApp.admin.conversion.list.edit.provider:ConversionEditController
	 * @description
	 * Provider of the {@link cloudfastApp.admin.conversion.list.edit.controller:ConversionEditController ConversionEditController}
	 * @param {Service} $state The state service to use
	 * @param {Service} $stateParams The stateParams service to use
	 * @param {Service} Toast The Toast service to use
	 * @param {Service} $mdDialog The mdDialog service to use
	 * @param {Service} Auth The Auth service to use
	 * @param {Service} ConversionService The ConversionService to use
	 * @param {Resource} conversion The conversion data to use
	 */

	ConversionEditController.$inject = ['$state', '$stateParams', 'Toast', '$mdDialog', 'Auth', 'ConversionService', 'conversion'];

	function ConversionEditController($state, $stateParams, Toast, $mdDialog, Auth, ConversionService, conversion) {
		var vm = this;

		// defaults
		vm.conversion = angular.copy(conversion, vm.conversion);
		vm.displayName = conversion.name;

		// view model bindings
		vm.update = update;
		vm.remove = remove;
		vm.goBack = goBack;
		vm.showList = showList;

		/**
		 * Open the detail state with the current conversion
		 *
		 */
		function goBack() {
			$state.go('^.detail', {id: vm.conversion._id});
		}

		/**
		 * Open the conversion list state
		 *
		 */
		function showList() {
			$state.go('^');
		}
		/**
		 * Updates a conversion by using the ConversionService save method
		 * @param {Form} [form]
		 */
		function update(form) {
			// refuse to work with invalid data
			if (!vm.conversion._id || form && !form.$valid) {
				return;
			}

			ConversionService.update(vm.conversion)
				.then(updateConversionSuccess)
				.catch(updateConversionCatch);

			function updateConversionSuccess(updatedConversion) {
				// update the display name after successful save
				vm.displayName = updatedConversion.name;
				Toast.show({text: 'Conversion ' + updatedConversion.name + ' updated'});
				if (form) {
					form.$setPristine();
				}
			}

			function updateConversionCatch(err) {
				Toast.show({
					type: 'warn',
					text: 'Error while updating conversion ' + vm.displayName,
					link: {state: $state.$current, params: $stateParams}
				});

				if (form && err) {
					form.setResponseErrors(err.data);
				}
			}
		}

		/**
		 * Show a dialog to ask the conversion if she wants to delete the current selected conversion.
		 * @param {AngularForm} form - The form to pass to the remove handler
		 * @param {$event} ev - The event to pass to the dialog service
		 */
		function remove(form, ev) {
			var confirm = $mdDialog.confirm()
				.title('Delete conversion ' + vm.displayName + '?')
				.content('Do you really want to delete conversion ' + vm.displayName + '?')
				.ariaLabel('Delete conversion')
				.ok('Delete conversion')
				.cancel('Cancel')
				.targetEvent(ev);

			$mdDialog.show(confirm)
				.then(performRemove);

			/**
			 * Removes a conversion by using the ConversionService remove method
			 * @api private
			 */
			function performRemove() {
				ConversionService.remove(vm.conversion)
					.then(deleteConversionSuccess)
					.catch(deleteConversionCatch);

				function deleteConversionSuccess() {
					Toast.show({type: 'success', text: 'Conversion ' + vm.displayName + ' deleted'});
					vm.showList();
				}

				function deleteConversionCatch(err) {
					Toast.show({
						type: 'warn',
						text: 'Error while deleting conversion ' + vm.displayName,
						link: {state: $state.$current, params: $stateParams}
					});

					if (form && err) {
						form.setResponseErrors(err, vm.errors);
					}
				}
			}
		}

	}
})();
