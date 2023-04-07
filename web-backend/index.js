const express = require('express');
const fs = require("fs");
const path = require("path");
const { cwd } = require('process');
const { judge } = require('./interactor.js');
const bodyParser = require('body-parser');
var showdown = require('showdown'),
	converter = new showdown.Converter();

const app = express();

app.use(bodyParser.json());

app.post('/api/judge', (req, res) => {
	let filecontent = req.body.code;
	let lang = req.body.lang;
	let code_path = path.join(cwd(), "..", "problems", req.body.pid, "main." + lang);
	let problem_path = path.join(cwd(), "..", "problems", req.body.pid);
	if (lang == "cpp") {
		// save as main.cpp
		try {
			fs.writeFileSync(code_path, filecontent);
		} catch (err) {
			res.status(500);
			res.end();
			return;
		}
	} else if (lang == "py") {
		// save as main.py
		try {
			fs.writeFileSync(code_path, filecontent, {create: true});
		} catch (err) {
			console.log(err);
			res.status(500);
			res.end();
			return;
		}
	} else if (lang == "c") {
		// save as main.c
		try {
			fs.writeFileSync(code_path, filecontent);
		} catch (err) {
			res.status(500);
			res.end();
			return;
		}
	} else {
		res.status(400);
		res.send("Invalid language");
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

app.listen(3001, () => {
	console.log('Server started');
});