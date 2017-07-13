(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-65742450-2', 'auto');
ga('send', 'pageview');

var app = angular.module('viewCustom', ['angularLoad']);

/**
 * Link library logo to the library homepage.
 */
app.controller('prmLogoAfterController', [function () {
  var vm = this;
  vm.getIconLink = getIconLink;
  function getIconLink() {
    return vm.parentCtrl.iconLink;
  }
}]);

app.component('prmLogoAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'prmLogoAfterController',
  template: '<div class="product-logo product-logo-custom" layout="row" layout-align="start center" layout-fill id="banner" tabindex="0" role="banner"><a href="https://library.smu.edu.sg"><img class="logo-image" alt="{{::(\'nui.header.LogoAlt\'|translate)}}" ng-src="{{$ctrl.getIconLink()}}" /></a></div>'
});

/**
 * Hide mobile keyboard when user uses Enter instead of tapping the search button.
 */
app.directive('ngSubmit', function () {
  return function (scope, element, attr) {
    var inputs = element.find('input');
    element.on('submit', function () {
      inputs[0].focus();
      inputs[0].blur();  /** input loses focus */
    });
  };
});

/**
 * Enable password option for specific patron groups.
 */
app.controller('prmPersonalInfoAfterController', [function () {
  var vm = this;

  vm.formMode = 'View';
  Object.defineProperty(vm, 'actionSection', { get() { return vm.parentCtrl.actionSection; }});
  Object.defineProperty(vm, 'addressSection', { get() { return vm.parentCtrl.addressSection; }});
  Object.defineProperty(vm, 'errorMessages', { get() { return vm.parentCtrl.errorMessages; }});
  Object.defineProperty(vm, 'personalInfo', { get() { return vm.parentCtrl.personalInfo; }});
  Object.defineProperty(vm, 'phoneNumberSection', { get() { return vm.parentCtrl.phoneNumberSection; }});
  Object.defineProperty(vm, 'successMessages', { get() { return vm.parentCtrl.successMessages; }});

  vm.showActionSection = function () {
    return vm.parentCtrl.showActionSection();
  }

  vm.showPasswordSection = function () {
    var allowed_user_groups = ['CORPORATE', 'ILLCHARGE', 'ILLINTL', 'ILLNETWORK', 'ILLRECIP', 'PERSONAL'];
    return vm.parentCtrl.showPasswordSection() && (allowed_user_groups.indexOf(vm.parentCtrl.personalInfoService.jwtUtilService.getDecodedToken().userGroup) !== -1);
  };

  vm.showLoginDialog = function () {
    vm.parentCtrl.showLoginDialog();
  };
}]);

app.component('prmPersonalInfoAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'prmPersonalInfoAfterController',
  template: '<div layout="row" layout-wrap layout-align="center start" style="z-index: 1"><md-card class="default-card card-with-header-actions" flex flex-sm="100" flex-xs="100"><div class="bar success-bar" ng-repeat="msg in $ctrl.successMessages" layout-margin ng-if="$ctrl.successMessages.length > 0" layout="row" layout-align="start center"><span translate="{{msg}}" class="zero-margin"></span></div><div class="bar error-bar" ng-repeat="msg in $ctrl.errorMessages" layout-margin ng-if="$ctrl.errorMessages.length > 0" layout="row" layout-align="start center"><span translate="{{msg}}" class="zero-margin"></span></div><md-card-header class="transparent-toolbar" layout-fill><div class="md-toolbar-tools"><span flex></span></div></md-card-header><md-card-content class="presentable-disabled-inputs animate-form-inputs" layout="row" layout-wrap><div class="card-content-section layout-full-width" layout="row" layout-wrap layout-align="start start"><h4 class="card-content-section-title" layout-fill > <span translate="nui.details.addressSection"></span></h4><div ng-repeat="groupFields in $ctrl.addressSection" class="input-containers-group" flex-xs="100" flex-gt-xs="50" flex-gt-md="33" layout="column"><div layout-margin><md-input-container ng-repeat="field in groupFields" class="underlined-input" layout="column"><label for="prm_{{field.label}}" translate="{{field.label}}"></label><input ng-model="$ctrl.personalInfo[field.name]" type="text" disabled="disabled" ng-disabled="$ctrl.formMode == \'View\' || field.uiType == \'readonly\'"></md-input-container></div></div></div><md-divder class="card-divider margin-bottom-large" layout-margin></md-divder><div class="card-content-section layout-full-width" layout="row" layout-wrap layout-align="start start"><h4 class="card-content-section-title" layout-fill><span translate="nui.details.phoneNumberSection"></span></h4><div ng-repeat="groupFields in $ctrl.phoneNumberSection" class="input-containers-group" flex-xs="100" flex-gt-xs="50" flex-gt-md="50" layout="column"><div layout-margin><md-input-container ng-repeat="field in groupFields" class="underlined-input" layout="column"><label for="prm_{{field.label}}" translate="{{field.label}}"></label><input ng-model="$ctrl.personalInfo[field.name]" type="text" disabled="disabled" ng-disabled="$ctrl.formMode == \'View\' || field.uiType == \'readonly\'"></md-input-container></div></div></div><md-divder ng-if="$ctrl.showActionSection()" class="card-divider margin-bottom-medium" layout-margin></md-divder><div ng-if="$ctrl.showActionSection()" class="card-content-section layout-full-width" layout="row" layout-wrap layout-align="start start"><h4 class="card-content-section-title" layout-fill><span translate="nui.details.actionSection"></span></h4><md-checkbox ng-repeat="cur in $ctrl.actionSection" class="has-small-text zero-margin" ng-model="$ctrl.personalInfo[cur.name]" ng-disabled="$ctrl.formMode == \'View\'" flex="50"><div layout="column"><span translate="{{cur.label}}"></span></div></md-checkbox></div></md-card-content></md-card><md-card class="default-card" flex-sm="100" flex-xs="100"><md-card-content layout="column" layout-align="space-around center"><prm-change-lang label-type="text" layout="column" layout-align="center center"></prm-change-lang><md-divider ng-if="$ctrl.showPasswordSection()" class="card-divider" layout-margin></md-divider><md-button ng-if="$ctrl.showPasswordSection()" class="button-link" aria-label="{{\'nui.aria.account.details.editpassword\' | translate}}" ng-click="$ctrl.showLoginDialog()"><span translate="contact.header.changePassword"></span></md-button></md-card-content></md-card></div>'
});
