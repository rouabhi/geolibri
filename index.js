/*

	geolibri.js

*/


	var R = 6367445; // Earth average Radius
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
	}
	exports.distance = distance;

	/** constructor of point(). Possible syntaxes are:
		 - point(lat,lng)
		 - point(LatLng)
		 - point(LatLnghLiteral)
		 - point( Point )
	 **/
	function point(lat,lng, factor){
		var Lat, Lng;

		factor = factor || 1;
		
		if (typeof lat === "number" ) {Lat = lat*factor; Lng = lng*factor;}
		else if (lat && (lat.isType === "POINT")) {
		      Lat = lat.lat();
		      Lng = lat.lng();
	    }
		else if (lat) {
			Lat=(lat.lat || lat.latitude || 0)*factor;
			Lng=(lat.lng || lat.lon || lat.longitude || 0)*factor;
		}
		else return null; // unknown: error

		var exports = {};

		exports.lat = function(){return Lat;};
		exports.lng = function(){return Lng;};
		exports.latlng = function(){return {lat:Lat,lng:Lng};};
		exports._lat = function(){return deg2rad(Lat);};
		exports._lng = function(){return deg2rad(Lng);};
		exports.toString = function(){return JSON.stringify({lat:Lat, lng:Lng});};

		function North(d){var delta=rad2deg(d/R); return point( Lat + delta, Lng );}
		function South(d){var delta=rad2deg(d/R); return point( Lat - delta, Lng );}
		function East(d){var delta=rad2deg(d/R); return point( Lat , Lng + rad2deg(Math.acos(1-(1 - Math.cos(d/R))/Math.pow(Math.cos(deg2rad(Lat)),2))) ); }
		function West(d){var delta=rad2deg(d/R); return point( Lat , Lng - rad2deg(Math.acos(1-(1 - Math.cos(d/R))/Math.pow(Math.cos(deg2rad(Lat)),2))) ); }
		function set(point){ lat = point.lat(); Lng = point.lng(); return this; }

		exports.N = North;
		exports.S = South;
		exports.E = East;
 		exports.O = West;
 		exports.W = West;
 		exports.distance = function(P, unit, precision){return distance( exports, P, unit, precision);};
 		exports.move = function( dir, dist ){
 			var result = null;
 			switch(dir){
	 			case 'N' : set( North( dist ) ); break;
	 			case 'S' : set( South( dist ) ); break;
	 			case 'E' : set( East( dist ) ); break;
	 			case 'W' :
	 			case 'O' : set( West( dist ) ); break;
	 		}
	 		return this;
 		};
 		exports.bounds = function( dist ){
 			var SW = exports.S(dist).W(dist);
 			var NE = exports.N(dist).E(dist);
 			return {minlat:SW.lat(), maxlat:NE.lat(), minlng:SW.lng(), maxlng:NE.lng()};
 		};
 		exports.isType = "POINT";
		return exports;
	}
	exports.point = point;
	exports._point = function(lat,lng){return point(lat , lng, rad2deg(1));};
