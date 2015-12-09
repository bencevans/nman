var fs = require('fs');
var stage = require('node-stage');
var colors = require('colors');
var consoul = require('consoul');
var async = require('async');
var path = require('path');
var npm  = require('npm');
var nman = {}

module.exports = nman;

function modulesPath(opts, callback) {
	npm.load({
		global: opts.globalModules
	}, function (err) {
		if (err) {
			return callback(err)
		}
		callback(null, npm.root)
	})
}

nman.list = function(opts) {
	modulesPath(opts, function (err, basePath) {
		if (err) {
			stage.error('Unable to determine node_modules directory')
			stage.error(err)
			return process.exit(1)
		}
		fs.readdir(basePath, function(err, files) {
			if(err){
				stage.error(err)
			}else {
				stage.success('Listing all the npm modules in node_modules folder\n');

				for(var i = 0; i < files.length; i++) {
					console.log('- '.yellow + files[i]);
				}
			}
		})
	})
}

nman.man = function(module, opts) {
	if(!module) {
		stage.error('Usage: nman <a node module>');
		stage.error('Example: nman express');
		process.exit(1);
	}

	modulesPath(opts, function (err, basePath) {
		fs.readdir(basePath + '/' + module, function(err, files) {
			if(err){
				stage.error('Can\'t find module ' + module);
				stage.error(err);
			}else {
				var readme_file
				async.each(files, function(item, cb) {
					// finding readme.md
					var reg = new RegExp(/readme.md/i)
					var exe = reg.exec(item)
					if(exe)
						readme_file = exe;
					cb()
				}, function(err) {
					if(err)
						stage.error(err)
					if(readme_file) {
						process.stdout.write(consoul.fromFileSync(path.resolve(basePath + '/' + module + '/' + readme_file[0])));
					}else {
						stage.error('Can\'t find any readme.md file')
					}
				})

			}
		})
	})

}
