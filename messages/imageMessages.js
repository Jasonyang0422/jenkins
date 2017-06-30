var Promise = require('bluebird')
var By = require('selenium-webdriver').By;
var until = require('selenium-webdriver').until;

function ImageMessages(imageMessages, messengerDriver) {

	this.expectedImageMessages = imageMessages;

	this.image_messages_processor = function() {
		var that = this;
		return get_all_image_elements()
			.then(function(imgs) {
				filter_image_elements.call(that, imgs);
			});
	};

	function get_all_image_elements() {
		return messengerDriver.driver.findElements(By.css(ImageMessages.htmlTag));
	};

	function filter_image_elements(imgs) {

		var that = this;
		
		if(imgs) {
			var startIndex = ImageMessages.log.imgsLength;
			ImageMessages.log.imgsLength = imgs.length;
			imgs = imgs.slice(startIndex);

			if(imgs.length > 0) {
				return Promise.each(imgs, function(img) {
					//image src is not predictable because it changes constantly
					for(var i = 0; i < that.expectedImageMessages.length; i++) {
						var expectedImage = that.expectedImageMessages[i];
						if(!(expectedImage.key in messengerDriver.messagesRecord)) {
							return img.getAttribute('src').then(function(srcValue) {
								// add src value to the object
								expectedImage.src = srcValue;
								messengerDriver.record_message(expectedImage, 'image');
							});							
						}
					}
				});
			}
		}
	};
}

ImageMessages.htmlTag = "._52mr.img";
ImageMessages.log = { imgsLength: 0 };


module.exports = ImageMessages;




