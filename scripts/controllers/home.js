'use strict';

/**
 * @ngdoc function
 * @name craftMateApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the craftMateApp
 */
angular.module('craftMateApp')
    .controller('HomeCtrl', function ($scope, $http, $filter, $timeout, $rootScope, $cookieStore, $mdToast, $mdDialog) {
        $scope.bookmarks = $cookieStore.get('bookmarks');

        if (!$scope.bookmarks) {
            $scope.bookmarks = [];
        }

        $scope.history = []
        $scope.recipes = [];
        $scope.searchText;
        $scope.recipe = {};

        //Pagination stuff
        $scope.currentHistoryPage = 0;
        $scope.currentBookmarkPage = 0;
        $scope.pageSize = 5;
        $scope.qH = '';
        $scope.qB = '';

        $scope.getHistory = function () {
            // needed for the pagination calc
            // https://docs.angularjs.org/api/ng/filter/filter
            return $filter('filter')($scope.history, $scope.qH);
        }

        $scope.numberOfHistoryPages = function () {
            return Math.ceil($scope.getHistory().length / $scope.pageSize);
        }

        $scope.getBookmarks = function () {
            // needed for the pagination calc
            // https://docs.angularjs.org/api/ng/filter/filter
            return $filter('filter')($scope.bookmarks, $scope.qB);
        }

        $scope.numberOfBookmarkPages = function () {
                return Math.ceil($scope.getBookmarks().length / $scope.pageSize);
            }
            //End Pagination

        //Recipe Stuff
        $scope.recipeMap = new Array(3);
        for (var i = 0; i < 3; i++) {
            $scope.recipeMap[i] = new Array(3);
        }
        $scope.inputImages = new Array(3);
        for (var i = 0; i < 3; i++) {
            $scope.inputImages[i] = new Array(3);
        }

        $scope.outputImage;
        $scope.outputSprite = 'display:none;';
        $scope.stackSize;
        $scope.recipeName;
        $scope.bookmark = "fa-star-o";

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if ($scope.inputImages[i][j] == "" || !$scope.inputImages[i][j]) {
                    $scope.inputImages[i][j] = 'display: none;';
                }
            }
        }

        var mainInfo = $http.get('recipeList.json').success(function (response) {
            $scope.recipes = response;
        });

        //End Recipe Stuff


        //Bookmark Stuff
        $scope.addToBookmark = function () {
            if ($scope.recipe.name) {
                if ($scope.recipe.name && $scope.recipe.name != "") {
                    if ($scope.bookmarks.length > 0) {
                        if ($scope.bookmarks.indexOf($scope.recipe) < 0) {
                            $scope.bookmarks.unshift($scope.recipe);
                            $cookieStore.put('bookmarks', $scope.bookmarks);
                            $scope.bookmark = "fa-star";

                            $mdToast.show($mdToast.simple({
                                position: "top right"
                            }).textContent('Bookmark Added!'));;
                        }
                    } else {
                        $scope.bookmarks.unshift($scope.recipe);
                        $cookieStore.put('bookmarks', $scope.bookmarks);
                        $scope.bookmark = "fa-star";

                        $mdToast.show($mdToast.simple({
                            position: "top right"
                        }).textContent('Bookmark Added!'));
                    }
                }
            }
        }

        $scope.goToBookmark = function (index) {
            index = index + ($scope.currentBookmarkPage * 5);
            var recipe = $scope.bookmarks[index];
           
            $scope.recipe = recipe;

            $scope.searchText = recipe.name;
            $scope.recipeName = recipe.name;
            $scope.stackSize = recipe.stackSize;
            $scope.recipeMap = recipe.recipeMap;

            if ($scope.isInBookmark($scope.recipe)) {
                $scope.bookmark = "fa-star";
            } else {
                $scope.bookmark = "fa-star-o";
            }

            $scope.inputImages = recipe.inputImages;

            if (recipe.outputImage.includes("background-position")) {
                $scope.outputSprite = recipe.outputImage;
            } else {
                $scope.outputImage = recipe.outputImage;
            }
        }

        $scope.removeBookmark = function (index) {
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete your bookmark?')
                .textContent('You will have to re-add it if you want to bookmark it again.')
                .ariaLabel('Remove Bookmark')
                .ok('Remove')
                .cancel('Keep Bookmark');

            $mdDialog.show(confirm).then(function () {
                //console.log("bookmark removed");
                $scope.bookmarks.splice(index, 1);
                $cookieStore.put('bookmarks', $scope.bookmarks);
                $mdToast.show($mdToast.simple({
                    position: "top right"
                }).textContent('Bookmark Removed'));
            }, function () {
                //console.log("bookmark kept");
            });
        }

        $scope.isInBookmark = function (recipe) {
                for (var i = 0; i < $scope.bookmarks.length; i++) {
                    if ($scope.bookmarks[i].name == recipe.name) {
                        return true;
                    }
                }

                return false;
            }
            //End Bookmark Stuff

        //History Stuff
        $scope.goToHistory = function (index) {
            index = index + ($scope.currentHistoryPage * 5);
            //console.log('Go history' + index);
            var recipe = $scope.history[index].recipe;
            $scope.recipe = recipe;

            $scope.searchText = recipe.name;
            $scope.recipeName = recipe.name;
            $scope.stackSize = recipe.stackSize;
            $scope.recipeMap = recipe.recipeMap;

            if ($scope.isInBookmark($scope.recipe)) {
                $scope.bookmark = "fa-star";
            } else {
                $scope.bookmark = "fa-star-o";
            }

            $scope.inputImages = recipe.inputImages;

            if (recipe.outputImage.includes("background-position")) {
                $scope.outputSprite = recipe.outputImage;
            } else {
                $scope.outputImage = recipe.outputImage;
            }
        }

        $scope.addToHistory = function () {
                if ($scope.recipe.name) {
                    if ($scope.recipe.name && $scope.recipe.name != "") {
                        if ($scope.history.length > 0) {
                            if ($scope.history[0].recipe.name != $scope.recipe.name) {
                                $scope.history.unshift({
                                    id: $scope.history.length - 1,
                                    recipe: $scope.recipe
                                });
                            }
                        } else {
                            $scope.history.unshift({
                                id: $scope.history.length - 1,
                                recipe: $scope.recipe
                            });
                        }
                    }

                    $scope.outputSprite = "display: none;";
                    $scope.outputImage = "";
                    $scope.searchText = '';
                    $scope.stackSize = null;
                    $scope.recipeName = null;
                    $scope.bookmark = "fa-star-o";

                    $scope.inputImages = new Array(3);
                    for (var i = 0; i < 3; i++) {
                        $scope.inputImages[i] = new Array(3);
                    }

                    $scope.recipeMap = new Array(3);
                    for (var i = 0; i < 3; i++) {
                        $scope.recipeMap[i] = new Array(3);
                    }

                    $timeout(function () {
                        $scope.outputSprite = "display: none;";
                        $scope.stackSize = null;

                        $scope.inputImages = new Array(3);
                        for (var i = 0; i < 3; i++) {
                            $scope.inputImages[i] = new Array(3);
                        }
                    }, 10);
                }
            }
            //End History Stuff

        //Autocomplete Stuff
        $scope.querySearch = function (query) {
            var lowercaseQuery = angular.lowercase(query);
            var results = $filter('filter')($scope.recipes, {
                name: query
            });

            //console.log(results);
            return results;
        }

        $scope.selectedItemChange = function (recipe) {
            if (recipe) {
                //console.log(recipe);
                $scope.recipe = recipe;

                $scope.recipeName = recipe.name;
                $scope.stackSize = recipe.stackSize;
                $scope.recipeMap = recipe.recipeMap;
                $scope.inputImages = recipe.inputImages;

                if (recipe.outputImage.includes("background-position")) {
                    $scope.outputSprite = recipe.outputImage;
                } else {
                    $scope.outputImage = recipe.outputImage;
                }

                if ($scope.isInBookmark($scope.recipe)) {
                    $scope.bookmark = "fa-star";
                } else {
                    $scope.bookmark = "fa-star-o";
                }
            }
        }

        //END Autocomplete Stuff

        $scope.$watch('inputImages', function () {
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if ($scope.inputImages[i][j] == "" || !$scope.inputImages[i][j]) {
                        $scope.inputImages[i][j] = 'display: none;';
                    }
                }
            }
        });
    }).filter('startFrom', function () {
        return function (input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    });