var webdriver = require('selenium-webdriver');
var asset = require('../asset/asset.js')

function Driver(browser, mode) {
	if(mode === 'remote') {
		var driver = new webdriver.Builder()
			.forBrowser(browser)
			// .usingServer('http://localhost:4444/wd/hub')
			.build();

		    // .withCapabilities({
		    // 	'browserName': browser,
		    // 	'platform': 'MAC',
		    // 	'version': '59.0',
		    // 	'username': asset.SAUCE_USERNAME,
		    // 	'accessKey': asset.SAUCE_ACCESSKEY
		    // })
		    // .usingServer("http://" + asset.SAUCE_USERNAME + ":" + asset.SAUCE_ACCESSKEY +
	     //          "@ondemand.saucelabs.com:80/wd/hub")
		    // .build();
	}
	else if(mode === 'local') {
		var driver = new webdriver.Builder()
		    .forBrowser(browser)
		    .build();
	}

	this.getDriver = function() { return driver; }
	this.mode = mode;
	this.browser = browser;
}

module.exports = Driver;