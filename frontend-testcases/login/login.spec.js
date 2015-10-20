/*
	Author: Nilesh Mistry
*/

describe('Login Logout Test', function(){
	this.timeout(999999999);
	before(function(done) {
		// go to login
		client.url(host, function(err){
			errorScreenShot(err, 'Entering url error should be null');
			// wait for login button
			client.waitForVisible('#loginBtn', 50000, function(err){
				errorScreenShot(err, 'Loading login button error should be null');
				done();
			});
		});
	});

	it('Should Show Error Message If User Email Is Blank', function(done){
		// login
		Login.login(null, frontTestConfig.automatedTest.auth.password, function(){
			client.getText('//*[@id="emailError"]/span[1]', function(err, text){
				assert.equal('Please provide user email.', text, 'Error message should be "Please provide user email."');
				done();
			});
		});
	});

	it('Should Show Error Message If Password Is Blank', function(done){
		// login
		Login.login(frontTestConfig.automatedTest.auth.email, null, function(){
			client.getText('//*[@id="passwordError"]/span[1]', function(err, text){
				assert.equal('Please provide password.', text, 'Error message should be "Please provide password."');
				done();
			});
		});
	});

	it('Should Show Error Message If Email Is Invalid', function(done){
		// login
		Login.login('abc', frontTestConfig.automatedTest.auth.password, function(){
			client.getText('//*[@id="emailError"]/span[2]', function(err, text){
				assert.equal('Please provide valid user email.', text, 'Error message should be "Please provide valid user email."');
				done();
			});
		});
	});

	it('Should Show Error Message If Email Is Incorrect', function(done){
		// login
		Login.login('nilesh.mistry@rapidops.com', frontTestConfig.automatedTest.auth.password, function(){
			client.getText('#invalidUserError', function(err, text){
				assert.equal('Invalid User', text, 'Error message should be "Invalid User"');
				done();
			});
		});
	});

	it('Should Show Error Message If Password Is Incorrect', function(done){
		// login
		Login.login(frontTestConfig.automatedTest.auth.email, '123', function(){
			client.getText('#invalidUserError', function(err, text){
				assert.equal('Invalid User', text, 'Error message should be "Invalid User"');
				done();
			});
		});
	});

	it('Should Move To Products List Page With Proper Authentication', function(done){
		// login
		Login.login(frontTestConfig.automatedTest.auth.email, frontTestConfig.automatedTest.auth.password, function(){
			client.waitForVisible('#productList', 30000, function(err){
				client.url(function(err, url){
					assert.equal(host+'/#/app/products/list', url.value, 'Should move to "'+host+'/#/app/products/list"');
					done();
				});
			});
		});
	});
});