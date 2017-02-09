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

/*
var Promise = require('bluebird');
var lodash = require('lodash');
var model = require('./model.js')(knex, Promise, lodash);
*/

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();
app.use(morgan('dev'));

app.use(function(req, res, next){
	console.log('Time: ', Date.now());
	next();
});
app.use('/static', express.static(path.join(__dirname, 'public')));

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

app.get('user', function(req, res) {
	knex('user').select()
	.then(function(data) {
		console.log(data);
		res.send(data);
	})
});

app.post('user', function(req, res) {
	knex('user').insert(req.body)
	.then(function(data) {
		console.log(data);
		res.send(data);
	})
})

app.post('/task', function(req, res) {
	console.log("POST TASK: " + req.body);
	res.send('succes!');
});

app.listen(3000, function() {
	console.log('listening on port 3000');
});


