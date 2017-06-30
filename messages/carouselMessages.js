var Promise = require('bluebird')
var By = require('selenium-webdriver').By;
var until = require('selenium-webdriver').until;

function CarouselMessages(carouselMessages, messengerDriver) {

	this.expectedCarouselMessages = carouselMessages;

	this.carousel_messages_processor = function() {
		var that = this;
		return get_all_carousel_elements()
			.then(function(carousels) {
				filter_carousel_elements.call(that, carousels);
			});
	};

	function get_all_carousel_elements() {
		return messengerDriver.driver.findElements(By.css(CarouselMessages.htmlTag));
	};

	function filter_carousel_elements(carousels) {

		var that = this;
		
		if(carousels) {
			var startIndex = CarouselMessages.log.carouselsLength;
			CarouselMessages.log.carouselsLength = carousels.length;
			carousels = carousels.slice(startIndex);

			if(carousels.length > 0) {
				return Promise.each(carousels, function(carousel) {
					//image src is not predictable because it changes constantly
					for(var i = 0; i < that.expectedCarouselMessages.length; i++) {
						var expectedCarousel = that.expectedCarouselMessages[i];
						if(!(expectedCarousel.key in messengerDriver.messagesRecord)) {
							return messengerDriver.record_message(expectedCarousel, 'carousel');					
						}
					}
				});
			}
		}
	};
}

CarouselMessages.htmlTag = "div[class='_52mr _2poz _ui9 _4skb _5i_d _205d _8ka']";
CarouselMessages.log = { carouselsLength: 0 };


module.exports = CarouselMessages;




