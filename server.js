var http = require('http');
var path = require('path');
var fs = require('fs');

http.createServer(function (request, response) {

	var filename = request.url || "index.html";
	var ext = path.extname(filename);
	var localPath = __dirname;
	var validExtensions = {
		".html" : "text/html",
		".js" : "text/javascript",
		".css" : "text/css",
		".txt" : "text/plain",
		".jpg" : "image/jpeg",
		".gif" : "image/gif",
		".png" : "image/png"
	};

	var isValidExt = validExtensions[ext];

	if (isValidExt) {
		
		localPath += filename;
		path.exists(localPath, function(exists) {
			if(exists) {
				console.log("Serving file: " + localPath);
				getFile(localPath, response, ext);
			} else {
				console.log("File not found: " + localPath);
				response.writeHead(404);
				response.end();
			}
		});
 
	} else {
		console.log("Invalid file extension detected: " + ext);
	}

	/*
	var body =	'<!DOCTYPE html>' +
				'<html>' +
				'<head>' +
				'<meta http-equiv="Content-Type" content="text/html; ' +
				'charset=UTF-8" />' +
				'<title>Welcome to my EC2 Site!</title>' +
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
	*/

}).listen(8080);

function getFile(localPath, res, mimeType) {
	fs.readFile(localPath, function(err, contents) {
		if(!err) {
			res.setHeader("Content-Length", contents.length);
			res.setHeader("Content-Type", mimeType);
			res.statusCode = 200;
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
}

console.log('Server running at port 8080.');
