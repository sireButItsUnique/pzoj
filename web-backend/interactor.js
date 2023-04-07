const child_proc = require('child_process');
const fs = require('fs');
const { chdir } = require('process');
const { cwd } = require('process');

function judge(code_file, lang, dir) {
	let p = new Promise((resolve, reject) => {
		let ret = [];
		child_proc.execFile('../judging-backend/judge', [lang, dir], (err, stdout, stderr) => {
			console.log(err);
			for (let line of stdout.split('\n')) {
				if (line.match(/^\d+ \d+$/) && err == undefined) {
					ret.push(`AC ${line}`);
				} else if (line.match(/^\d+ \d+ WA$/)) {
					ret.push(`WA ${line.substring(0, line.length - 3)}`);
				} else if (line.length > 0) {
					ret.push(`IE ${line}`);
					break;
				}
			}
			if (err) {
				ret.pop();
				// handle error
				switch (err.code) {
					case 1:
						break;
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
						if (err.code & (1 << 5)) {
							ret.push("RTE (Segmentation Fault)");
						} else if (err.code & (1 << 6)) {
							ret.push("RTE (Floating Point Error)");
						} else if (err.code & (1 << 7)) {
							ret.push("RTE (Aborted)");
						} else if (err.code & (1 << 8)) {
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
	});
	return p;
}

exports.judge = judge;