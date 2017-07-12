$( document ).ready(function() {
    console.log( "SCREENSHOTS LENGTH: ", SCREENSHOTS.length);
    SCREENSHOTS.forEach(function(screenshot) {
    	var title = screenshot.title;
    	var imageStr = screenshot.imageStr;
    	var htmlString = '<li><h3>' + title + '</h3><img class="screenshot" src="data:image/jpeg;base64, ' + imageStr + '"></li>'
    	$("#container").append(htmlString);
    });
    // $("img").attr("src", "data:image/jpeg;base64, " + str);
});