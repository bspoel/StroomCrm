module.exports = function(knex, Promise, _) {
	var model = {};

	var schema = require('./schema.js');

	model.dropAll = function() {
		var dropTable = function(tableDefinition) {
			var sql = 'SET foreign_key_checks = 0; DROP TABLE IF EXISTS ' + tableDefinition.name + '; SET foreign_key_checks = 1;';
			return knex.raw(sql);
		};

		return Promise.all(_.map(schema, dropTable))
		.catch(function(error) {
			console.log(error);
		});
	}

	model.createAll = function() {
		knex.on('query', function(q) {
			console.log(q);
		});
		var create = function(tableDefinition) {
			return knex.schema.createTable(tableDefinition.name, 
							function(table) {
				var t = table;
				t.increments('id');
				t.timestamp('updated_at').defaultTo(knex.fn.now());
				_.map(tableDefinition.columns, function(col) {
					var column = t[col.type](col.name);
					if (col.foreign) {
						column.unsigned();
					}
					if (col.unique) {
						t.unique(col.name);
					}
				});
			});
		};
		var create_fk = function(tableDefinition) {
			return knex.schema.table(tableDefinition.name, function(table) {
				_.map(tableDefinition.columns, function(col) {
					if (col.foreign) {
						a = table.foreign(col.name).references(col.foreign).toString();
					}
				});
			});
		};

		return Promise.all(_.map(schema, create))
		.then(function() {
			return Promise.all(_.map(schema, create_fk))})
		.then(function(result) {
			console.log('Database created');
		});
	}

	model.showSql = function() {
		var getSql = function(tableDefinition) {
			return knex.raw('show create table ' + tableDefinition.name);
		}
		var tables = '';
		return Promise.all(_.map(schema, getSql));
	}

	model.recreate = function() {
		return model.dropAll().then(function() {
			return model.createAll();
		});
	}

	var class_ = function(definition) {
		var def = definition;

		this.insert = function(data) {
			var d = data;
			return function() {
				return knex(def.name).insert(d);
			};
		};

		this.select = function(identifier) {
			var id = identifier;
			return function() {
				return knex(def.name).where('id', id);
			};
		};

		this.find = function(colName, colValue) {
			var name = colName;
			var value = colValue;
			return knex(def.name).where(name, value);
		}

		return this;
	}

	_.each(schema, function(definition) {
		model[definition.name] = new class_(definition);
	});

	return model;
}