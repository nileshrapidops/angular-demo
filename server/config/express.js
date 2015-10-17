/**
 * Express configuration
 */

'use strict';
module.exports = function(app){
	var express = require('express');
	var bodyParser = require('body-parser');
	var methodOverride = require('method-override');
	var cookieParser = require('cookie-parser');
	var path = require('path');
	var config = require('./environment/development');
	var session = require('express-session');
	var MongoStore = require('connect-mongo')(session);
	var request = require('request');
	var fs=require('fs');

	app.use(bodyParser.json({type:'application/*+json', limit:'50mb'}));
	app.use(bodyParser.json({type:'application/json', limit:'50mb'}));
	app.use(bodyParser.urlencoded({extended:false, limit:'50mb'}));

	var env = app.get('env');
	app.set('view engine', 'html');


	//Setup Excpetions
	global.EXCEPTION_MESSAGES=JSON.parse(fs.readFileSync(ROOT_PATH+DS+'config'+DS+'exceptions.js'));
	global.Exception=require('../system/libraries/exception.js').Exception;

	//Setup Response handing
	var Response=require('../system/libraries/response.js').Response;
	var response = new Response();
	app.use(response.handler());

	//Setup MongoDB Models
	require('./mongo.js');

	//Setup Cookies and session handling
	var mongo = {
		dbHost:config.mongo.dbHost,
		dbName:config.mongo.dbName,
		dbUser:config.mongo.dbUser,
		dbPassword:config.mongo.dbPassword
	};
	app.use(express.static(__dirname+"/../../client"));
	// app.use(express.static(path.join(config.root, 'client')));
	// app.set('appPath', config.root + '/client');


	global.SetupAdminRoutes = function(app){
		fs.readdirSync(ROOT_PATH + '/admin').filter(function(file){
			var stats = fs.statSync(ROOT_PATH + '/admin/' + file);
			return (file.indexOf('.') !== 0 && stats.isDirectory());
		}).forEach(function(file){
			var tmpRoute = require(ROOT_PATH + '/admin/' + file);
			tmpRoute(app);
		});
	};
};