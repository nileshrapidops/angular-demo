global.assert=require('assert');
global.should=require('should');
global.mocha=require('mocha');
global.frontTestConfig = require('../server/config/environment/development');

// // frontend-testcases browser options
// global.browserOptions = {
// 	// host: 'saucelabs.com',
// 	// user: 'mr-nileshmistry',
// 	// key: 'be02d961-aa39-4bea-a6fd-27f80bc2cc7a',
//     desiredCapabilities: {
//         browserName: frontTestConfig.automatedTest.browser.name // set browser
//     }
// };
GLOBAL.host = 'http://'+frontTestConfig.server.host+':'+frontTestConfig.server.port;
global.client = browser;
global.errorScreenShot = function(err, message){
	if(err){
		var dt = new Date();
		var img_path='error-images/'+(dt.getTime().toString())+'_img-error.png';
		client.saveScreenshot(img_path,function(screenshotErr,img){
			assert.equal(null, err, message);
			return;
		});
	}
}
// incluse common files
global.Login = require('./common/login.js');
// included test files

/******************** login screen start *************************/
require('./login/login.spec.js');
/******************** login screen end *************************/
require('./product/product-list.spec.js');