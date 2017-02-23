module.exports = function(grunt) {
	grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json')
  	});

	var knex = require('knex')({
		client: 'mysql',
		connection: {
			user: 'nodejs',
			password: process.env.DB_PWD,
			socketPath: '/var/run/mysqld/mysqld.sock',
			// Convert 1 and 0 into true and false:
			typeCast: function(field, next) {
				if (field.type === 'TINY' && field.length == 1) {
					return (field.string() === '1');
				}
				return next();
			},
			database: 'test',
			multipleStatements: true
		}
		//,debug: true
	});

	grunt.registerTask('default', 'Help', function() {
		grunt.log.writeln('Available tasks: createAdmin, resetDb, showSchema, generateModel');
	});
  
	grunt.registerTask('foo', 'A sample task that logs stuff.', function(arg1, arg2) {
		if (arguments.length === 0) {
			grunt.log.writeln(this.name + ", no args");
		} else {
			grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);
		}
	});

	grunt.registerTask('createAdmin', 'create admin user', function() {
		var bcrypt = require('bcrypt');
		var SALT_ROUNDS = 10;

		var done = this.async();

		bcrypt.hash('admin', SALT_ROUNDS).then(function(hash) {
			return knex('user').insert({name: 'admin', password: hash})
		})
		.then(function(result){
			grunt.log.writeln(result);
			done();
		}).catch(function(err){
			grunt.log.writeln(err);
			done();
		});
		grunt.log.writeln('inserting admin user');	
	});

	grunt.registerTask('resetDb', 'recreate the database from schema.js', function() {
		var Promise = require('bluebird');
		var lodash = require('lodash');
		var scripts = require('./dev-scripts/scripts.js')(knex, Promise, lodash);
		var done = this.async();

		scripts.recreate()
		.then(function(result) {
			done();
		}).catch(function(err) {
			grunt.log.writeln(err);
			done();
		});
	});

	grunt.registerTask('showSchema', 
				'Print the SQL commands that create the schema',
				function() {
		var Promise = require('bluebird');
		var lodash = require('lodash');
		var scripts = require('./dev-scripts/scripts.js')(knex, Promise, lodash);
		var done = this.async();

		scripts.showSql()
		.then(function(result) {
			for(var i = 0; i < result.length; i++) {
				tabledef = JSON.stringify(result[i][0][0]["Create Table"]);
				tabledef = tabledef.replace(/\\n/g, '\n');
				grunt.log.writeln(tabledef + '\n');
			}
			done();
		}).catch(function(err) {
			grunt.log.writeln(err);
			done();
		});
	});

	grunt.registerTask('generateModel', 
		'Generate the javascript model from the schema', 
		function() {
		var Promise = require('bluebird');
		var lodash = require('lodash');
		var scripts = require('./dev-scripts/scripts.js')(knex, Promise, lodash);
		var done = this.async();

		scripts.generateModel().then(function() {
			done();
		});
	})
};