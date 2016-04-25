"use strict";

var Promise = require('nano-promise'),
	fs = require('nano-fs'),
    repl = require('repl'),
    Path = require('path');

module.exports = {

repl: function (log, data) {
	return new Promise(function (resolve, reject) {
		var rl = repl.start({ prompt: log.context+'> ', useGlobal: 1, ignoreUndefined: 1, useColors: 1 }),
		    ctx = rl.context;
		ctx.log = log;
		ctx.data = data;
		rl.on('exit', function () {
			resolve();
		});
		fs.mkpath(data.opts.dumps_folder)
			.then(function () {
				require('repl.history')(rl, Path.join(data.opts.dumps_folder, '.history'));
			})
	});
},

'dump-data': function (log, data) {
	return log.writeListing('data', data);
},

'dump-opts': function (log, data) {
	return log.writeListing('opts', opts);
}

};
