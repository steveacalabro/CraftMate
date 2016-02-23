'use strict';

/**
 * @ngdoc function
 * @name craftMateApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the craftMateApp
 */
angular.module('craftMateApp')
.controller('HomeCtrl', function ($scope, $http, $filter) {
	$scope.recipes = [];
	$scope.searchText;


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

	for(var i = 0; i < 3; i ++) {
		for(var j = 0; j < 3; j++) {
			$scope.inputImages[i][j] = 'display: none;';
		}
	}

	var mainInfo = $http.get('recipeList.json').success(function(response) {
        $scope.recipes = response;
    });


	$scope.goToBookmark = function(index) {
		console.log("Bookmark Clicked" + index);
	}

    $scope.querySearch = function(query) {
    	var lowercaseQuery = angular.lowercase(query);
		var results = $filter('filter')($scope.recipes, { name: query });

		console.log(results);
		return results;
    }

    $scope.addToHistory = function() {
    	$scope.searchText = '';
 
		$scope.outputImage = null;
		$scope.outputSprite = 'display:none;';
		$scope.stackSize = null;
		$scope.recipeName = null;

		for(var i = 0; i < 3; i ++) {
			for(var j = 0; j < 3; j++) {
				$scope.inputImages[i][j] = 'display: none;';
			}
		}

		$scope.recipeMap = new Array(3);
		for(var i = 0; i < 3; i++) {
			$scope.recipeMap[i] = new Array(3);
		}
    }

    $scope.selectedItemChange = function(recipe) {
    	if(recipe) {
    		console.log(recipe);

    		$scope.recipeName = recipe.name;
    		$scope.stackSize = recipe.stackSize;
    		$scope.recipeMap = recipe.recipeMap;
    		$scope.inputImages = recipe.inputImages;

    		for(var i = 0; i < 3; i++) {
    			for(var j = 0; j < 3; j++) {
    				if($scope.inputImages[i][j] == "") {
    					$scope.inputImages[i][j] = 'display: none;';
    				}
    			}
    		}

    		if(recipe.outputImage.includes("background-position")) {
    			$scope.outputSprite = recipe.outputImage;
    		} else {
    			$scope.outputImage = recipe.outputImage;
    		}
    	}
    }
});
