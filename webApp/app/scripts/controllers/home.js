'use strict';

/**
 * @ngdoc function
 * @name craftMateApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the craftMateApp
 */
angular.module('craftMateApp')
.controller('HomeCtrl', function ($scope, $http, $filter, $timeout, $rootScope, $cookieStore, $mdToast) {
	$scope.bookmarks = $cookieStore.get('bookmarks');
	if(!$scope.bookmarks) {
		$scope.bookmarks = [];
	}

	$scope.history = []
	$scope.recipes = [];
	$scope.searchText;
	$scope.page = 0;

	$scope.recipe = {};


	//Recipe Stuff
	$scope.recipeMap = new Array(3);
	for(var i = 0; i < 3; i++) {
		$scope.recipeMap[i] = new Array(3);
	}
	$scope.inputImages = new Array(3);
	for(var i = 0; i < 3; i++) {
		$scope.inputImages[i] = new Array(3);
	}
	$scope.outputImage;
	$scope.outputSprite = 'display:none;';
	$scope.stackSize;
	$scope.recipeName;
	$scope.bookmark = "fa-star-o";

	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 3; j++) {
			if($scope.inputImages[i][j] == "" || !$scope.inputImages[i][j]) {
				$scope.inputImages[i][j] = 'display: none;';
			}
		}
	}

	var mainInfo = $http.get('recipeList.json').success(function(response) {
        $scope.recipes = response;
    });

	$scope.addToBookmark = function() {
		if($scope.recipe.name) {
	    	if($scope.recipe.name && $scope.recipe.name != "") {
	    		if($scope.bookmarks.length > 0) {
	    			if($scope.bookmarks.indexOf($scope.recipe) < 0) {
	    				$scope.bookmarks.unshift($scope.recipe);
	    				$cookieStore.put('bookmarks', $scope.bookmarks);
						$scope.bookmark = "fa-star";

						$mdToast.show($mdToast.simple({position: "top right"}).textContent('Bookmark Added!'));;
	    			}
	    		} else {
	    			$scope.bookmarks.unshift($scope.recipe);
	    			$cookieStore.put('bookmarks', $scope.bookmarks);
					$scope.bookmark = "fa-star";

					$mdToast.show($mdToast.simple({position: "top right"}).textContent('Bookmark Added!'));
	    		}
	    	}
		}
	}

	$scope.goToBookmark = function(index) {
		index = index + ($scope.page * 5);
		//console.log('Go history' + index);
		var recipe = $scope.bookmarks[index];
		$scope.recipe = recipe;

		$scope.searchText = recipe.name;
		$scope.recipeName = recipe.name;
		$scope.stackSize = recipe.stackSize;
		$scope.recipeMap = recipe.recipeMap;

		if($scope.isInBookmark($scope.recipe)) {
			$scope.bookmark = "fa-star";
		} else {
			$scope.bookmark = "fa-star-o";
		}

		$scope.inputImages = recipe.inputImages;
		
		if(recipe.outputImage.includes("background-position")) {
			$scope.outputSprite = recipe.outputImage;
		} else {
			$scope.outputImage = recipe.outputImage;
		}
	}

	$scope.pageChangeHandler = function (num) {
        $scope.page = num - 1;
    };

	$scope.goToHistory = function(index) {
		index = index + ($scope.page * 5);
		//console.log('Go history' + index);
		var recipe = $scope.history[index].recipe;
		$scope.recipe = recipe;

		$scope.searchText = recipe.name;
		$scope.recipeName = recipe.name;
		$scope.stackSize = recipe.stackSize;
		$scope.recipeMap = recipe.recipeMap;

		if($scope.isInBookmark($scope.recipe)) {
			$scope.bookmark = "fa-star";
		} else {
			$scope.bookmark = "fa-star-o";
		}

		$scope.inputImages = recipe.inputImages;
		
		if(recipe.outputImage.includes("background-position")) {
			$scope.outputSprite = recipe.outputImage;
		} else {
			$scope.outputImage = recipe.outputImage;
		}
	}

    $scope.querySearch = function(query) {
    	var lowercaseQuery = angular.lowercase(query);
		var results = $filter('filter')($scope.recipes, { name: query });

		//console.log(results);
		return results;
    }

    $scope.addToHistory = function() {
    	if($scope.recipe.name) {
	    	if($scope.recipe.name && $scope.recipe.name != "") {
	    		if($scope.history.length > 0) {
	    			if($scope.history[0].recipe.name != $scope.recipe.name) {
	    				$scope.history.unshift({id: $scope.history.length -1, recipe: $scope.recipe});
	    			}
	    		} else {
	    			$scope.history.unshift({id: $scope.history.length -1, recipe: $scope.recipe});
	    		}
	    	}
	    	
			$scope.outputSprite = "display: none;";
	    	$scope.outputImage = "";
	    	$scope.searchText = '';
			$scope.stackSize = null;
			$scope.recipeName = null;
			$scope.bookmark = "fa-star-o";

			$scope.inputImages = new Array(3);
			for(var i = 0; i < 3; i++) {
				$scope.inputImages[i] = new Array(3);
			}

			$scope.recipeMap = new Array(3);
			for(var i = 0; i < 3; i++) {
				$scope.recipeMap[i] = new Array(3);
			}

			$timeout(function() {
			    $scope.outputSprite = "display: none;";
			    $scope.stackSize = null;

			    $scope.inputImages = new Array(3);
				for(var i = 0; i < 3; i++) {
					$scope.inputImages[i] = new Array(3);
				}
			}, 10);
		}
    }

    $scope.selectedItemChange = function(recipe) {
    	if(recipe) {
    		//console.log(recipe);
    		$scope.recipe = recipe;

    		$scope.recipeName = recipe.name;
    		$scope.stackSize = recipe.stackSize;
    		$scope.recipeMap = recipe.recipeMap;
    		$scope.inputImages = recipe.inputImages;

    		if(recipe.outputImage.includes("background-position")) {
    			$scope.outputSprite = recipe.outputImage;
    		} else {
    			$scope.outputImage = recipe.outputImage;
    		}

    		if($scope.isInBookmark($scope.recipe)) {
				$scope.bookmark = "fa-star";
			} else {
				$scope.bookmark = "fa-star-o";
			}
    	}
    }

    $scope.isInBookmark = function(recipe) {
    	for(var i = 0; i < $scope.bookmarks.length; i++) {
    		if($scope.bookmarks[i].name == recipe.name) {
    			return true;
    		}
    	}

    	return false;
    }

    $scope.$watch('inputImages', function() {
    	for(var i = 0; i < 3; i++) {
			for(var j = 0; j < 3; j++) {
				if($scope.inputImages[i][j] == "" || !$scope.inputImages[i][j]) {
					$scope.inputImages[i][j] = 'display: none;';
				}
			}
		}
    });
});
