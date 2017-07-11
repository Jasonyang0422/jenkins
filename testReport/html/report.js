$( document ).ready(function() {
    console.log( "ready!" );
    var str = SCREENSHOTS[0];
    $("img").attr("src", "data:image/jpeg;base64, " + str);

});