"use strict";

var assert = require('core-assert'),
    json = require('nano-json'),
    timer = require('nano-timer'),
    Promise = require('nano-promise'),
    util = require('util');


/* ------------------------------------------------------------------------ */
function Logger(stage, job) {

	this.stage = stage;
	this.job = job;
	this.acc = [];
	this.dumps = [];

	var context = this.context = job.sched.name + ':' + job.name + '#' + stage;


	this.log = function (code, format, a, b, etc) {
		acc.push(util.format('  %s: %s', context, util.format.apply(util.format, Array.prototype.slice.call(arguments, 1))));
	};

	this.trace = function () {
		this.log.apply(this, Array.prototype.concat.apply(['trace'], arguments));
	};

	this.warn = function (code, format, a, b, etc) {
		acc.push(util.format('W.%s: warning: %s', context, util.format.apply(util.format, Array.prototype.slice.call(arguments, 1))));
	};

	this.error = function (format, a, b, etc) {
		acc.push(util.format('E.%s: error: %s', context, util.format.apply(util.format, Array.prototype.slice.call(arguments, 1))));
	};

	this.fail = function (format, a, b, etc) {
		acc.push(util.format('F.%s: FAIL: %s', context, util.format.apply(util.format, arguments)));
	};

	this.writeListing = function (name, data) {
		this.dumps.push({
			name: name, 
			data: data
		});

		return Promise.resolve();
	};
}

Logger.prototype = {
};



var debug_plugin = require('../index.js'),
	opts = {
			dist_folder: __dirname+'/dist',
			sources_folder: __dirname+'/src',
			dumps_folder: __dirname+'/logs',
		},
    job = {
		name: 'test',
		sched: {
			name: 'test',
			opts: opts
		}
	};

suite('debug', function () {
	test('repl', function (done) {
		var log = new Logger('debug.repl', job),
		    data = {
					opts: opts,
					encoding: 'utf8',
					content: '{ a:1 }',
					result: { a: 1 }
				};

		Promise.resolve(log, data)
			.then(debug_plugin.repl)
			.then(function () {
				done();
			}).catch(done);
	});
});
