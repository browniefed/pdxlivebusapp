var user = (function() {
	/**
	 *
	 * Install sqllite plugin
	 * 
	 */
	
	return function() {
		var database = window.sqlitePlugin || window,
			db;

		function loadDefaults() {
			var defaultPromise = $.Deferred();
			db = database.openDatabase('Database', '', 'PDXLiveBus', 200000);
			var setupPromise = setupDb();
			setupPromise.done(function() {
				getFavorites(defaultPromise);
			});

			return defaultPromise;

		}

		function openDb() {
		}

		function toArray(results) {
			var data = [];
			if (results.rows.length) {
				for (var i = 0; i < results.rows.length; i++) {
					data.push(results.rows.item(i));
				}
			}
			return data;
		}

		function setupDb() {
			var setupPromise = $.Deferred();

			if (db) {
				db.transaction(function(tx) {
					tx.executeSql('CREATE TABLE IF NOT EXISTS favorites (id integer primary key, stopId text, route text)', [], function() {
						setupPromise.resolve();
					});
				})
			}

			return setupPromise;
		}


		function getFavorites(promise) {
			var favoritePromise = promise || $.Deferred();
			db.transaction(function(tx) {
				tx.executeSql('SELECT * FROM favorites', [], function(tx, data) {
					favoritePromise.resolve(toArray(data));
				})
			});

			return favoritePromise;
		}

		function deleteStop(stopId, route) {
			var promise = $.Deferred();
			db.transaction(function(tx) {
				var query = 'stopId = ?',
					params = [stopId];
				if (route) {
					query += ' AND route = ?';
					params.push(route);
				}

				tx.executeSql('DELETE FROM favorites WHERE ' + query, params, function() {
 					promise.resolve();
				});
			});

			return promise;
		}

		function addFavoriteStop(stopId, route) {
			var promise = $.Deferred();
			db.transaction(function(tx) {
				tx.executeSql('INSERT INTO favorites (stopId, route) VALUES(?,?)', [stopId, route], function() {
					promise.resolve();
				});
			});
			return promise;
		}

		function getUserLocation() {
			var promise = $.Deferred();
			navigator.geolocation.getCurrentPosition(function(position) {
				promise.resolve(position);
			}, function(err) {
				promise.reject(err);
			}, {maximumAge: 0, timeout:10000, enableHighAccuracy: false});
			return promise;
		}

		function getDb() {
			return db;
		}


		return {
			loadDefaults: loadDefaults,
			getUserLocation: getUserLocation,
			getFavorites: getFavorites,
			addFavoriteStop: addFavoriteStop,
			deleteStop: deleteStop,
			getDb: getDb
		};
	}
}());