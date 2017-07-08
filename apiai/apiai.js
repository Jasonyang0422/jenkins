var rp = require('request-promise');
var asset = require('../asset/asset');

function get_intent_by_id(id) {
	var options = {
	    uri: 'https://api.api.ai/v1/intents/' + id,
	    headers: {
	        'User-Agent': 'Request-Promise',
	        'Authorization': 'Bearer ' + asset.API_AI_ACCESS_TOKEN
	    },
	    json: true // Automatically parses the JSON string in the response
	};
	return rp(options);
}

module.exports = { get_intent_by_id };