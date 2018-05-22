// Api Key: xVCRIEMVtbSqDKSYUxx4bcB8UetYmDx2
// have 5 or six buttons ready to go, and a dropdown for total pictures wanted 
var gifArray = ["cats", "kittens", "dogs", "calfs", "birds", "muppets", "sea turtles", "awww", "rabbit", "hamster", "sugar glider", "frog", "gerbil", "pygmy goat", "chicken"];
// other global variables:
var numberOfImages = 5;

// CURRENT WORKING BUTTON DISPLAY
function buttonDisplay() {
    $("#buttonColumn1").empty()
    for (i = 0; i < gifArray.length; i++) {
        $("#buttonColumn1").append("<button type='button'  class='pic-button btn btn-success btn-sm'>" + gifArray[i] + " </button>")
    }
}


buttonDisplay();

$(".pic-button").on("click", function (event) {
    console.log("it works?")
    $("#pics_here").empty();

    var imageType = $(this).text();
    var queryURL = ("http://api.giphy.com/v1/gifs/search?q=" + imageType + "&api_key=xVCRIEMVtbSqDKSYUxx4bcB8UetYmDx2&limit=" + numberOfImages)

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        results = response.data;
        console.log(results)
        for (i = 0; i < results.length; i++) {
            // creating a new div to put in layout
            var picDiv = $("<div class = 'test'>");
            var rating = $("<p> Rating: " + results[i].rating + "</p>");
            var animalImage = $("<img class ='gif'>");
            animalImage.attr("alt", results[i].title);
            animalImage.attr("src", results[i].images.fixed_height_small_still.url);
            animalImage.attr("data-still", results[i].images.fixed_height_small_still.url);
            animalImage.attr("data-move", results[i].images.fixed_height_small.url);
            animalImage.attr("data-state", "still");
            $(picDiv).append(rating);
            $(picDiv).append(animalImage);
            $("#pics_here").append(picDiv);

        }

    });
})
$("#add_button").on("click", function (event) {
    console.log(gifArray)
    // function that adds button to array, and re-renders the buttons with new button in addition to it
    event.preventDefault();
    // Write code to grab the text the user types into the input field
    var userInput = $("#new_search").val();
    gifArray.push(userInput);
    // The renderButtons function is called, rendering the list of movie buttons
    console.log(gifArray)
    buttonDisplay();
});
$(".test").on("click", function (event) {

    console.log("test");
    console.log(this)
});