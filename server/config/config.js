var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		rootPath: rootPath,
		db: 'mongodb://localhost/ligasbs',
		port: process.env.PORT || 3030
	},
	production: {
		rootPath: rootPath,
		db: 'mongodb://pepe:perez@kahana.mongohq.com:10079/ligasbs',
		port: process.env.PORT || 80
	}
}