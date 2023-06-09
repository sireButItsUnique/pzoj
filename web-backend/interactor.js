const child_proc = require('child_process');
const { cwd, chdir } = require('process');
const fs = require('fs');

function judge(code_file, lang, dir, ws) {
	let child = child_proc.execFile('../judging-backend/judge', [lang, dir]);
	let buffer = "";
	let time = 0;
	let mem = 0;
	child.stdout.on('data', (chunk) => {
		if (buffer) {
			if (buffer.match(/^\d+ \d+$/)) {
				ws.send(`AC ${buffer}`);
				mem = Math.max(mem, parseInt(buffer.split(' ')[0]));
				time += parseInt(buffer.split(' ')[1]);
			} else if (buffer.match(/^\d+ \d+ WA$/)) {
				ws.send(`WA ${buffer.substring(0, buffer.length - 3)}`);
				mem = Math.max(mem, parseInt(buffer.split(' ')[0]));
				time += parseInt(buffer.split(' ')[1]);
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
	return new Promise((resolve) => {
		child.on('exit', (code) => {
			if (code != 0 && code != 1 && code != 4) {
				// handle error
				switch (code) {
					case 2:
						buffer = "TLE 0 0";
						break;
					case 3:
						buffer = "MLE 0 0";
						break;
					case 5:
						buffer = "OLE 0 0";
						break;
					case 6:
						buffer = "CE 0 0";
						break;
					case 7:
						buffer = "RTE 0 0";
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
					mem = Math.max(mem, parseInt(buffer.split(' ')[0]));
					time += parseInt(buffer.split(' ')[1]);
					buffer = `AC ${buffer}`
				} else if (buffer.match(/^\d+ \d+ WA$/)) {
					mem = Math.max(mem, parseInt(buffer.split(' ')[0]));
					time += parseInt(buffer.split(' ')[1]);
					buffer = `WA ${buffer.substring(0, buffer.length - 3)}`;
				} else if (buffer.length > 0) {
					buffer = `IE ${buffer}`;
				}
			}
			// remove code file and output
			// chdir into dir
			let c = cwd();
			chdir(dir);
			if (lang != 'py') {
				try {
					fs.rmSync(code_file);
				} catch {}
			}
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
			console.log(time, mem, buffer.split(' ')[0]);
			resolve([time, mem, buffer.split(' ')[0]]);
		});
	});
}

exports.judge = judge;