var Promise = require('bluebird');
var webdriver = require('selenium-webdriver');
var emojiStrip = require('emoji-strip');

var asset = require('../asset/asset.js');
var TextMessages = require('../messages/textMessages');
var ImageMessages = require('../messages/imageMessages');
var QuickReplyMessage = require('../messages/quickReplyMessage');
var VideoMessages = require('../messages/videoMessages');
var CarouselMessages = require('../messages/carouselMessages');

var By = webdriver.By;
var until = webdriver.until;

function MessengerDriver(driver, expectations) {

	this.driver = driver.getDriver();
	this.browser = driver.browser;

	this.expectations = expectations;

	this.messagesRecord = {};
	this.log = {
		spansLength: 0, //text
		imgsLength: 0,
		videosLength: 0,
		carouselsLength: 0
	};

	this.open_messenger_page = open_messenger_page;
	this.log_into_messenger = log_into_messenger;

	this.get_started = get_started;
	this.get_started_messages_check = get_started_messages_check;

	this.click_explore_vonage_menu_item = click_explore_vonage_menu_item;

	this.mind_blown = mind_blown;
	this.mind_blown_messages_check = mind_blown_messages_check;

	this.explore_vonage = explore_vonage;
	this.explore_vonage_messages_check = explore_vonage_messages_check;

	this.our_culture = our_culture;
	this.our_culture_messages_check = our_culture_messages_check;

	this.our_values = our_values;
	this.our_values_messages_check = our_values_messages_check;

	this.join_our_team = join_our_team;
	this.join_our_team_messages_check = join_our_team_messages_check;

	this.choose_location = choose_location;
	this.choose_location_messages_check = choose_location_messages_check;

	this.choose_job_type = choose_job_type;
	this.choose_job_type_messages_check = choose_job_type_messages_check;

	this.delete_conversation = delete_conversation;

	this.quit = quit;

	this.record_message = record_message;

	this.takeScreenshotThenSaveToFile = takeScreenshotThenSaveToFile;

	// this.delay = delay;
}

module.exports = MessengerDriver;


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> class member methods <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function open_messenger_page() {
	var that = this;

	return that.driver.manage().window().maximize()
		.then(function() {
			return that.driver.get(asset.HR_CHATBOT_URL);
		});

	// return this.driver.get(asset.HR_CHATBOT_URL);
}

function log_into_messenger() {

	var that = this

	return that.driver.wait(until.elementLocated(By.name("email")), 3000)
		.then(function() {
			return that.driver.findElement(By.name("email"));
		})
		.then(function(element) {
			//wait until email input is displayed
			return that.driver.wait(function() {
				return element.isDisplayed()
					.then(function(isDisplayed) {
						// console.log("DISPLAYED>>>", isDisplayed);
						return isDisplayed === true;
					})
			}, 10000)
			.then(function() {
				return element.sendKeys(asset.EMAIL);
			})
		})
		.then(function() {
			return that.driver.findElement(By.name("pass"));
		})
		.then(function(element) {
			return element.sendKeys(asset.PASSWORD);
		})
		.then(function() {
			return that.driver.findElement(By.name("login"));
		})
		.then(function(element) {
			return element.click();
		});
}

function get_started() {

	var that = this;

	return that.driver.wait(until.elementLocated(By.linkText(asset.GET_STARTED_BUTTON)), 5000)
		.then(function() {
			that.driver.findElement(By.linkText(asset.GET_STARTED_BUTTON)).click()	
		})
		.catch(function(err) {
			if(err instanceof webdriver.error.TimeoutError) {
				return that.delete_conversation()
					.then(open_messenger_page.bind(that))
					.then(get_started.bind(that));
			} else {
				throw err;
			}
		});
}

function get_started_messages_check(waitTime) {

	var expectation = this.expectations['get_started'];
	var expectedMessagesLength = Object.keys(this.messagesRecord).length + expectation.messagesAmount;

	return messages_check_helper.call(this, expectation, expectedMessagesLength, waitTime);
}

function click_explore_vonage_menu_item() {
	var that = this;
	return that.driver.findElement(By.css("a[class='_3km2'][role='button']")).click()
		.then(function() {
			return that.driver.wait(until.elementLocated(By.linkText(asset.EXPLORE_VONAGE_MENU_ITEM)), 5000);
		})
		.then(function() {
			return that.driver.findElement(By.linkText(asset.EXPLORE_VONAGE_MENU_ITEM)).click();
		});
}

function mind_blown() {
	return click_clap.call(this);
}

function mind_blown_messages_check(waitTime) {
	var expectation = this.expectations['mind_blown'];
	var expectedMessagesLength = Object.keys(this.messagesRecord).length + expectation.messagesAmount;

	return messages_check_helper.call(this, expectation, expectedMessagesLength, waitTime);
}

function explore_vonage() {
	return click_quick_reply.call(this, asset.EXPLORE_VONAGE_QUICK_REPLY);
}

function explore_vonage_messages_check(waitTime) {

	var expectation = this.expectations['explore_vonage'];
	var expectedMessagesLength = Object.keys(this.messagesRecord).length + expectation.messagesAmount;

	return messages_check_helper.call(this, expectation, expectedMessagesLength, waitTime);
}

function our_culture() { 
	return click_quick_reply.call(this, asset.OUR_CULTURE_QUICK_REPLY);
}

function our_culture_messages_check(waitTime) {

	var expectation = this.expectations['our_culture'];
	var expectedMessagesLength = Object.keys(this.messagesRecord).length + expectation.messagesAmount;

	return messages_check_helper.call(this, expectation, expectedMessagesLength, waitTime);

}

function our_values() { 
	return click_quick_reply.call(this, asset.OUR_VALUES_QUICK_REPLY);
}

function our_values_messages_check(waitTime) {

	var expectation = this.expectations['our_values'];
	var expectedMessagesLength = Object.keys(this.messagesRecord).length + expectation.messagesAmount;

	return messages_check_helper.call(this, expectation, expectedMessagesLength, waitTime);

}

function join_our_team() { 
	return click_quick_reply.call(this, asset.JOIN_OUR_TEAM_QUICK_REPLY);
}

function join_our_team_messages_check(waitTime) {

	var expectation = this.expectations['join_our_team'];
	var expectedMessagesLength = Object.keys(this.messagesRecord).length + expectation.messagesAmount;

	return messages_check_helper.call(this, expectation, expectedMessagesLength, waitTime);
}

function choose_location() {
	return click_quick_reply.call(this, asset.HOLMDEL_QUICK_REPLY);
}

function choose_location_messages_check(waitTime) {
	
	var expectation = this.expectations['choose_location'];
	var expectedMessagesLength = Object.keys(this.messagesRecord).length + expectation.messagesAmount;

	return messages_check_helper.call(this, expectation, expectedMessagesLength, waitTime);
}

function choose_job_type() { 
	return click_quick_reply.call(this, asset.TECHNOLOGY_QUICK_REPLY);
}

function choose_job_type_messages_check(waitTime) {
	
	var expectation = this.expectations['choose_job_type'];
	var expectedMessagesLength = Object.keys(this.messagesRecord).length + expectation.messagesAmount;

	return messages_check_helper.call(this, expectation, expectedMessagesLength, waitTime);
}

function delete_conversation() {

	var that = this;

	return that.driver.findElements(By.css("div[class='_5blh _4-0h'][role='button']"))
		.then(function(buttons) {
			return buttons[buttons.length - 1].click();
		})
		.then(function() {
			return that.driver.findElement(By.linkText("Delete")).click();
		})
		.then(function() {
			return that.driver.wait(until.elementLocated(By.css("button[class='_3quh _30yy _2t_ _3ay_ _5ixy']")), 5000)
		})
		.then(function() {
			return that.driver.findElement(By.css("button[class='_3quh _30yy _2t_ _3ay_ _5ixy']")).click();
		});
}

function quit() {
	return this.driver.quit();
}

function record_message(message, type) {

	var that = this;

	if(!(message.key in that.messagesRecord)) {
		var messageIndex = Object.keys(that.messagesRecord).length;
		
		switch(type) {
			case 'text':
				console.log(messageIndex + ' -------------- ' + message.content);
				that.messagesRecord[message.key] = {
					index: messageIndex,
					type: 'text',
					tag: TextMessages.htmlTag,
					content: message.content
				};
				break;
			case 'image':
				console.log(messageIndex + ' -------------- ' + 'image');
				that.messagesRecord[message.key] = {
					index: messageIndex,
					type: 'image',
					tag: '<img>',
					src: message.src
				};
				break;
			case 'quickReply':
				console.log(messageIndex + ' -------------- ' + 'quickReply');
				that.messagesRecord[message.key] = {
					index: messageIndex,
					type: 'quick reply',
					tag: '<div>',
					options: message.options
				};
				break;
			case 'video':
				console.log(messageIndex + ' -------------- ' + 'Video');
				that.messagesRecord[message.key] = {
					index: messageIndex,
					type: 'video',
					tag: '<video>',
					src: message.src
				};
				break;
			case 'carousel':
				console.log(messageIndex + ' -------------- ' + 'carousel');
				that.messagesRecord[message.key] = {
					index: messageIndex,
					type: 'carousel',
					tag: '<div>'
				};	
				break;

		}
					
	}
}

function takeScreenshotThenSaveToFile(title, fileSystem) {
	return this.driver.takeScreenshot()
		.then(function(imageStr) {
			var objectStr = fileSystem.createObjectStr({
				title: title,
				imageStr: imageStr
			});
			if(!fileSystem.arrayExist) {
				return fileSystem.writeArrayToFile(objectStr, 'SCREENSHOTS');
			} else {
				return fileSystem.pushToArrayInFile(objectStr);
			}
		})
		.then(function(info) {
			console.log(info);
		})
		.catch(function(err) {
			console.log("Failed: taking screenshots and save to file")
			console.log(err);
		});
}

function delay(t) {
   return new Promise(function(resolve) { 
       setTimeout(resolve, t)
   });
}


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> helper function <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



//Todo: use wait() or setInterval() to cycly check until all the expected messages(including images) show up. 
//During the checking, mark the index in order once any message is detected.
//If multiple messages are detected within one check, mark the same index.
// wait() is better because it is blocking

function messages_check_helper(expectation, expectedMessagesLength, waitTime) {
	var messages = {};
	messages.textMessages = expectation['textMessages'] ? new TextMessages(expectation['textMessages'], this) : new TextMessages([], this);
	messages.imageMessages = expectation['imageMessages'] ? new ImageMessages(expectation['imageMessages'], this) : null;
	messages.quickReplyMessage = expectation['quickReplyMessage'] ? new QuickReplyMessage(expectation['quickReplyMessage'], this) : null;
	messages.videoMessages = expectation['videoMessages'] ? new VideoMessages(expectation['videoMessages'], this) : null;
	messages.carouselMessages = expectation['carouselMessages'] ? new CarouselMessages(expectation['carouselMessages'], this) : null;

	return wait.call(this, messages, expectedMessagesLength, waitTime);
}

function wait(messages, expectedMessagesLength, waitTime) {

	var that = this;

	return that.driver.wait(function() {
		return messages.textMessages.text_messages_processor()
			.then(function() {
				if(messages.imageMessages) {
					return messages.imageMessages.image_messages_processor();
				}
			})
			.then(function() {
				if(messages.quickReplyMessage) {
					return messages.quickReplyMessage.quick_reply_message_processor();
				}
			})
			.then(function() {
				if(messages.videoMessages) {
					return messages.videoMessages.video_messages_processor();
				}
			})
			.then(function() {
				if(messages.carouselMessages) {
					return messages.carouselMessages.carousel_messages_processor();
				}
			})
			.then(function() {
				return Object.keys(that.messagesRecord).length == expectedMessagesLength;
			});
	}, waitTime);

}

function click_quick_reply(target) {

	return this.driver.executeScript(
		"var targetToClick = '" + target + "'; " + 
		"var quickReplies = document.querySelectorAll('div[class=\"_10-e\"]'); \
		if(quickReplies.length === 0) { \
			console.log('No quickReplies found!'); \
		} else { \
			for(var i = 0; i < quickReplies.length; i ++) { \
				if(quickReplies[i].innerHTML === targetToClick) { \
					quickReplies[i].click(); \
					break; \
				} \
			} \
		} \
		"
	)
	.then(function() {
		console.log("Click quick reply successfully!");
	});

}


function click_clap() {
	var that = this;
	return that.driver.wait(until.elementLocated(By.css("div[class='_10-e']")), 5000)
			.then(function() {
				return that.driver.findElement(By.css("div[class='_10-e']")).click();
			});
}


// have to scroll the window to bottom, otherwise the dissapeared quickreply will cause issue 
function scrollChatWindowToBottom() {
	return this.driver.executeScript("document.querySelector('div[class=\"_4u-c _1wfr _9hq\"]').scrollTop = document.querySelector('div[class=\"_4u-c _1wfr _9hq\"]').scrollHeight;")
		.then(function() {
			console.log("Scroll down to the bottom!")
		});
}






