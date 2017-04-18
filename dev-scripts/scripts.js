module.exports = function(knex, Promise, _) {
	var scripts = {};

	var schema = require('./schema.js');

	scripts.dropAll = function() {
		var dropTable = function(tableDefinition) {
			var sql = 'SET foreign_key_checks = 0; DROP TABLE IF EXISTS ' + tableDefinition.name + '; SET foreign_key_checks = 1;';
			return knex.raw(sql);
		};

		return Promise.all(_.map(schema, dropTable))
		.catch(function(error) {
			console.log(error);
		});
	}

	scripts.createAll = function() {
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

	scripts.showSql = function() {
		var getSql = function(tableDefinition) {
			return knex.raw('show create table ' + tableDefinition.name);
		}
		var tables = '';
		return Promise.all(_.map(schema, getSql));
	}

	scripts.recreate = function() {
		return scripts.dropAll().then(function() {
			return scripts.createAll();
		});
	};

	scripts.generateModel = function() {
		var js = '';
		var addLine = function(tabs, addition) {
			js += '\t'.repeat(tabs) + addition + '\n'
		}

		addLine(0, '// This is an automatically generated file');
		addLine(0, 'define(["knockout"], function(ko) {');
		addLine(1, 'var model = {}');

		_.each(schema, function(definition) {
			addLine(1, 'model.' + _.upperFirst(definition.name) + ' = function(args) {');
			addLine(2, 'if (!args) args = {};');
			_.each(definition.columns, function(column) {
				addLine(2, 'this.' + column.name + ' = ko.observable(args.' + column.name + ');')
			});
			addLine(2, 'this.id = args.id;');
			addLine(2, 'this.updated_at = args.updated_at;');
			addLine(1, '};');
			addLine(1, '');
		});

		addLine(1, 'return model;');
		addLine(0, '})');

		var fs = require('fs.promised');
		return fs.writeFile('client/scripts/model.js', js)
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

	scripts.generateData = function() {
		var faker = require('faker');
		var data = _.times(5, function() {
			return {
				name: faker.name.findName(),
				address: faker.address.streetName(),
				email: faker.internet.email()
			}
		})
		return knex('contact').insert(data);
	}
	

	return scripts;
}