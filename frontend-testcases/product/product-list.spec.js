/*
	Author: Nilesh Mistry
*/

describe('Product List Test', function(){
	// this.timeout(999999999);
	it('Should Test Filter', function(done){
		client.moveToObject('//*[@id="center"]/div/div[1]/div[2]/div/div[1]/span')
		.click('//*[@id="center"]/div/div[1]/div[2]/div/div[1]/span')
		.setValue('//*[@id="borderLayout_eRootPanel"]/div[3]/span/div/div[2]/input', 'monaco')
		.click('//*[@id="borderLayout_eRootPanel"]/div[3]/span/div/button[1]')
		.getText('//*[@id="center"]/div/div[2]/div[2]/div/div/div/div[1]', function(err, text){
			assert.equal('monaco', text, 'First row should be "monaco"');
		})
		.call(done);
	});
	after(function(done) {
		client.end(done);
	});
});