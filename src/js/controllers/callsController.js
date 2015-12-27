callsApp.controller('callsController', ['$scope', '$location', '$filter', '$interval', 'callsStorage', function($scope, $location, $filter, $interval, callsStorage) {
	
	// Let's have time format as per terms of reference
	var timeFormat = 'mmss';
	
	// Current minute
	$scope.currentMinute = function() {
		return parseInt($filter('date')(new Date(), 'm'), 10);
	}
	
	// "You may want to populate the app with fake data". Scheduled time of call will always be random, but valid
	$scope.sampleCalls = function(min, max) {
		min = Math.min(Math.max(0, min), 59);
		max = Math.min(max, 59);
		$scope.allCalls = [
			{ name: 'Oleksandr Vasylyuk', phone: '00420 485 183 456' },
			{ name: 'Dima Lutvunyk', phone: '00420 123 133 893' },
			{ name: 'Sergiy Mikhailushko', phone: '00420 590 100 467' },
			{ name: 'Volodymyr Kushnir', phone: '00420 183 374 788' },
			{ name: 'Lyudmyla Mandzyuk', phone: '00420 723 133 862' },
			{ name: 'Volodymyr Stoyko', phone: '00420 495 134 455' },
			{ name: 'Serhiy Raskoley', phone: '00420 193 421 768' },
			{ name: 'Andrij Petrik', phone: '00420 475 220 123' },
			{ name: 'Iryna Ulychna', phone: '00420 300 199 341' },
			{ name: 'Татьяна Омельченко', phone: '00420 356 285 679' },
			{ name: 'Ярослав Хлопась', phone: '00420 678 456 583' },
			{ name: 'Богдан Бакай', phone: '00420 906 756 342' },
			{ name: 'Vasya Semeniv', phone: '00420 758 390 267' },
			{ name: 'Michal Lubik', phone: '00420 006 466 786' },
			{ name: 'Paweł Kondratowicz', phone: '00420 300 578 900' },
			{ name: 'Olga Mandzyuk-Filova', phone: '00420 859 900 566' },
			{ name: 'Yulia Safonova-Klymenko', phone: '00420 005 995 005' },
			{ name: 'Henrich Filo', phone: '00420 100 289 688' },
			{ name: 'Daniel Velcea', phone: '00420 190 485 468' },
			{ name: 'Alin Piciu', phone: '00420 899 763 367' },
			{ name: 'Hamza Sayeh', phone: '00420 906 478 378' },
			{ name: 'Taras Rohozhynskyi', phone: '00420 112 485 574' },
			{ name: 'Jose Francisco Cachairo', phone: '00420 332 577 800' },
			{ name: 'Edgar Alfonso Díaz Díaz', phone: '00420 879 536 900' },
			{ name: 'Denny Trebbin', phone: '00420 004 777 902' }
		].map(function(c) {
			c.time = ('00' + (Math.floor(Math.random() * (max - min + 1)) + min).toString()).slice(-2) + ('00' + Math.floor(Math.random() * 60).toString()).slice(-2);
			return c;
		});
		callsStorage.put($scope.allCalls);
	}
	
	// Get all calls and count them
	$scope.allCalls = callsStorage.get();
	
	// Placeholder for new call
	$scope.newCall = { name: '', phone: '', time: '' };
	
	// Add new call. Since target browsers aren't specified, it is supposed that target handles pattern attribute and validates input
	$scope.addCall = function() {

		// Still, Safari likes to submit invalid forms anyway. Need to check for any undefined values
		if ($scope.newCall.name.length == undefined || $scope.newCall.phone.length == undefined || $scope.newCall.time.length == undefined) return;
		$scope.newCall.name = $scope.newCall.name.trim();
		$scope.newCall.phone = $scope.newCall.phone.replace(/\+|\D/g, function(m) { return (m == '+') ? '00' : ''; });
		$scope.newCall.phone = $scope.newCall.phone.slice(0,5) + ' ' + $scope.newCall.phone.slice(5,8) + ' ' + $scope.newCall.phone.slice(8,11) + ' ' + $scope.newCall.phone.slice(11);
		$scope.newCall.time = ('0' + $scope.newCall.time.replace(/\D/g, '')).slice(-4);
		if ($scope.newCall.name.length === 0 || $scope.newCall.phone.length === 0 || $scope.newCall.time.length === 0) return;

		$scope.allCalls.push($scope.newCall);
		callsStorage.put($scope.allCalls);

		$scope.newCall = { name: '', phone: '', time: '' };
		$scope.newCallForm.$setPristine();
	};
	
	// Delete the call
	$scope.removeCall = function(call) {
		$scope.allCalls.splice($scope.allCalls.indexOf(call), 1);
		callsStorage.put($scope.allCalls);
	};
	
	// Next call(s) time
	$scope.nextCallTime = function() {
		var n = $filter('orderBy')($filter('filter')($scope.allCalls, $scope.nextCalls), 'time');
		return (n.length > 0) ? n[0].time : '';
	}
	
	// Filters
	$scope.nextCalls = function(call) {
		return parseInt(call.time, 10) >= parseInt($filter('date')(new Date(), timeFormat), 10);
	}
	$scope.doneCalls = function(call) {
		return parseInt(call.time, 10) < parseInt($filter('date')(new Date(), timeFormat), 10);
	}

	// Change location on filter
	if ($location.path() === '') $location.path('/');
	$scope.location = $location;
	$scope.$watch('location.path()', function(path) {
		$scope.statusFilter = { '/next': $scope.nextCalls, '/done': $scope.doneCalls }[path];
	});

	// Default sorting order
	$scope.order = 'time';
	
	// This runs $digest every [argument] ms
	var refresh = $interval(function() {}, 100);
	// Note: Intervals created by $interval service must be explicitly destroyed.
	// In particular they are *not* automatically destroyed when a controller's scope or a directive's element are destroyed, therefore...
	$scope.$on('$destroy', function() {
		// ...make sure that the interval is destroyed too
		$interval.cancel(refresh);
		refresh = undefined;
	});
	
}]);