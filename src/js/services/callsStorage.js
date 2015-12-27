callsApp.factory('callsStorage', function() {
	var STORAGE_ID = 'calls-app';

	return {
		get: function() {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},

		put: function(calls) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(calls));
		}
	};
});