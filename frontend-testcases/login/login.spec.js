/*
	Author: Nilesh Mistry
*/

describe('Login Logout Test', function(){
	// this.timeout(999999999);
	before(function(done) {
		client.url(host)
		.waitForVisible('#loginBtn', 50000)
		.call(done);
	});

	it('Should Show Error Message If User Email Is Blank', function(done){
		return Login.login(null, frontTestConfig.automatedTest.auth.password)
		.getText('//*[@id="emailError"]/span[1]', function(err, text){
			assert.equal('Please provide user email.', text, 'Error message should be "Please provide user email."');
		})
		.call(done);
	});

	it('Should Show Error Message If Password Is Blank', function(done){
		return Login.login(frontTestConfig.automatedTest.auth.email, null)
		.getText('//*[@id="passwordError"]/span[1]', function(err, text){
			assert.equal('Please provide password.', text, 'Error message should be "Please provide password."');
		})
		.call(done);
	});

	it('Should Show Error Message If Email Is Invalid', function(done){
		return Login.login('abc', frontTestConfig.automatedTest.auth.password)
		.getText('//*[@id="emailError"]/span[2]', function(err, text){
			assert.equal('Please provide valid user email.', text, 'Error message should be "Please provide valid user email."');
		})
		.call(done);
	});

	it('Should Show Error Message If Email Is Incorrect', function(done){
		return Login.login('nilesh.mistry@rapidops.com', frontTestConfig.automatedTest.auth.password)
		.getText('#invalidUserError', function(err, text){
			assert.equal('Invalid User', text, 'Error message should be "Invalid User"');
		})
		.call(done);
	});

	it('Should Show Error Message If Password Is Incorrect', function(done){
		return Login.login(frontTestConfig.automatedTest.auth.email, '123')
		.getText('#invalidUserError', function(err, text){
			assert.equal('Invalid User', text, 'Error message should be "Invalid User"');
		})
		.call(done);
	});

	it('Should Move To Products List Page With Proper Authentication', function(done){
		return Login.login(frontTestConfig.automatedTest.auth.email, frontTestConfig.automatedTest.auth.password)
		.waitForVisible('#productList')
		.url(function(err, url){
			assert.equal(host+'/#/app/products/list', url.value, 'Should move to "'+host+'/#/app/products/list"');
		})
		.call(done);
	});
});