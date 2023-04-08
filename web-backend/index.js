const express = require('express');
const fs = require("fs");
const path = require("path");
const { cwd } = require('process');
const { judge } = require('./interactor.js');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
var showdown = require('showdown'),
	converter = new showdown.Converter();

const app = express();

app.use(bodyParser.json());

const db = new sqlite3.Database(path.join(cwd(), "db.db"));

/* ------------------ USER MGMT ------------------ */

app.post('/api/login', (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
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
				res.send(getToken(username));
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
	db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
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
			db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash], (err) => {
				if (err) {
					res.status(500);
					res.end();
					return;
				}
				res.send(getToken(username));
			});
		});
	});
});

app.get("/api/user/:username", (req, res) => {
	let username = req.params.username;
	let jsonret = {};
	// user data
	db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
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
		jsonret["username"] = row.username;
		// user submissions
		db.all("SELECT * FROM submissions WHERE username = ?", [username], (err, rows) => {
			if (err) {
				res.status(500);
				res.end();
				return;
			}
			jsonret["submissions"] = rows;
			res.send(jsonret);
		});
	});
});

/* ------------------ PROBLEMS ------------------ */

const allowedLanguages = ["cpp", "c", "py"];

app.post('/api/judge', (req, res) => {
	let filecontent = req.body.code;
	let lang = req.body.lang;
	let code_path = path.join(cwd(), "..", "problems", req.body.pid, "main." + lang);
	let problem_path = path.join(cwd(), "..", "problems", req.body.pid);
	if (allowedLanguages.includes(lang)) {
		filecontent.replace('\\n', '\n');
		filecontent.replace('\\t', '\t');
		filecontent.replace('\\\\', '\\');
		try {
			fs.writeFileSync(code_path, filecontent);
		} catch (err) {
			res.status(500);
			res.end();
			return;
		}
	} else {
		res.status(400);
		res.send("Unsupported language");
		return;
	}
	let jsonret = {};
	judge(code_path, lang, problem_path).then((result) => {
		jsonret["indivresults"] = result;
		jsonret["verdict"] = result[result.length - 1].split(" ")[0];
		res.send(jsonret);
	});
});

app.get('/api/problem/:pid', (req, res) => {
	let problem_path = path.join(cwd(), "..", "problems", req.params.pid);
	fs.readFile(path.join(problem_path, "problem.md"), (err, data) => {
		if (err) {
			res.status(404);
			res.send("Problem not found");
			return;
		}
		data = fs.readFileSync(path.join(problem_path, "problem.md"));
		res.send(converter.makeHtml(data.toString()));
	});
});

/* ------------------ LISTENING ------------------ */

app.listen(3001, () => {
	console.log('Server started');
});