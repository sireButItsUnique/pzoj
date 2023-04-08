const express = require('express');
const fs = require('fs');
const path = require('path');
const { cwd } = require('process');
const { judge } = require('./interactor.js');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const ws = require('ws');
var showdown = require('showdown'),
	converter = new showdown.Converter();

const app = express();

app.use(bodyParser.json());

const db = new sqlite3.Database(path.join(cwd(), 'db.db'));

/* ------------------ USER MGMT ------------------ */

function getToken(userid) {
	let token = userid.toString() + ' ' + (new Date().getTime() + 1000 * 60 * 60 * 24 * 14).toString() + '.' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	// encrypt token with contents of key.key
	key = fs.readFileSync(path.join(cwd(), 'key.key'));
	let cipher = crypto.createCipher('aes-256-cbc', key);
	let encrypted = cipher.update(token, 'utf8', 'hex');
	encrypted += cipher.final('hex');
	return encrypted;
	
}

app.post('/api/login', (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
		if (err) {
			res.status(500);
			res.end();
			return;
		}
		// if user does not exist, send back 404
		if (row == undefined) {
			res.status(404);
			res.end();
			return;
		}
		// hash password
		bcrypt.compare(password, row.password, (err, result) => {
			if (err) {
				res.status(500);
				res.end();
				return;
			}
			// if password is correct, send back a token
			if (result) {
				res.send(getToken(row.userid));
			} else {
				res.status(401);
				res.end();
			}
		});
	});
});

app.post('/api/register', (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
		if (err) {
			res.status(500);
			res.end();
			return;
		}
		// if user already exists, send back 409
		if (row != undefined) {
			res.status(409);
			res.end();
			return;
		}
		// hash password
		bcrypt.hash(password, 10, (err, hash) => {
			if (err) {
				res.status(500);
				res.end();
				return;
			}
			db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err) => {
				if (err) {
					res.status(500);
					res.end();
					return;
				}
				db.get('SELECT userid FROM users WHERE username = ?', [username], (err, row) => {
					if (err) {
						res.status(500);
						res.end();
						return;
					}
					res.send(getToken(row.userid));
				});
			});
		});
	});
});

app.get('/api/user/:username', (req, res) => {
	let username = req.params.username;
	let jsonret = {};
	// user data
	db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
		if (err) {
			res.status(500);
			res.end();
			return;
		}
		// if user does not exist, send back 404
		if (row == undefined) {
			res.status(404);
			res.end();
			return;
		}
		jsonret['username'] = row.username;
		// user submissions
		db.all('SELECT * FROM submissions WHERE username = ?', [username], (err, rows) => {
			if (err) {
				res.status(500);
				res.end();
				return;
			}
			jsonret['submissions'] = rows;
			res.send(jsonret);
		});
	});
});

/* ------------------ PROBLEMS ------------------ */

const allowedLanguages = ['cpp', 'c', 'py'];

app.get('/api/problem/:pid', (req, res) => {
	let problem_path = path.join(cwd(), '..', 'problems', req.params.pid);
	fs.readFile(path.join(problem_path, 'problem.md'), (err, data) => {
		if (err) {
			res.status(404);
			res.send('Problem not found');
			return;
		}
		data = fs.readFileSync(path.join(problem_path, 'problem.md'));
		res.send(converter.makeHtml(data.toString()));
	});
});

app.get('/api/problems', (req, res) => {
	let problems = [];
	fs.readdir(path.join(cwd(), '..', 'problems'), (err, files) => {
		if (err) {
			res.status(500);
			res.end();
			return;
		}
		files.forEach((file) => {
			if (file != 'template') {
				problems.push(file);
			}
		});
		res.send(problems);
	});
});

const wss = new ws.Server({ port: 3002 });

wss.on('connection', (ws) => {
	ws.on('message', (message) => {
		let data = JSON.parse(message.toString());
		let filecontent = data.code;
		let lang = data.lang;
		let code_path = path.join(cwd(), '..', 'problems', data.pid, 'main.' + lang);
		let problem_path = path.join(cwd(), '..', 'problems', data.pid);
		if (allowedLanguages.includes(lang)) {
			filecontent.replace('\\n', '\n');
			filecontent.replace('\\t', '\t');
			filecontent.replace('\\\\', '\\');
			filecontent.replace('endl', "'\\n'"); // extremely questionable
			try {
				fs.writeFileSync(code_path, filecontent);
			} catch (err) {
				ws.send('error: Error writing to file');
				return;
			}
		} else {
			ws.send('error: Unsupported language');
			return;
		}
		judge(code_path, lang, problem_path, ws);
	});
});

/* ------------------ LISTENING ------------------ */

app.listen(3001, () => {
	console.log('Server started');
});