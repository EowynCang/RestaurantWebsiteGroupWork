var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var info = "abc";

var http = require("http");
var querystring = require('querystring');


http.createServer(function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mbfFinal");
    


      if (req.url == "/login") {
        dbo.collection("users").find({}).toArray(
          function (err, result) {
            info = JSON.stringify(result, ["username", "password"]);
            res.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "http://localhost:4200"});
            res.write(info); // json
            res.end();
            console.log(info);
          }
        );        
      }


      else if (req.url == "/signup") {
        res.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "http://localhost:4200"});
        var postData = '';
        req.on('data', function (data) {
          postData += data;
        }).on('end', function () {
          if (postData !== '') {
            var params = querystring.parse(postData);
            
            var myobj = {username: params['username'], password: params['password']};
            dbo.collection("users").insertOne(myobj, function (err, res) {
              if (err) throw err;
              console.log("Insert success!");
            });
          }
        });
      }

      else if (req.url == "/addrecipe") {
        res.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "http://localhost:4200"});
        var postData = '';
        req.on('data', function (data) {
          postData += data;
        }).on('end', function () {
          if (postData !== '') {
            var params = querystring.parse(postData);
            // console.log(params[ingredients]);
            console.log(params);
            var size = Object.keys(params).length;
            console.log(size);
            
            var myobj = {name: params['name'], imagePath: params['imagePath'], desc: params['desc'], calorie: params['calorie'], user: params['user']};
            for (i = 0; i < size - 5; i = i + 2) {
              console.log('ing' + i);
              console.log(Object.keys(params)[5 + i]);
              myobj['ing'+i] = params[Object.keys(params)[5 + i]];
              myobj['amt'+i] = params[Object.keys(params)[5 + i + 1]];
            }

            console.log(myobj);

            dbo.collection("recipes").insertOne(myobj, function (err, res) {
              if (err) throw err;
              console.log("Insert success!");
            });
          }
        });
      }

      else if (req.url == "/putsl") {
        res.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "http://localhost:4200"});
        var postData = '';
        req.on('data', function (data) {
          postData += data;
        }).on('end', function () {
          if (postData !== '') {
            var params = querystring.parse(postData);
            console.log(params);
            var size = Object.keys(params).length;
            console.log(size);
            
            var myobj = {name: params['name'], imagePath: params['imagePath'], desc: params['desc'], calorie: params['calorie'], user: params['user']};
            for (i = 0; i < size - 5; i = i + 2) {
              console.log('ing' + i);
              console.log(Object.keys(params)[5 + i]);
              myobj['ing'+i] = params[Object.keys(params)[5 + i]];
              myobj['amt'+i] = params[Object.keys(params)[5 + i + 1]];
            }

            console.log(myobj);

            dbo.collection("recipes").insertOne(myobj, function (err, res) {
              if (err) throw err;
              console.log("Insert success!");
            });
          }
        });
      }

      else if (req.url == "/getrecipe") {
        dbo.collection("recipes").find({}).toArray(
          function (err, result) {
            info = JSON.stringify(result);
            res.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "http://localhost:4200"});
            res.write(info); // json
            res.end();
            console.log(info);
          }
        );        
      }

      else if (req.url == "/getsl") {
        console.log(req.query);
        dbo.collection("shopping-list").find({}).toArray(
          function (err, result) {
            info = JSON.stringify(result);
            res.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "http://localhost:4200"});
            res.write(info); // json
            res.end();
            console.log(info);
          }
        );        
      }
      


      // res.end();
      // db.close();
    // });
  });
}).listen(1337, function () {
  console.log("Listening 1337 login...");
});


