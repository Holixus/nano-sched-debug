"use strict";

var Promise = require('nano-promise'),
    repl = require('repl'),
    Path = require('path');

module.exports = {

repl: function (log, data) {
	return new Promise(function (resolve, reject) {
		var rl = repl.start({ prompt: log.stage+'> ', useGlobal: 1, ignoreUndefined: 1, useColors: 1 }),
		    ctx = rl.context;
		ctx.data = data;
		ctx.seq = seq;
		rl.on('exit', function () {
			resolve();
		});
		require('repl.history')(rl, Path.join(data.opts.dumps_folder, '.history'));
	});
},

'dump-data': function (log, data) {
	return log.writeListing('data', data);
},

'dump-opts': function (log, data) {
	return log.writeListing('opts', opts);
}

};
