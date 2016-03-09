'use strict';

/**
 * @ngdoc overview
 * @name craftMateApp
 * @description
 * # craftMateApp
 *
 * Main module of the application.
 */
angular.module('craftMateApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngMaterial',
    'ui.router'
  ]).config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider.state('app', {
        url: "/",
        abstract: true, //This allows it to be a parent with nested urls
        templateUrl: "views/main.html",
        controller: 'MainCtrl'
    })

    .state('app.home', {
        url: "", //This fills out the home page of the main view of the app with the content
        templateUrl: "views/home.html",
        controller: 'HomeCtrl'
    })

    $urlRouterProvider.otherwise('/');
}).run(function ($rootScope, $state, $http, $location, $window, $timeout, $cookies) {
    $rootScope.openFork = function () {
        var shell = require('shell');
        event.preventDefault();
        shell.openExternal("https://github.com/steveacalabro/CraftMate");
    }
})

.filter('capitalize', function () {
    return function (input, all) {
        return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    }
});