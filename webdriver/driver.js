var webdriver = require('selenium-webdriver');
var assest = require('../asset')

function Driver(browser) {

	var driver = new webdriver.Builder()
	    .withCapabilities({
	    	'browserName': browser,
	    	'platform': 'MAC',
	    	'version': '43.0',
	    	'username': asset.SAUCE_USERNAME,
	    	'accessKey': asset.SAUCE_ACCESSKEY
	    })
	    .usingServer("http://" + username + ":" + accessKey +
              "@ondemand.saucelabs.com:80/wd/hub")
	    .build();

	this.getDriver = function() { return driver; }
	
}

module.exports = Driver;