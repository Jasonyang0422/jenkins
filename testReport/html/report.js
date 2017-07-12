$( document ).ready(function() {
    console.log( "SCREENSHOTS LENGTH: ", SCREENSHOTS.length);
    SCREENSHOTS.forEach(function(imageStr) {
    	var htmlString = '<li><img class="screenshot" src="' + 'data:image/jpeg;base64, ' + imageStr + '"></li>'
    	$("#container").append(htmlString);
    });
    // $("img").attr("src", "data:image/jpeg;base64, " + str);
    setInterval(function(){ console.log("Hello"); }, 1000);
});