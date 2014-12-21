/*
 * angular.js file
 */
'use strict';

/* Controllers */

var controllers = angular.module('myApp.controllers', []);

controllers.controller('MyCtrl1', function () {
});


controllers.controller('MyCtrl2', ['$scope', '$location', function ($scope, $location) {
}]);
