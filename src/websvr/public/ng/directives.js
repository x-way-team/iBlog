/*
 * angular.js file
 */
'use strict';

/* Directives */

var directives = angular.module('myApp.directives', []);
directives.directive('appVersion', [ 'version', function(version) {
	return function(scope, elm, attrs) {
		elm.text(version);
	};
} ]);
