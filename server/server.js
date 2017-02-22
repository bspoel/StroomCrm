const path = require('path');
var knex = require('knex')({
	client: 'mysql',
	connection: {
		user: 'nodejs',
		password: process.env.DB_PWD,
		socketPath: '/var/run/mysqld/mysqld.sock',
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
	knex('user').select().then(function(data) {
		console.log(data);
		res.send(data);
	}).error(function(err) {
		res.send('Error!');
	})
});

app.get('/task', ensureAuthenticated, function(req, res) {
	knex.select().table('task').then(function(data) {
		console.log(data);
		res.send(data);
	}).error(function(err) {
		res.send('Error!');
	});
});

app.get('user/:id', function(req, res) {
	knex('user').where('id', req.params.id)
	.then(function(data) {
		console.log(data);
		res.send(data);
	})
	.error(function(err) {
		console.log('Error!' + err);
	});
});

app.post('/list', function(req, res) {
	var tableName = req.body.type;
	var index = req.body.args.index;
	var length = req.body.args.length;
	knex(tableName.toLowerCase()).select().limit(length).offset(index)
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
	})
	console.log(JSON.stringify(item));
});

app.post('/contact', function(req, res) {
	if (!req.body.id) {
		console.log('Nieuw contact aanmaken');
	} else {
		console.log('Contact aanpassen');
	}
});

app.post('/task', function(req, res) {
	console.log("POST TASK: " + req.body);
	res.send('succes!');
});

/*
* Starting the server
*/
app.listen(3000, function() {
	console.log('listening on port 3000');
});


