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
