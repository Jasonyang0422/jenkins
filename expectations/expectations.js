var asset = require('../asset/asset');
var apiai = require('../apiai/apiai');

function getExpectations() {
	
	var expectations = {};

	return get_started_expectation()
		.then(function(expectation) {
			expectations['get_started'] = expectation;
			return mind_blown_expectation();
		})
		.then(function(expectation) {
			expectations['mind_blown'] = expectation;
			return explore_vonage_expectation();
		})
		.then(function(expectation) {
			expectations['explore_vonage'] = expectation;
			return our_culture_expectation();
		})
		.then(function(expectation) {
			expectations['our_culture'] = expectation;
			return our_values_expectation();
		})
		.then(function(expectation) {
			expectations['our_values'] = expectation;
			return join_our_team_expectation();
		})
		.then(function(expectation) {
			expectations['join_our_team'] = expectation;
			return choose_location_expectation();
		})
		.then(function(expectation) {
			expectations['choose_location'] = expectation;
			return choose_job_type_expectation();
		})
		.then(function(expectation) {
			expectations['choose_job_type'] = expectation;
			return expectations;
		});

}

module.exports = { getExpectations };


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  helper functions <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function get_started_expectation() {
	return apiai.get_intent_by_id(asset.GET_STARTED_INTENT_ID)
		.then(function(intent) {
			return create_expectation(intent);
		});
}

function mind_blown_expectation() {
	return apiai.get_intent_by_id(asset.MIND_BLOWN_INTENT_ID)
		.then(function(intent) {
			return create_expectation(intent);
		});
}

function explore_vonage_expectation() {
	return apiai.get_intent_by_id(asset.EXPLORE_VONAGE_INTENT_ID)
		.then(function(intent) {
			return create_expectation(intent);
		});
}

function our_culture_expectation() {
	return apiai.get_intent_by_id(asset.OUR_CULTURE_INTENT_ID)
		.then(function(intent) {
			return create_expectation(intent);
		});
}

function our_values_expectation() {
	return apiai.get_intent_by_id(asset.OUR_VALUES_INTENT_ID)
		.then(function(intent) {
			return create_expectation(intent);
		});
}

function join_our_team_expectation() {
	return apiai.get_intent_by_id(asset.JOIN_OUR_TEAM_INTENT_ID)
		.then(function(intent) {
			return create_expectation(intent);
		});
}

function choose_location_expectation() {
	return apiai.get_intent_by_id(asset.FIND_AREA_OF_INTEREST_INTENT_ID)
		.then(function(intent) {
			return create_expectation(intent);
		});
}

function choose_job_type_expectation() {
	return apiai.get_intent_by_id(asset.COLLECT_JOB_TYPE_INTENT_ID)
		.then(function(intent) {
			return create_expectation(intent);
		});
}

function create_expectation(intent) {
	var messages = intent.responses[0].messages;
	var intentName = intent.name;
	var expectation = { messagesAmount: 0 };

	messages.forEach(function(message, index) {

		var key = intentName + ' message: ' + index;

		switch(message.type) {
			//text
			case 0:
				text_messages_expectation_helper(message, expectation, key);
				break;

			//quick reply
			case 2:
				quick_reply_messages_expectation_helper(message, expectation, key);
				break;

			//image
			case 3:
				break;
			
			//custom payload
			case 4:
				custom_payload_expectation_helper(message, expectation, key);
				break;

		}
	});

	//response from wenhook can't be retrieved from intent api.
	//At this point, carousel message is from webhook.
	if(intent.webhookUsed) {
		switch(intent.responses[0].action) {
			case "collect_job_type":
				var key = intentName + ' message: ' + (expectation.messagesAmount + 1);
				carousel_messages_expectation_helper(expectation, key);
				break;
		}
	}

	// console.log("EXPECTATION: ", expectation);

	return expectation;
}

function text_messages_expectation_helper(message, expectation, key) {
	//filter those invalid message such as { "type": 0, "speech": [] }
	if(typeof message.speech === 'string') {
		expectation.textMessages = !expectation.textMessages ? [] : expectation.textMessages;
		expectation.textMessages.push({
			key: key,
			content: message.speech
		});
		expectation.messagesAmount ++;
	}	
}

function quick_reply_messages_expectation_helper(message, expectation, key) {
	expectation.quickReplyMessage = !expectation.quickReplyMessage ? {} : expectation.quickReplyMessage;
	expectation.textMessages = !expectation.textMessages ? [] : expectation.textMessages;
	// quick reply titile is another text message during the test
	expectation.textMessages.push({
		key: key + " (quick reply title)",
		content: message.title
	})

	expectation.quickReplyMessage = {
		key: key,
		options: message.replies
	}

	// title and replies count 2 messages
	expectation.messagesAmount += 2;
}

function custom_payload_expectation_helper(message, expectation, key) {
	if(message.payload.facebook) {
		var payload = message.payload.facebook.attachment.payload;
		if(payload.isVideo) {
			expectation.videoMessages = !expectation.videoMessages ? [] : expectation.videoMessages;
			expectation.videoMessages.push({
				key: key,
				src: asset.VIDEO_URL_MAP[payload.urls[0]]
			});
			expectation.messagesAmount ++;
		}		
	}

	//Image payload
	//can't track image url
	if(message.payload.urls) {
		expectation.imageMessages = !expectation.imageMessages ? [] : expectation.imageMessages;
		expectation.imageMessages.push({
			key: key
		});
		expectation.messagesAmount ++;
	}

}

function carousel_messages_expectation_helper(expectation, key) {
	expectation.carouselMessages = !expectation.carouselMessages ? [] : expectation.carouselMessages;
	expectation.carouselMessages.push({
		key: key
	});
	expectation.messagesAmount ++;
}










