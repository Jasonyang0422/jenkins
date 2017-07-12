$( document ).ready(function() {
    console.log( "ready!" );
    var str = SCREENSHOTS[0];
    SCREENSHOTS.forEach(function(imageStr) {
    	var htmlString = '<li><img class="screenshot" src="' + 'data:image/jpeg;base64, ' + imageStr + '"></li>'
    	$("#container").append(htmlString);
    });
    // $("img").attr("src", "data:image/jpeg;base64, " + str);
    setInterval(function(){ console.log("Hello"); }, 1000);
});