var assert = require('chai').assert;
var Driver = require('./webdriver/driver.js');
var MessengerDriver = require('./webdriver/messengerDriver.js');
var expectations = require('./expectations/expectations.js');


describe('Testing HR Chatbot', function() {
	
	this.timeout(1000000);

	var messengerDriver;

	before(function() {
		var driver = new Driver('chrome', 'local').getDriver();

		// return promise is an alternative way to use done()
		return expectations.getExpectations()
		.then(function(exps) {
			console.log(exps);

			messengerDriver = new MessengerDriver(driver, exps);
			return messengerDriver.open_messenger_page();
		})
		.then(function(){
			return messengerDriver.log_into_messenger();
		})
		.catch(function(err) {
			console.log(err);
		});

	});

	after(function() {
		return messengerDriver.delete_conversation()
			.then(function() {
				messengerDriver.quit();
			})
			.catch(function(err) {
				console.log(err);
			});
	});

	describe("Testing 'Get Started'", function() {
		it('"Get Started": Recive two text messages and one image message within 20 seconds in order', function() {
			return messengerDriver.get_started()
				.then(messengerDriver.get_started_messages_check.bind(messengerDriver, 20000))
				.then(function(result) {
					// console.log("Messages record: ", messengerDriver.messagesRecord);
					assert.isOk(result);
				})
				.catch(function(err) {
					console.log(err);
					assert.isOk(false);
				});
		});
	});

	describe('Testing route: "Explore Vonage" -> "Our Culture" -> "Our Values" -> "Join Our Team"', function() {
		it('"Explore Vonage": Recive three text messages and quick reply within 20 seconds in order', function() {
			return messengerDriver.explore_vonage()
				.then(messengerDriver.explore_vonage_messages_check.bind(messengerDriver, 20000))
				.then(function(result) {
					// console.log("Messages record: ", messengerDriver.messagesRecord);
					assert.isOk(result);
				})
				.catch(function(err) {
					console.log(err);
					assert.isOk(false);
				});
		});

		it('"Our Cultue": Recive two text messages, one video message, and quick reply within 20 seconds in order', function() {
			return messengerDriver.our_culture()
				.then(messengerDriver.our_culture_messages_check.bind(messengerDriver, 20000))
				.then(function(result) {
					// console.log("Messages record: ", messengerDriver.messagesRecord);
					assert.isOk(result);
				})
				.catch(function(err) {
					console.log(err);
					assert.isOk(false);
				});
		});

		it('"Our Values": Recive two text messages, one video message, and quick reply within 20 seconds in order', function() {
			return messengerDriver.our_values()
				.then(messengerDriver.our_values_messages_check.bind(messengerDriver, 20000))
				.then(function(result) {
					// console.log("Messages record: ", messengerDriver.messagesRecord);
					assert.isOk(result);
				})
				.catch(function(err) {
					console.log(err);
					assert.isOk(false);
				});
		});

		it('"Join Our Team": Recive three text messages, one image message, and quick reply within 20 seconds in order', function() {
			return messengerDriver.join_our_team()
				.then(messengerDriver.join_our_team_messages_check.bind(messengerDriver, 20000))
				.then(function(result) {
					// console.log("Messages record: ", messengerDriver.messagesRecord);
					assert.isOk(result);
				})
				.catch(function(err) {
					console.log(err);
					assert.isOk(false);
				});
		});

		it('"Choose Location": Recive one text messages and quick reply within 20 seconds in order', function() {
			return messengerDriver.choose_location()
				.then(messengerDriver.choose_location_messages_check.bind(messengerDriver, 20000))
				.then(function(result) {
					// console.log("Messages record: ", messengerDriver.messagesRecord);
					assert.isOk(result);
				})
				.catch(function(err) {
					console.log(err);
					assert.isOk(false);
				});
		});

		it('"Choose Job Type": Recive one text messages, one carousel, and quick reply within 20 seconds in order', function() {
			return messengerDriver.choose_job_type()
				.then(messengerDriver.choose_job_type_messages_check.bind(messengerDriver, 20000))
				.then(function(result) {
					// console.log("Messages record: ", messengerDriver.messagesRecord);
					assert.isOk(result);
				})
				.catch(function(err) {
					console.log(err);
					assert.isOk(false);
				});
		});


	});

});














