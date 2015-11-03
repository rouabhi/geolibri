/*

var geo = require('geolibri');
var Oran = geo.point(35.702788 , -0.649256 );
var Alger = geo.point( 36.7525000, 3.0419700);
var Bejaia = geo.point( 36.75, 5.0666667);

console.info( "Alger-Oran : " , geo.dist( Oran, Alger, "km" , 3) );
console.info( "Alger-Bejaia : " , (geo.dist( Alger, Bejaia, "km", 3 )) );
console.info( "Bejaia-Bejaia : " , geo.dist( Alger.E(180000), Bejaia, "km", 3 ) );

console.info( "Bejaia-Bejaia : " , (latlng.dist( {lat:36.7525000, lng:3.0419700},
 {lat:36.75, lng:5.0666667} )/1000).toFixed(2) );
*/


	var R = 6367445;
	var units = { "m":1, "km":1000, "mile":1609.344, "NM":1852 };

	function deg2rad(val){
		return val*Math.PI/180;
	}
	exports.deg2rad = deg2rad;

	function rad2deg(val){
		return val*180/Math.PI;
	}
	exports.rad2deg = rad2deg;

	/* P1 & P2 are "point" objects,
	   unit & precision are optional */
	function distance(P1, P2, unit, precision){
		var p1 = point(P1);
		var p2 = point(P2);
		var a = p1._lat();
		var b = p2._lat();
		var c = p1._lng();
		var d = p2._lng();
		var factor = units[unit]||1;
		var dist = R * Math.acos( Math.sin(a)*Math.sin(b)+Math.cos(a)*Math.cos(b)*Math.cos(c-d) ) / factor;
		if (typeof precision == "number") dist = parseFloat( dist.toFixed(precision));
		return dist;
	};
	exports.dist = distance;

	/** constructor of point(). Possible syntaxes are:
		 - point(lat,lng)
		 - point(LatLng)
		 - point(LatLnghLiteral)
		 - point( Point )
	 **/
	function point(lat,lng){
		var Lat, Lng;
		
		if (typeof lat === "number" ) {Lat = lat; Lng = lng;}
		else if (lat && (lat.isType === "POINT")) return lat;
		else if (lat) {Lat=lat.lat || lat.Lat; Lng=lat.lng || lat.Lng; }  // LatLngLiteral
		else return null; // unknown

		var exports = {};

		exports.lat = function(){return Lat;};
		exports.lng = function(){return Lng;};
		exports.latLng = function(){return {lat:Lat,lng:Lng};};
		exports._lat = function(){return deg2rad(Lat);};
		exports._lng = function(){return deg2rad(Lng);};
		exports.toString = function(){return JSON.stringify({lat:Lat, lng:Lng});};

		function North(d){var delta=rad2deg(d/R); return point( Lat + delta, Lng );}
		function South(d){var delta=rad2deg(d/R); return point( Lat - delta, Lng );}
		function East(d){var delta=rad2deg(d/R); return point( Lat , Lng + rad2deg(Math.acos(1-(1 - Math.cos(d/R))/Math.pow(Math.cos(deg2rad(Lat)),2))) ); }
		function West(d){var delta=rad2deg(d/R); return point( Lat , Lng - rad2deg(Math.acos(1-(1 - Math.cos(d/R))/Math.pow(Math.cos(deg2rad(Lat)),2))) ); }

		exports.N = North;
		exports.S = South;
		exports.E = East;
 		exports.O = West;
 		exports.W = West;
 		exports.dist = function(P, unit, precision){return distance( exports, P, unit, precision);};
 		exports.move = function( dir, dist ){
 			var result = null;
 			switch(dir){
	 			case 'N' : result = North( dist ); break;
	 			case 'S' : result = South( dist ); break;
	 			case 'E' : result = East( dist ); break;
	 			case 'W' :
	 			case 'O' : result = West( dist ); break;
	 		}
	 		return result;
 		};
 		exports.isType = "POINT";
		return exports;
	}
	exports.point = point;
	exports._point = function(lat,lng){return point(rad2deg(lat) , rad2deg(lng));};
