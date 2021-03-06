var assert = require('chai').assert;
var Driver = require('./webdriver/driver.js');
var MessengerDriver = require('./webdriver/messengerDriver.js');
var expectations = require('./expectations/expectations.js');
var FileSystem = require('./utility/fileSystem.js');


describe('Testing HR Chatbot', function() {
	
	this.timeout(1000000);

	var messengerDriver;
	var variablesFile;

	before(function() {
		var driver = new Driver('phantomjs');
		// var driver = new Driver('chrome', 'local');
		variablesFile = new FileSystem("./testReport/html/variables.js");

		// return promise is an alternative way to use done()
		return expectations.getExpectations()
		.then(function(exps) {
			console.log("Expectations: ", exps);

			messengerDriver = new MessengerDriver(driver, exps);
			return messengerDriver.open_messenger_page();
		})
		.then(function(){
			return messengerDriver.log_into_messenger();
		})
		.catch(function(err) {
			return messengerDriver.takeScreenshotThenSaveToFile("Log in (Failed)", variablesFile)
				.then(function(){ 
					console.log(err);
				});
		});

	});

	after(function() {
		return messengerDriver.takeScreenshotThenSaveToFile("Test is over", variablesFile)
			.then(function() {
				return messengerDriver.delete_conversation();
			})
			.then(function() {
				return messengerDriver.quit();
			})
			.catch(function(err) {
				return messengerDriver.takeScreenshotThenSaveToFile("Delete conversation and close browser (Failed)", variablesFile)
					.then(function(){ 
						console.log(err);
					});
			});
	});

	describe("Testing 'Get Started'", function() {
		it('"Get Started": Recive two text messages and one image message within 20 seconds in order', function() {
			return messengerDriver.get_started()
				.then(messengerDriver.get_started_messages_check.bind(messengerDriver, 20000))
				.then(function(result) {
					// console.log("Messages record: ", messengerDriver.messagesRecord);
					assert.isOk(result);
					return messengerDriver.takeScreenshotThenSaveToFile("Get Started (Success)", variablesFile);
				})
				.catch(function(err) {
					return messengerDriver.takeScreenshotThenSaveToFile("Get Started (Failed)", variablesFile)
						.then(function(){ 
							console.log(err);
							assert.isOk(false);
						});
				});
		});
	});

	describe('Testing route: "Mind Blown" -> Explore Vonage" -> "Our Culture" -> "Our Values" -> "Join Our Team"', function() {
		
		it("< Mind Blown >", function() {
			return messengerDriver.click_explore_vonage_menu_item()
				.then(messengerDriver.mind_blown.bind(messengerDriver))
				.then(messengerDriver.mind_blown_messages_check.bind(messengerDriver, 20000))
				.then(function(result) {
					assert.isOk(result);
					return messengerDriver.takeScreenshotThenSaveToFile("Mind Blown (Success)", variablesFile);
				})
				.catch(function(err) {
					return messengerDriver.takeScreenshotThenSaveToFile("Mind Blown (Failed)", variablesFile)
						.then(function(){ 
							console.log(err);
							assert.isOk(false);
						});
				});
		});

		it("< Explore Vonage >", function() {
			return messengerDriver.explore_vonage()
				.then(messengerDriver.explore_vonage_messages_check.bind(messengerDriver, 20000))
				.then(function(result) {
					// console.log("Messages record: ", messengerDriver.messagesRecord);
					assert.isOk(result);
					return messengerDriver.takeScreenshotThenSaveToFile("Explore Vonage (Success)", variablesFile);
				})
				.catch(function(err) {
					return messengerDriver.takeScreenshotThenSaveToFile("Explore Vonage (Failed)", variablesFile)
						.then(function(){ 
							console.log(err);
							assert.isOk(false);
						});
				});
		});

		it("< Our Cultue >", function() {
			//using delay is in order to get quick replies ready to click
			return messengerDriver.our_culture()
				.then(messengerDriver.our_culture_messages_check.bind(messengerDriver, 20000))
				.then(function(result) {
					// console.log("Messages record: ", messengerDriver.messagesRecord);
					assert.isOk(result);
					return messengerDriver.takeScreenshotThenSaveToFile("Our Cultue (Success)", variablesFile);
				})
				.catch(function(err) {
					return messengerDriver.takeScreenshotThenSaveToFile("Our Culture (Failed)", variablesFile)
						.then(function(){ 
							console.log(err);
							assert.isOk(false);
						});
				});
		});

		it("< Our Values >", function() {
			return messengerDriver.our_values()
				.then(messengerDriver.our_values_messages_check.bind(messengerDriver, 20000))
				.then(function(result) {
					// console.log("Messages record: ", messengerDriver.messagesRecord);
					assert.isOk(result);
					return messengerDriver.takeScreenshotThenSaveToFile("Our Values (Success)", variablesFile);
				})
				.catch(function(err) {
					return messengerDriver.takeScreenshotThenSaveToFile("Our Values (Failed)", variablesFile)
						.then(function(){ 
							console.log(err);
							assert.isOk(false);
						});
				});
		});

		it("< Join Our Team >", function() {
			return messengerDriver.join_our_team()
				.then(messengerDriver.join_our_team_messages_check.bind(messengerDriver, 20000))
				.then(function(result) {
					// console.log("Messages record: ", messengerDriver.messagesRecord);
					assert.isOk(result);
					return messengerDriver.takeScreenshotThenSaveToFile("Join Our Team (Success)", variablesFile);
				})
				.catch(function(err) {
					return messengerDriver.takeScreenshotThenSaveToFile("Join Our Team (Failed)", variablesFile)
						.then(function(){ 
							console.log(err);
							assert.isOk(false);
						});
				});
		});

		it("< Choose Location >", function() {
			return messengerDriver.choose_location()
				.then(messengerDriver.choose_location_messages_check.bind(messengerDriver, 20000))
				.then(function(result) {
					// console.log("Messages record: ", messengerDriver.messagesRecord);
					assert.isOk(result);
					return messengerDriver.takeScreenshotThenSaveToFile("Choose Location (Success)", variablesFile);
				})
				.catch(function(err) {
					return messengerDriver.takeScreenshotThenSaveToFile("Choose Location (Failed)", variablesFile)
						.then(function(){ 
							console.log(err);
							assert.isOk(false);
						});
				});
		});

		it("< Choose Job Type >", function() {
			return messengerDriver.choose_job_type()
				.then(messengerDriver.choose_job_type_messages_check.bind(messengerDriver, 20000))
				.then(function(result) {
					// console.log("Messages record: ", messengerDriver.messagesRecord);
					assert.isOk(result);
					return messengerDriver.takeScreenshotThenSaveToFile("Choose Job Type (Success)", variablesFile);
				})
				.catch(function(err) {
					return messengerDriver.takeScreenshotThenSaveToFile("Choose Job Type (Failed)", variablesFile)
						.then(function(){ 
							console.log(err);
							assert.isOk(false);
						});
				});
		});


	});

});














