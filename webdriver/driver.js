var webdriver = require('selenium-webdriver');
var asset = require('../asset/asset.js')

function Driver(browser, mode) {
	if(mode === 'remote') {
		var driver = new webdriver.Builder()
			.forBrowser(browser)
			.usingServer('http://32764f9e.ngrok.io/wd/hub')
		    // .withCapabilities({
		    // 	'browserName': browser,
		    // 	'platform': 'MAC',
		    // 	'version': '59.0',
		    // 	'username': asset.SAUCE_USERNAME,
		    // 	'accessKey': asset.SAUCE_ACCESSKEY
		    // })
		    // .usingServer("http://" + asset.SAUCE_USERNAME + ":" + asset.SAUCE_ACCESSKEY +
	     //          "@ondemand.saucelabs.com:80/wd/hub")
		    .build();
	}
	//local test is used when developing
	else if(mode === 'local') {
		var driver = new webdriver.Builder()
		    .forBrowser(browser)
		    .build();
	}

	this.getDriver = function() { return driver; }
	
}

module.exports = Driver;