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
