var http = require('http');
var path = require('path');
var fs = require('fs');

http.createServer(function (request, response) {

	if (!request.url || request.url == "/")
		filename = "/index.html";
	else
		filename = request.url;

	var filename;
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
