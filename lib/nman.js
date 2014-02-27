var fs = require('fs');
var stage = require('node-stage');
var colors = require('colors');
var nman = {}

module.exports = nman;

nman.list = function() {
	fs.readdir('node_modules', function(err, files) {
		if(err){
			stage.error(err)
		}else {
			stage.success('Listing all the npm modules in node_modules folder\n');
			
			for(var i = 0; i < files.length; i++) {
				console.log('- '.yellow + files[i]);
			}
		}
	})
}
