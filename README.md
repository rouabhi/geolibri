# varsession #

**varsession** offers a very simple way to manage *Session Variables* with node.js when using ```express.js```

## How does it work? ##
First, you have to activate session management using  _express-session_ middleware. 
```javascript
var express = require('express');
var app = express();
var session = require('express-session');

app.use( session({secret:'mySecretKey', cookie: { maxAge: 600000 }, resave:false, saveUninitialized:true});
```

With this lines, sessions are now managed. This means that you have a separate environment for each connection opened in the server. In this environment, you can now create session variables to store data throughout requests to the server.

## How? ##
**varsession** offers simple functions to define session variables:

```javascript
var varSession = require('varsession');

function setVariables(req,res){
    var varsession = varSession(req);

    // we define here session variables named "name" and "surname"
    varsession("name","ROUABHI");
    varsession("surname","Samir");
    res.status(200).send("Variables defined.").end();
}

function getVariables(req,res){
    var varsession = varSession(req);

    // we use now session variables
    res.status(200).send("My name is :"+ varsession("surname") + " " + varsession("name")).end();
}

app.get("/set" , setVariables);
app.get("/get" , getVariables);
```

Beware : the session variables are stored in cookies so they are registred only when there is a HTTP response.

## Different possibilities ##
 - ```varsession()``` returns all the variables of the session
 - ```varsession('variable')``` gets the value of a variable
 - ```varsession('variable',{value})``` sets a value in a variable
 - ```varsession('variable',null)``` deletes a variable
 - ```varsession('variable','field')``` gets a value in a field of a variable. is similar to ```varsession('variable')['field']```
 - ```varsession('variable','field',{value})``` sets a value in a field of a variable.

Old functions of v0.1 ```.set```, ```.get```, ```.clear``` and ```.setAttr``` are now deprecated.

## Other fonctions ##
2 other fonctions currently available:
```javascript
var varsession = varSession(req);

// destroys the session and all session variables defined
varsession.abandon();

// returns the ip address of the device that made the request.
console.log( varsession.ip() );
```