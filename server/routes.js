/*
 * Main application routes
 */
'use strict';
var path=require('path');
module.exports = function(app){

	app.get('/logout', function(req, res){
		res.redirect('/#/login');
	});
	app.get('/login',function(req,res){
	});
	app.get('/checkLogin',function(req,res){
	});
	global.SetupAdminRoutes(app);
};
