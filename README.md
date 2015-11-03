# geolibri #

**geolibri** is a simple Node.js package that provides some geo features.

## Using package ##

```javascript
var geo = require('geolibri');
```

## Available functions ##
 - ```deg2rad``` & ```rad2deg```
 Unit conversion: degrees to radians and vice-versa.
```javascript
console.log(" 180° in radians = ",geo.deg2rad(180));
console.log(" 1 radian in degrees = ",geo.rad2deg(1));
```

 - ```point(...)```
 Creates a **point** object defined by _latitude_ and _longitude_.

 Many syntaxes are possible:
    ```javascript
    var P = geo.point(latitude, longitude);
    var P1 = geo.point({"latitude":lat , "longitude":lng});
    var P2 = geo.point({"lat":lat , "lng":lng});
    ```

For convenience, it is also possible to initialize a point by another:
    var P1 = geo.point(latitude, longitude);
    var P2 = geo.point(P1);

## point() methods ##

    - ```.lat()```, ```.lng()```, ```.latlng()```
To get *latitude*, *longitude* or a *{lat,lng}* object 

    - ```._lat()```, ```._lng()```
To get *latitude* or *longitude* in radians. 

    - ```.N( dist )```, ```.E( dist )```, ```.S( dist )```, ```.W( dist )```
Returns a new point that is from a distance *dist* to the North, East, South or West.

West function can also be called by ```.O( dist )```.

*dist* is expressed in meters.

Another way to call these functions is:

```javascript
    var P = geo.point(latitude, longitude);
    var A = P.move('N' , 1000 ); // A is a point situated 1 km north of P
    var B = P.move('E' , 1000 ); // B is a point situated 1 km east of P
    var C = P.move('S' , 1000 ); // C is a point situated 1 km south of P
    var D = P.move('W' , 1500 ); 
    var E = P.move('O' , 1500 ); // D & E are points situated 1.5 km west of P
```

    - ```.distance( point )```
Gives the distance from a point to another one.
```javascript
    var P = geo.point(lat1, lng1 );
    var Q = geo.point(lat2, lng2 );

    console.log("Distance from P to Q : ",P.distance(Q, unit, precision));
```

**Optional parameters :** *unit* is one of 'm' (meters), 'km' (kilometers), 'mile' (miles), 'NM' (nautic miles). *Precision* is the number of decimals.

This function can also be called this way:

```javascript
    console.log("Distance from P to Q : ",geo.distance(P, Q, "km", 3), " km");
```
