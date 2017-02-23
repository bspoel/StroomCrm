const path = require('path');
var knex = require('knex')({
	client: 'mysql',
	connection: {
		user: 'nodejs',
		password: process.env.DB_PWD,
		socketPath: '/var/run/mysqld/mysqld.sock',

		// MySql stores booleans as tinyints. 
		// This code converts those ints to bools
		typeCast: function(field, next) {
			if (field.type === 'TINY' && field.length == 1) {
				return (field.string() === '1');
			}
			return next();
		},
		database: 'test'
	}
});

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();
app.use(morgan('dev'));

app.use('/static', express.static(path.join(__dirname, '..', 'client')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*
* Authentication
*/
var login = require('./authentication.js');
login.init(app, knex);
var ensureAuthenticated = login.ensureAuthenticated;

/*
* Ajax routes
*/
app.get('/', function(req, res) {
	res.redirect("/static/index.html");
});

app.post('/list', function(req, res) {
	var tableName = req.body.type.toLowerCase();
	var index = req.body.args.index;
	var length = req.body.args.length;
	knex(tableName).select().limit(length).offset(index)
	.then(function(results) {
		res.send(results);
	})
	.error(function(err) {
		console.log('Error!' + err);
		res.send(err);
	});
});


app.post('/create', function(req, res) {
	var item = req.body;
	knex(item.type).insert(item.data).then(function(id) {
		res.send(id);
	}).error(function(message) {
		console.log('Error!' + err);
	});
});

app.post('/read', function(req, res) {
	var tableName = req.body.type.toLowerCase();
	var id = req.body.id;
	knex(tableName).select().where('id', id)
	.then(function(results) {
		if (results[0]) {
			res.send(results[0]);
		} else {
			throw "Element not found.";
		}
	})
	.error(function(err) {
		console.log('Error!' + err);
		res.send(err);
	});
});

app.post('/update', function(req, res) {
	var tableName = req.body.type.toLowerCase();
	var object = req.body.object;

	var id = req.body.object.id;
	delete req.body.object.id;
	knex(tableName).where('id', id).update(object)
	.then(function(result) {
		res.send(true);
	})
	.error(function(err) {
		console.log('Error!' + err);
		res.send(err);
	});
});

app.post('/delete', function(req, res) {
	var tableName = req.body.type.toLowerCase();
	var id = req.body.id;

	knex(tableName).where('id', id).del()
	.then(function(result) {
		res.send(true);
	}).error(function(err) {
		console.log('Error!' + err);
		res.send(err);
	});
});

/*
* Starting the server
*/
app.listen(3000, function() {
	console.log('listening on port 3000');
});


