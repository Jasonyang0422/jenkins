var Promise = require('bluebird')
var By = require('selenium-webdriver').By;
var until = require('selenium-webdriver').until;

function QuickReplyMessage(quickReplyMessage, messengerDriver) {

	this.expectedQuickReplyMessage = quickReplyMessage;

	this.quick_reply_message_processor = function() {
		var that = this;
		return get_quick_reply_elements()
			.then(function(divs) {
				process_quick_reply_elements.call(that, divs);
			});
	};

	function get_quick_reply_elements() {
		return messengerDriver.driver.findElements(By.css(QuickReplyMessage.htmlTag));
	};

	function process_quick_reply_elements(divs) {

		var that = this;
		
		if(divs && divs.length > 0 && !(that.expectedQuickReplyMessage.key in messengerDriver.messagesRecord)) {
			var options = ""
			return Promise.each(divs, function(div, index, length) {
				return div.getText().then(function(text) { 
					options += (index + '. ' + text + ' '); 
				});
			})
			.then(function() {
				that.expectedQuickReplyMessage.options = options;
				messengerDriver.record_message(that.expectedQuickReplyMessage, 'quickReply');	
			})
		}

	
		// if(divs && divs.length > 0) {
		// 	var options = ""
		// 	return Promise.each(divs, function(div, index, length) {
		// 		return div.getText().then(function(text) { 
		// 			options += (index + '. ' + text + ' '); 
		// 		});
		// 	})
		// 	.then(function() {
		// 		that.expectedQuickReplyMessage.options = options;
		// 		messengerDriver.record_message(that.expectedQuickReplyMessage, 'quickReply');	
		// 	})
		// }
	};
}

QuickReplyMessage.htmlTag = "div[class='_10-e']";
//quick reply doesn't need log because previous one will disappear



module.exports = QuickReplyMessage;




