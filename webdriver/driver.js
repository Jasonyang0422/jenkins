var webdriver = require('selenium-webdriver');
var asset = require('../asset/asset.js')

function Driver(browser) {
	var driver = new webdriver.Builder()
		.forBrowser(browser)
		.setScrollBehavior(1)
		.build();
	this.getDriver = function() { return driver; }
	this.browser = browser;
}

module.exports = Driver;