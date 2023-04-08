const child_proc = require('child_process');
const { cwd, chdir } = require('process');
const fs = require('fs');

function judge(code_file, lang, dir, ws) {
	let p = new Promise((resolve, reject) => {
		let ret = [];
		let child = child_proc.execFile('../judging-backend/judge', [lang, dir]);
		let stdout = "";		
		child.stdout.on('data', (chunk) => {
			stdout += chunk.substring(chunk.lastIndexOf('\n', chunk.length - 2) + 1);
		});
		child.on('exit', (code) => {
			for (let line of stdout.split('\n')) {
				if (line.match(/^\d+ \d+$/)) {
					ret.push(`AC ${line}`);
				} else if (line.match(/^\d+ \d+ WA$/)) {
					ret.push(`WA ${line.substring(0, line.length - 3)}`);
				} else if (line.length > 0) {
					ret.push(`IE ${line}`);
					break;
				}
			}
			if (code != 0 && code != 1) {
				ret.pop();
				// handle error
				switch (code) {
					case 2:
						ret.push("TLE");
						break;
					case 3:
						ret.push("MLE");
						break;
					case 4:
						break;
					case 5:
						ret.push("OLE");
						break;
					case 6:
						ret.push("CE");
						break;
					case 7:
						ret.push("IR");
						break;
					default: {
						// check for bitflags
						if (code == 24) {
							ret.push("RTE (Segmentation Fault)");
						} else if (code == 40) {
							ret.push("RTE (Floating Point Error)");
						} else if (code == 72) {
							ret.push("RTE (Aborted)");
						} else if (code == 136) {
							ret.push("RTE (disallowed system call)");
						} else {
							ret.push("RTE");
						}
					}
				}
			}
			// remove code file and output
			// chdir into dir
			let c = cwd();
			chdir(dir);
			if (lang != 'py')
				fs.rmSync(code_file);
			try {
				fs.rmSync("output.txt");
			} catch {}
			try {
				fs.rmSync("a.out");
			} catch {}
			chdir(c);
			console.log(ret);
			resolve(ret);
		});
		// child_proc.execFile('../judging-backend/judge', [lang, dir], (err, stdout, stderr) => {
		// 	console.log(err);
		// 	console.log("stdout: ", stdout);
		// 	// console.log("stderr: ", stderr);
		// 	for (let line of stdout.split('\n')) {
		// 		if (line.match(/^\d+ \d+$/)) {
		// 			ret.push(`AC ${line}`);
		// 		} else if (line.match(/^\d+ \d+ WA$/)) {
		// 			ret.push(`WA ${line.substring(0, line.length - 3)}`);
		// 		} else if (line.length > 0) {
		// 			ret.push(`IE ${line}`);
		// 			break;
		// 		}
		// 	}
		// 	if (err) {
		// 		ret.pop();
		// 		// handle error
		// 		switch (err.code) {
		// 			case 1:
		// 				break;
		// 			case 2:
		// 				ret.push("TLE");
		// 				break;
		// 			case 3:
		// 				ret.push("MLE");
		// 				break;
		// 			case 4:
		// 				break;
		// 			case 5:
		// 				ret.push("OLE");
		// 				break;
		// 			case 6:
		// 				ret.push("CE");
		// 				break;
		// 			case 7:
		// 				ret.push("IR");
		// 				break;
		// 			default: {
		// 				// check for bitflags
		// 				if (err.code == 24) {
		// 					ret.push("RTE (Segmentation Fault)");
		// 				} else if (err.code == 40) {
		// 					ret.push("RTE (Floating Point Error)");
		// 				} else if (err.code == 72) {
		// 					ret.push("RTE (Aborted)");
		// 				} else if (err.code == 136) {
		// 					ret.push("RTE (disallowed system call)");
		// 				} else {
		// 					ret.push("RTE");
		// 				}
		// 			}
		// 		}
		// 	}
	});
	return p;
}

exports.judge = judge;