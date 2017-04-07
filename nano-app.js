var app = angular.module('myApp', [])

app.service('dataService', function() {

	this.values = d3.range(1000).map(d3.random.normal(20, 5));

	// this.get = function() {
	// 	$http.get('data').then(function(res) {
	// 		this.values = res.data;
	// 	})
	// }

	this.update = function() {
		this.values = d3.range(1000).map(d3.random.normal(20, 5));
		return this.values;
	}

    this.options = { 'width': 860, 'height': 400 }
    this.chart = Histogram(this.values);

    this.updateWidth = function(value) {
    	this.options['width'] = Number(value);
	    this.chart.width(this.options.width)
    }

})

app.controller('mainCtrl', ['$scope', 'dataService', function($scope, dS) {

    $scope.barValue = '';
    $scope.values = dS.update();
    $scope.width = dS.options.width

    $scope.hovered = function(d){
        $scope.barValue = d;
        $scope.$apply();
    };

    $scope.updateWidth = function(value) {
    	dS.updateWidth(value);
    }

}])

app.directive('d3Chart', ['dataService', function(dS){
	var values = dS.update();
	chart = dS.chart;
    return {
        restrict: 'E',
        replace: true,
        scope: {
            height: '=height',
            width: '=width',
            data: '=values',
            hovered: '&hovered'
        },
        link: function(scope, element, attrs) {
            var chartEl = d3.select(element[0]);

            chart.on('barHover', function(d, i){
                scope.hovered({args:d.length});
            });

            scope.width = dS.options.width

            scope.$watch('data', function (newVal, oldVal) {
                chartEl.datum(newVal).call(chart);
            });
        }
    }
}])

app.directive('d3ChartFooter', ['dataService', function(dS){
    return {
        restrict: 'E',
        replace: false,
        controller: 'mainCtrl',
        template: '<h2>Data: {{barValue}}</h2>' +
        '<input type="text" name="width" ng-model="width" />' +
		'<button id="button" ng-click="updateWidth(width)"' + 
		'>Update Width</button>'
    }
}]);
