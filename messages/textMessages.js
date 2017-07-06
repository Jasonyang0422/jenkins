var Promise = require('bluebird')
var By = require('selenium-webdriver').By;
var until = require('selenium-webdriver').until;

function TextMessages(textMessages, messengerDriver) {

	this.expectedTextMessages = textMessages;

	this.text_messages_processor = function() {
		var that = this;
		return get_all_text_elements()
			.then(function(spans) {
				filter_text_elements.call(that, spans);
			});
	};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> private members <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

	function get_all_text_elements() {
		return messengerDriver.driver.findElements(By.css(TextMessages.htmlTag));
	};

	function filter_text_elements(spans) {

		var that = this;

		if(spans) {
			// use log to record spans length during last checking
			// so previous messages will not be check
			// it is in order to prevent from previous messages with same content being recorded
			var startIndex = TextMessages.log.spansLength;
			TextMessages.log.spansLength = spans.length;
			spans = spans.slice(startIndex);
			if(spans.length > 0) {
				return Promise.each(spans, function(span) {
					return span.getText().then(function(text) {
						that.expectedTextMessages.forEach(function(textMessage) {

							textMessage.content = string_filter(textMessage.content);

							if(text.includes(textMessage.content)) {
								//override the content with complete text
								textMessage.content = text;
								messengerDriver.record_message(textMessage, 'text');			
							}
						});
					});
				});
			}
		}
	};

	function string_filter(string) {
		if(string.includes('#')) {
			return string.slice(0, string.indexOf('#'));
		}
		return string;
	};

}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> static members <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

TextMessages.htmlTag = "span[class='_3oh- _58nk']";
TextMessages.log = { spansLength: 0 };

module.exports = TextMessages;

















