var app = angular.module('ProductModule', []);
app.controller('ProductController', function($scope, $filter){

    $scope.products = getProducts();
    $scope.pageSize = 3;

    $scope.sort = function (sortBy) {
        $scope.columnToOrder = sortBy;
        $scope.currentPage = 0;

        $scope.filteredList = $filter('orderBy')($scope.filteredList, $scope.columnToOrder, $scope.reverse);
        $scope.reverse = !$scope.reverse;
        $scope.pagination();
    };

    $scope.pagination = function () {
        $scope.products = $scope.paged($scope.filteredList, $scope.pageSize);
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    $scope.firstPage = function () {
        $scope.currentPage = 0;
    };

    $scope.lastPage = function () {
        $scope.currentPage = $scope.products.length - 1;
    };

    $scope.paged = function (valLists, pageSize) {
        retVal = [];
        for (var i = 0; i < valLists.length; i++) {
            if (i % pageSize === 0) {
                retVal[Math.floor(i / pageSize)] = [valLists[i]];
            } else {
                retVal[Math.floor(i / pageSize)].push(valLists[i]);
            }
        }
        return retVal;
    };
})

function getProducts(){
    return [
        {title: 'Говядина', group: 'мясо', proteins: 10, fats: 20, carbos: 30, calories: 50},
        {title: 'Окунь', group: 'рыба', proteins: 35, fats: 64, carbos: 57, calories: 37},
        {title: 'Рис', group: 'крупы', proteins: 56, fats: 36, carbos: 35, calories: 57},
        {title: 'Картофель', group: 'овощи', proteins: 87, fats: 43, carbos: 34, calories: 54},
        {title: 'Гречка', group: 'крупы', proteins: 76, fats: 45, carbos: 23, calories: 98}
    ]
}