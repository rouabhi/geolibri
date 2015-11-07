# geolibri #

**geolibri** is a simple Node.js package that provides some geo features.

## Using package ##

```javascript
var geo = require('geolibri');
```

## Available functions ##
 - ```deg2rad``` 
 Conversion of degrees to radians.
 - ```rad2deg```
 Radians to degrees conversion.

```javascript
console.log(" 180° in radians = ",geo.deg2rad(180));
console.log(" 1 radian in degrees = ",geo.rad2deg(1));
```

 - ```point(...)```
 Creates a **point** object defined by _latitude_ and _longitude_.

 Possible syntax:

    ```javascript
    var P1 = geo.point(latitude, longitude);
    var P2 = geo.point({"latitude":lat , "longitude":lng});
    var P3 = geo.point({"lat":lat , "lng":lng});
    ```

We can also give latitude and longitude in *radians* using ```_point()``` instead of ```point()```.

It is also possible to initialize a point from another one:
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

- ```move( dir, distance )```
This function moves the current point into the indicated direction and the given distance (in meters). The change is applied to the current point and the returned value is the point itself, to chain functions.

```javascript
    var P = geo.point(latitude, longitude);
    P.move('N' , 1000 ); // P is moved 1 km to the north
    P.move('E' , 1000 ); // P is then moved 1 km to the east
    P.move('S' , 2350 ).move('W' , 1500 ); // P is now moved 2.35 km to the south and 1.5 km to the west
```

- ```.distance( point )```

Gives the distance from a point to another one.
```javascript
    var P = geo.point(lat1, lng1 );
    var Q = geo.point(lat2, lng2 );

    console.log("Distance from P to Q : ",P.distance(Q, unit, precision));
```

**Optional parameters :** *unit* is one of 'm' (meters, default), 'km' (kilometers), 'mile' (miles), 'NM' (nautic miles). *Precision* is the number of decimals.

This function can also be called this way:

```javascript
    var geo = require('geolibri');
    var Algiers = geo.point(36.7525000,3.0419700);
    var InGuezzam = geo.point(19.566632, 5.754432)
    console.log("Distance from Algiers(DZ) to In Guezzam(DZ) is : ",geo.distance(Algiers, InGuezzam, "km", 3), " km");
```

- ```bounds( dist )```
Returns the coordinates of a square with distance *dist* east, west, north and south of the current point.

```javascript
    var geo = require('geolibri');
    var InGuezzam = geo.point(19.566632, 5.754432)
    console.log("Coordinates of points 10km arround In Guezzam(DZ): ", InGuezzam.bounds( 10000 ));
```

Result:
```javascript
    {
      minlat: 19.476649629499615,
      maxlat: 19.65661437050038,
      minlng: 5.658988084369061,
      maxlng: 5.849982527975235
    }
```
