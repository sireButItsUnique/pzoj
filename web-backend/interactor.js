const child_proc = require('child_process');
const { cwd, chdir } = require('process');
const fs = require('fs');

function judge(code_file, lang, dir, ws) {
	let child = child_proc.execFile('../judging-backend/judge', [lang, dir]);
	let buffer = "";
	child.stdout.on('data', (chunk) => {
		if (buffer) {
			if (buffer.match(/^\d+ \d+$/)) {
				ws.send(`AC ${buffer}`);
			} else if (buffer.match(/^\d+ \d+ WA$/)) {
				ws.send(`WA ${buffer.substring(0, buffer.length - 3)}`);
			} else if (buffer.length > 0) {
				ws.send(`IE ${buffer}`);
			}
			console.log(buffer);
		}
		buffer = chunk.split('\n')[chunk.split('\n').length - 2];
	});
	child.stderr.on('data', (chunk) => {
		console.error(chunk);
	});
	child.on('exit', (code) => {
		if (code != 0 && code != 1 && code != 4) {
			// handle error
			switch (code) {
				case 2:
					buffer = "TLE";
					break;
				case 3:
					buffer = "MLE";
					break;
				case 5:
					buffer = "OLE";
					break;
				case 6:
					buffer = "CE";
					break;
				case 7:
					buffer = "RTE";
					break;
				default: {
					// check for bitflags
					if (code == 24) {
						buffer = "RTE (Segmentation Fault)";
					} else if (code == 40) {
						buffer = "RTE (Floating Point Error)";
					} else if (code == 72) {
						buffer = "RTE (Aborted)";
					} else if (code == 136) {
						buffer = "RTE (disallowed system call)";
					} else {
						buffer = "RTE";
					}
				}
			}
		} else {
			if (buffer.match(/^\d+ \d+$/)) {
				buffer = `AC ${buffer}`
			} else if (buffer.match(/^\d+ \d+ WA$/)) {
				buffer = `WA ${buffer.substring(0, buffer.length - 3)}`;
			} else if (buffer.length > 0) {
				buffer = `IE ${buffer}`;
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
		ws.send(buffer);
		ws.send(buffer.split(' ')[0]);
		ws.close();
	});
}

exports.judge = judge;