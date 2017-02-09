exports.init = function(app, knex) {
	var passport = require('passport');
	var LocalStrategy = require('passport-local').Strategy;
	var bcrypt = require('bcrypt');
	var SALT_ROUNDS = 10;

	passport.use(new LocalStrategy(
		function(username, password, done) {
			knex('user').select().where('name', username)
			.then(function (rows) {
				if (!rows[0]) {
					return done(null, false);
				}
				bcrypt.compare(password, rows[0].password, function(err, res) {
					if (err) return done(err, null);
				    if (res) {
				    	return done(null, rows[0]);
				    } else {
				    	return done(null, false, { message: 'Incorrect password.' });

				    }
				});
			})
			.catch(function(err) {
				return done(err);
			});
			
		})
	);
	passport.serializeUser(function(user, done) {
		done(null, user.name);
	});

	passport.deserializeUser(function(username, done) {
		knex('user').select().where('name', username).then(function(rows) {
			if (rows[0]) {
				done(null, rows[0])
			} else {
				done('No user found');
			}
		});
	});
	app.use(require('express-session')({ secret: '*(!#@JDAdwaweaODOI!#(*', resave: false, saveUninitialized: false }));
	app.use(passport.initialize());
	app.use(passport.session());

	app.post('/login', passport.authenticate('local'), function(req, res) {
		res.send();
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.send();
	});
}

exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated())
		return next();
	else
		res.status(401).send('Access Denied');
}