var Promise = require('bluebird')
var webdriver = require('selenium-webdriver');

var asset = require('../asset.js');
var TextMessages = require('../messages/textMessages');
var ImageMessages = require('../messages/imageMessages')

var By = webdriver.By;
var until = webdriver.until;

function MessengerDriver(driver) {

	this.GET_STARTED_FIRST_MESSAGE_KEY = 'get_started_first_message';
	this.GET_STARTED_SECOND_MESSAGE_KEY = 'get_started_second_message';
	this.GET_STARTED_THIRD_MESSAGE_KEY = 'get_started_third_message';

	this.EXPLORE_VONAGE_FIRST_MESSAGE_KEY = 'explore_vonage_first_message';
	this.EXPLORE_VONAGE_SECOND_MESSAGE_KEY = 'explore_vonage_second_message';
	this.EXPLORE_VONAGE_THIRD_MESSAGE_KEY = 'explore_vonage_third_message';
	this.EXPLORE_VONAGE_FOURTH_MESSAGE_KEY = 'explore_vonage_fourth_message';

	this.OUR_CULTURE_FIRST_MESSAGE_KEY = 'our_culture_first_message';
	this.OUR_CULTURE_SECOND_MESSAGE_KEY = 'our_culture_second_message';
	this.OUR_CULTURE_THIRD_MESSAGE_KEY = 'our_culture_third_message';
	this.OUR_CULTURE_FOURTH_MESSAGE_KEY = 'our_culture_fourth_message';

	this.OUR_VALUES_FIRST_MESSAGE_KEY = 'our_values_first_message';
	this.OUR_VALUES_SECOND_MESSAGE_KEY = 'our_values_second_message';
	this.OUR_VALUES_THIRD_MESSAGE_KEY = 'our_values_third_message';
	this.OUR_VALUES_FOURTH_MESSAGE_KEY = 'our_values_fourth_message';

	this.JOIN_OUR_TEAM_FIRST_MESSAGE_KEY = 'join_our_team_first_message';
	this.JOIN_OUR_TEAM_SECOND_MESSAGE_KEY = 'join_our_team_second_message';
	this.JOIN_OUR_TEAM_THIRD_MESSAGE_KEY = 'join_our_team_third_message';
	this.JOIN_OUR_TEAM_FOURTH_MESSAGE_KEY = 'join_our_team_fourth_message';
	this.JOIN_OUR_TEAM_FIFTH_MESSAGE_KEY = 'join_our_team_fifth_message';

	this.CHOOSE_LOCATION_FIRST_MESSAGE_KEY = 'choose_location_first_message';
	this.CHOOSE_LOCATION_SECOND_MESSAGE_KEY = 'choose_location_second_message';

	this.CHOOSE_JOB_TYPE_FIRST_MESSAGE_KEY = 'choose_job_type_first_message';
	this.CHOOSE_JOB_TYPE_SECOND_MESSAGE_KEY = 'choose_job_type_second_message';
	this.CHOOSE_JOB_TYPE_THIRD_MESSAGE_KEY = 'choose_job_type_third_message';

	this.driver = driver;

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

}

module.exports = MessengerDriver;


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> class member methods <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function open_messenger_page() {
	return this.driver.get(asset.HR_CHATBOT_URL);
}

function log_into_messenger() {

	var that = this

	return that.driver.wait(until.elementLocated(By.name("email")), 3000)
		.then(function() {
			return that.driver.findElement(By.name("email")).sendKeys(asset.EMAIL);
		})
		.then(function() {
			return that.driver.wait(until.elementLocated(By.name("pass")), 3000);
		})
		.then(function() {
			return that.driver.findElement(By.name("pass")).sendKeys(asset.PASSWORD);
		})
		.then(function() {
			return that.driver.findElement(By.name("login")).click();
		});
}

function get_started() {

	var that = this;

	return that.driver.wait(until.elementLocated(By.linkText("Get Started")), 10000)
		.then(function() {
			that.driver.findElement(By.linkText("Get Started")).click()	
		});
}

function get_started_messages_check(waitTime) {
	
	var that = this

	var expectation = {
		textMessages: [
			{
				key: that.GET_STARTED_FIRST_MESSAGE_KEY,
				content: asset.GET_STARTED_FIRST_MESSAGE_CONTENT
			},
			{
				key: that.GET_STARTED_SECOND_MESSAGE_KEY,
				content: asset.GET_STARTED_SECOND_MESSAGE_CONTENT
			}
		],
		imageMessages: [
			{
				key: that.GET_STARTED_THIRD_MESSAGE_KEY
			}
		]
	};

	var textMessages = new TextMessages(expectation['textMessages'], this);
	var imageMessages = new ImageMessages(expectation['imageMessages'], this);

	var expectedMessagesLength = Object.keys(that.messagesRecord).length + 3;

	return messages_check_helper.call(this, expectation, expectedMessagesLength, waitTime, textMessages, imageMessages);
}

function explore_vonage() {

	var that = this;

	return that.driver.findElement(By.css("a[class='_3km2'][role='button']")).click()
		.then(function() {
			return that.driver.wait(until.elementLocated(By.linkText("Explore Vonage")), 5000)
		})
		.then(function() {
			return that.driver.findElement(By.linkText("Explore Vonage")).click();
		});
}

function explore_vonage_messages_check(waitTime) {

	var that = this;

	var expectation = {
		textMessages: [
			{
				key: that.EXPLORE_VONAGE_FIRST_MESSAGE_KEY,
				content: asset.EXPLORE_VONAGE_FIRST_MESSAGE_CONTENT
			},
			{
				key: that.EXPLORE_VONAGE_SECOND_MESSAGE_KEY,
				content: asset.EXPLORE_VONAGE_SECOND_MESSAGE_CONTENT
			},
			{
				key: that.EXPLORE_VONAGE_THIRD_MESSAGE_KEY,
				content: asset.EXPLORE_VONAGE_THIRD_MESSAGE_CONTENT
			}
		],
		quickReplyMessage: {
			key: that.EXPLORE_VONAGE_FOURTH_MESSAGE_KEY
		}
	};

	var expectedMessagesLength = Object.keys(that.messagesRecord).length + 4;

	return messages_check_helper.call(this, expectation, expectedMessagesLength, waitTime);
}

function our_culture() { return click_quick_reply.call(this, "Our Culture"); }

function our_culture_messages_check(waitTime) {

	var that = this;

	var expectation = {
		textMessages: [
			{
				key: that.OUR_CULTURE_FIRST_MESSAGE_KEY,
				content: asset.OUR_CULTURE_FIRST_MESSAGE_CONTENT
			},
			{
				key: that.OUR_CULTURE_THIRD_MESSAGE_KEY,
				content: asset.OUR_CULTURE_THIRD_MESSAGE_CONTENT
			}
		],
		videoMessages: [
			{
				key: that.OUR_CULTURE_SECOND_MESSAGE_KEY,
				src: asset.OUR_CULTURE_VIDEO_SOURCE_ROOT
			}
		],
		quickReplyMessage: {
			key: that.OUR_CULTURE_FOURTH_MESSAGE_KEY
		}
	};

	var expectedMessagesLength = Object.keys(that.messagesRecord).length + 4;

	return messages_check_helper.call(this, expectation, expectedMessagesLength, waitTime);

}

function our_values() { return click_quick_reply.call(this, "Our Values"); }

function our_values_messages_check(waitTime) {

	var that = this;

	var expectation = {
		textMessages: [
			{
				key: that.OUR_VALUES_FIRST_MESSAGE_KEY,
				content: asset.OUR_VALUES_FIRST_MESSAGE_CONTENT
			},
			{
				key: that.OUR_VALUES_THIRD_MESSAGE_KEY,
				content: asset.OUR_VALUES_THIRD_MESSAGE_CONTENT
			}
		],
		videoMessages: [
			{
				key: that.OUR_VALUES_SECOND_MESSAGE_KEY,
				src: asset.OUR_VALUES_VIDEO_SOURCE_ROOT
			}
		],
		quickReplyMessage: {
			key: that.OUR_VALUES_FOURTH_MESSAGE_KEY
		}
	};

	var expectedMessagesLength = Object.keys(that.messagesRecord).length + 4;

	return messages_check_helper.call(this, expectation, expectedMessagesLength, waitTime);

}

function join_our_team() { return click_quick_reply.call(this, "Join Our Team"); }

function join_our_team_messages_check(waitTime) {

	var that = this;

	var expectation = {
		textMessages: [
			{
				key: that.JOIN_OUR_TEAM_SECOND_MESSAGE_KEY,
				content: asset.JOIN_OUR_TEAM_SECOND_MESSAGE_CONTENT
			},
			{
				key: that.JOIN_OUR_TEAM_THIRD_MESSAGE_KEY,
				content: asset.JOIN_OUR_TEAM_THIRD_MESSAGE_CONTENT
			},
			{
				key: that.JOIN_OUR_TEAM_FOURTH_MESSAGE_KEY,
				content: asset.JOIN_OUR_TEAM_FOURTH_MESSAGE_CONTENT
			}
		],
		imageMessages: [
			{
				key: that.JOIN_OUR_TEAM_FIRST_MESSAGE_KEY
			}
		],
		quickReplyMessage: {
			key: that.JOIN_OUR_TEAM_FIFTH_MESSAGE_KEY
		}
	};

	var expectedMessagesLength = Object.keys(that.messagesRecord).length + 5;

	return messages_check_helper.call(this, expectation, expectedMessagesLength, waitTime);
}

function choose_location() { return click_quick_reply.call(this, "Holmdel"); }

function choose_location_messages_check(waitTime) {
	
	var that = this;

	var expectation = {
		textMessages: [
			{
				key: that.CHOOSE_LOCATION_FIRST_MESSAGE_KEY,
				content: asset.CHOOSE_LOCATION_FIRST_MESSAGE_CONTENT
			}
		],
		quickReplyMessage: {
			key: that.CHOOSE_LOCATION_SECOND_MESSAGE_KEY
		}
	};

	var expectedMessagesLength = Object.keys(that.messagesRecord).length + 2;

	return messages_check_helper.call(this, expectation, expectedMessagesLength, waitTime);
}

function choose_job_type() { return click_quick_reply.call(this, "Technology"); }

function choose_job_type_messages_check(waitTime) {
	
	var that = this;

	var expectation = {
		textMessages: [
			{
				key: that.CHOOSE_JOB_TYPE_SECOND_MESSAGE_KEY,
				content: asset.CHOOSE_JOB_TYPE_SECOND_MESSAGE_CONTENT
			}
		],
		carouselMessages: [
			{
				key: that.CHOOSE_JOB_TYPE_FIRST_MESSAGE_KEY,
			}
		],
		quickReplyMessage: {
			key: that.CHOOSE_JOB_TYPE_THIRD_MESSAGE_KEY
		}
	};

	var expectedMessagesLength = Object.keys(that.messagesRecord).length + 3;

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
		}
					
	}
}


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> helper function <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



//Todo: use wait() or setInterval() to cycly check until all the expected messages(including images) show up. 
//During the checking, mark the index in order once any message is detected.
//If multiple messages are detected within one check, mark the same index.
// wait() is better because it is blocking

function messages_check_helper(expectation, expectedMessagesLength, waitTime, textMessages, imageMessages) {

	var that = this;

	return that.driver.wait(function() {
		return textMessages.text_messages_processor()
			.then(function() {
				if(imageMessages) {
					return imageMessages.image_messages_processor();
				}
			})
			.then(function() {
				if(expectation['quickReplyMessage']) {
					return that.driver.findElements(By.css("div[class='_10-e']"));
				}
			})
			.then(function(divs) {
				//quick reply doesn't need log because previous one will disappear
				if(divs && divs.length > 0) {
					var key = expectation['quickReplyMessage'].key
					if(!(key in that.messagesRecord)) {
						var messageIndex = Object.keys(that.messagesRecord).length;
						
						console.log(messageIndex + ' -------------- ' + 'quickReply');
						that.messagesRecord[key] = {
							index: messageIndex,
							type: 'quick reply',
							tag: '<div>',
							options: ''
						};

						return Promise.each(divs, function(div, index, length) {
							return div.getText().then(function(text) { that.messagesRecord[key].options += (index + '. ' + text + ' '); })
						});
					}
				}
			})
			.then(function() {
				if(expectation['videoMessages']) {
					return that.driver.findElements(By.css("video[class='_ox1']"));
				}
			})
			.then(function(videos) {
				if(videos) {
					var startIndex = that.log.videosLength;
					that.log.videosLength = videos.length;
					videos = videos.slice(startIndex);

					if(videos.length > 0) {
						return Promise.each(videos, function(video) {
							return video.getAttribute('src').then(function(src) {
								expectation['videoMessages'].forEach(function(videoMessage) {
									if(src.includes(videoMessage.src) && !(videoMessage.key in that.messagesRecord)) {
										var messageIndex = Object.keys(that.messagesRecord).length;
										console.log(messageIndex + ' -------------- ' + 'Video');
										that.messagesRecord[videoMessage.key] = {
											index: messageIndex,
											type: 'video',
											tag: '<video>',
											src: src
										};							
									}
								});
							});
						});
					}
				}
			})
			.then(function() {
				if(expectation['carouselMessages']) {
					return that.driver.findElements(By.css("div[class='_52mr _2poz _ui9 _4skb _5i_d _205d _8ka']"));
				}
			})
			.then(function(carousels) {
				if(carousels) {
					var startIndex = that.log.carouselsLength;
					that.log.carouselsLength = carousels.length;
					carousels = carousels.slice(startIndex);

					if(carousels.length > 0) {
						return Promise.each(carousels, function(carousel, index, length) {
							// because image src is not be able to track because it changes constantly
							var expectedCarousel = expectation['carouselMessages'][index];
							if(!(expectedCarousel.key in that.messagesRecord)) {
								var messageIndex = Object.keys(that.messagesRecord).length;
								console.log(messageIndex + ' -------------- ' + 'carousel');
								that.messagesRecord[expectedCarousel.key] = {
									index: messageIndex,
									type: 'carousel',
									tag: '<div>'
								};	
							}
						});
					}
				}
			})
			.then(function() {
				return Object.keys(that.messagesRecord).length === expectedMessagesLength;
			});
	}, waitTime);

}

function click_quick_reply(target) {

	var that = this;

	return that.driver.findElements(By.css("div[class='_10-e']"))
		.then(function(divs) {
			return Promise.each(divs, function(div, index) {
				return div.getText().then(function(text) {
					if(text === target) {
						div.click().then(function() {
							// Use rejection to break Promise each
							throw {code: "success", index: index};
						});
					}
				});
			});
		})
		.catch(function(err) {
			if(typeof err === "object" && err.code === "success") {
				console.log('Click quick reply successfully');
			} else {
				throw err;
			}
		});
}

function delay(t) {
   return new Promise(function(resolve) { 
       setTimeout(resolve, t)
   });
}







