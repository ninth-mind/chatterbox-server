/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

  var messages={
  
   };

  var responseData = function(response, code, data) {
    response.writeHead(code, headers);
    response.end(data);
  };

var headers = defaultCorsHeaders;
headers['Content-Type'] = "application/json";


var Router = {
  'GET': function(request, response){
    if(validRequest(request.url)){
      var data = JSON.stringify(messages[request.url])
      responseData(response ,200, data);
    }
  },
  'POST': function(request, response){
    var fullbody = '';
    if(validRequest(request.url)){
      request.on('data', function(data){
        fullbody+=data;
      })
      request.on('end',function () {
       var refromed= JSON.parse(fullbody);
       messages[request.url].results.push(refromed);
      })
      responseData(response,201,'posted')
    }
  }
}

var validRequest = function(url){
  if(url.indexOf('classes') > -1){
    if(messages[url] === undefined){
      messages[url] = { results : [] };
    }
    return true;
  }
  return false;
}

// Routes.get('/classes/messages', function(req, res) {
//   response.writeHead(200, headers);
//   response.end(messages);
// })


exports.requestHandler = function(request, response) {

  // if(routes[request.method]){
  //   if(rountes[request.method][request.url]){
  //     routes[request.url](request, response)
  //   }
  // } else {
  //   response.writeHead(501, headers)
  //   response.end()
  // }

  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log("Serving request type " + request.method + " for url " + request.url);

  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
 

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.


  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.


  

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  
  // console.log(routes[request.method][request.url]);

  if(Router[request.method]){
    Router[request.method](request,response);
  }else{
    response.writeHead(404, headers);
    response.end("Hello, World!");
  }


  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

