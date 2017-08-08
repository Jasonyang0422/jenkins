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
		var options = this.expectedQuickReplyMessage.options;

		if(divs && divs.length > 0 && !(that.expectedQuickReplyMessage.key in messengerDriver.messagesRecord)) {
			
			// return Promise.each(divs, function(div, index, length) {
			// 	return div.getText().then(function(text) {
			// 		if(text !== options[index]) {
			// 			throw new Error("'" + text + "' is not expected. Supposed option is '" + options[index] + "'");
			// 		}
			// 	});
			// })
			// .then(function() {
			// 	that.expectedQuickReplyMessage.options = options;
			// 	messengerDriver.record_message(that.expectedQuickReplyMessage, 'quickReply');	
			// });

			//below logic doesn't check the options of quick reply
			return new Promise(function(resolve, reject) {
				that.expectedQuickReplyMessage.options = options;
				messengerDriver.record_message(that.expectedQuickReplyMessage, 'quickReply');
				return resolve();
			});
		}
		 
	};
}

QuickReplyMessage.htmlTag = "div[class='_10-e']";
//quick reply doesn't need log because previous one will disappear



module.exports = QuickReplyMessage;




