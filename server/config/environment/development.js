'use strict';
module.exports = {
	// MongoDB connection options
	server:{
		port:9092,
		host:'0.0.0.0',
		protocol:'http://'
	},
	mongo:{
		dbHost:[{host:'127.0.0.1'}],
		dbName:'angular_demo',
		dbUser:'',
		dbPassword:''
	},
	automatedTest: {
		browser: {
	        name: 'firefox',
	        height: 750,
	        width: 1024
	    },
	    auth: {
	    	email: 'test@admin.com',
	    	password: 'admin'
	    }
	}
};
