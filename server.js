var http = require('http');

http.createServer(function (request, response) {

	var body =	'<!DOCTYPE html>' +
				'<html>' +
				'<head>' +
				'<meta http-equiv="Content-Type" content="text/html; ' +
				'charset=UTF-8" />' +
				'<title>Welcome to my EC2 Site' +
				'</head>' +
				'<body style="background-color:#333333;">' +
				'<div style="width:100%; color:#FFFFFF; text-align:center; font-family:Arial;">' +
					'Welcome to my EC2 Site!' +
				'</div>' +
				'</body>' +
				'</html>';
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(body);
	response.end();

}).listen(8080);

console.log('Server running at port 8080.');