var Promise = require('bluebird')
var By = require('selenium-webdriver').By;
var until = require('selenium-webdriver').until;

function VideoMessages(videoMessages, messengerDriver) {

	this.expectedVideoMessages = videoMessages;

	this.video_messages_processor = function() {
		var that = this;
		return get_all_video_elements()
			.then(function(videos) {
				filter_video_elements.call(that, videos);
			});
	};

	function get_all_video_elements() {
		return messengerDriver.driver.findElements(By.css(VideoMessages.htmlTag));
	};

	function filter_video_elements(videos) {

		var that = this;

		if(videos) {
			var startIndex = VideoMessages.log.videosLength;
			VideoMessages.log.videosLength = videos.length;
			videos = videos.slice(startIndex);

			if(videos.length > 0) {

				// // phantomjs doesn't support video and audio. It can find the video tag though.
				// if(messengerDriver.browser == 'phantomjs') {
				// 	return Promise.each(videos, function(video) {
				// 		for(var i = 0; i < that.expectedVideoMessages.length; i++) {
				// 			var expectedVideo = that.expectedVideoMessages[i];
				// 			if(!(expectedVideo.key in messengerDriver.messagesRecord)) {
				// 				expectedVideo.src = null;
				// 				messengerDriver.record_message(expectedVideo, 'video');						
				// 			}
				// 		}
				// 	});
				// } else {
				// 	return Promise.each(videos, function(video) {
				// 		return video.getAttribute('src').then(function(src) {
				// 			that.expectedVideoMessages.forEach(function(videoMessage) {
				// 				if(src.includes(videoMessage.src)) {
				// 					videoMessage.src = src;
				// 					messengerDriver.record_message(videoMessage, 'video');
				// 				}
				// 			});
				// 		});
				// 	});

				// }

				// below logic doesn't check video url, which is more scalable.
				// because once video is re-uploaded to FB, ID will be changed. 
				return Promise.each(videos, function(video) {
					for(var i = 0; i < that.expectedVideoMessages.length; i++) {
						var expectedVideo = that.expectedVideoMessages[i];
						if(!(expectedVideo.key in messengerDriver.messagesRecord)) {
							expectedVideo.src = null;
							messengerDriver.record_message(expectedVideo, 'video');						
						}
					}
				});
			}
		}
	};

}


VideoMessages.htmlTag = "video[class='_ox1']";
VideoMessages.log = { videosLength: 0 };

module.exports = VideoMessages;









