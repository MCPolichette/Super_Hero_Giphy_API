var api_key = "xVCRIEMVtbSqDKSYUxx4bcB8UetYmDx2";
// have several buttons ready to go, and a dropdown for total pictures wanted 
var gifArray = ["Superman", "Batman", "Dr Strange", "Aquaman", "Mr Incredible", "Captain America",
    "Spiderman", "Howard Duck", "Avengers", "Antman", "Toxic Avenger", "Rocket Racoon", "Wonderwoman", "Deadpool", "Batgirl", "Justice League", "Marvel",
    "DC comics", "Frozone", "Captain Planet", "Hellboy", "X-men", "DuffMan", "wolverine", "Ironman", "Hulk", "Thor", "Groot"];
// other global variables:
var numberOfImages = 12;
var favArray = [localStorage.getItem("favoriteHeros")];
// localStorage.getItem()  

// CURRENT WORKING BUTTON DISPLAY
function buttonDisplay() {
    $("#buttonColumn1").empty()
    for (i = 0; i < gifArray.length; i++) {
        $("#buttonColumn1").append("<button type='button'  class='pic-button btn btn-warning btn-sm'>" + gifArray[i] + " </button>")
    }
    // Function for pulling up pictures based on button clicked
    $(".pic-button").on("click", function (event) {
        console.log("it works?");
        $("#pics_here").empty();
        var imageType = $(this).text();
        var queryURL = ("http://api.giphy.com/v1/gifs/search?q=" + imageType + "&api_key=" + api_key + "&limit=" + numberOfImages + "&rating=pg")
        // Place holder for other filters:  -   
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            results = response.data;
            console.log(results)
            for (i = 0; i < results.length; i++) {
                // creating a new div to put in layout and appending the rating and images to it
                var picDiv = $("<div class = ' pic_view'>");
                var infoDiv = $("<div class = 'info'>")
                var rating = $("<p class = 'rating'> Rating: " + results[i].rating + "</p>");
                var superHeroImage = $("<img class ='gif'>");
                var favButton = $("<button type ='button' class = 'favButton btn btn-success btn-sm'>Add to Favorites</button>")
                superHeroImage.attr("alt", results[i].title);
                superHeroImage.attr("src", results[i].images.fixed_width_still.url);
                superHeroImage.attr("data-still", results[i].images.fixed_width_still.url);
                superHeroImage.attr("data-move", results[i].images.fixed_width.url);
                superHeroImage.attr("data-state", "still");
                superHeroImage.attr("class", "gif");
                favButton.val(i);
                $(infoDiv).append(favButton);
                $(infoDiv).append(rating);
                $(picDiv).append(superHeroImage);
                $(picDiv).append(infoDiv);

                // appending newly made div to the Html page, and going to next one.
                $("#pics_here").append(picDiv);
            }

            $(".gif").on("click", function () {
                // switches state of still or moving gif
                var state = $(this).attr("data-state");
                console.log(this);
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-move"))
                    $(this).attr("data-state", "moving")
                } else if (state === "moving") {
                    $(this).attr("src", $(this).attr("data-still"))
                    $(this).attr("data-state", "still")
                }

            });


            $(".favButton").on("click", function () {
                console.log(results);
                var newFav = $(this).attr("value");
                console.log(results[newFav]);
                favArray.push(results[newFav]);
                console.log(favArray);
                localStorage.setItem("favoriteHeros", JSON.stringify(favArray));

            });
        });
    })
}


$(document).ready(function () {

    buttonDisplay();
    $("#add_button").on("click", function (event) {
        console.log(gifArray)
        // function that adds button to array, and re-renders the buttons with new button in addition to it
        // Write code to grab the text the user types into the input field
        var userInput = $("#new_search").val();
        event.preventDefault();
        gifArray.push(userInput);
        // The buttonDisplay function is called, rendering the list of buttons
        console.log(gifArray);
        $(".form-inline")[0].reset();
        buttonDisplay();
    });
    $("#favorite").on("click", function () {
        $("#pics_here").empty();
        console.log(favArray);
        console.log("Favorites has been clicked")
        for (i = 1; i < favArray.length; i++) {
            console.log(favArray[i]);
            // creating a new div to put in layout and appending the rating and images to it
            var picDiv = $("<div class = ' pic_view'>");
            var infoDiv = $("<div class = 'info'>")
            var rating = $("<p class = 'rating'> Rating: " + favArray[i].rating + "</p>");
            var superHeroImage = $("<img class ='gif'>");
            var favStatement = $("<p>Favorite</p>")
            superHeroImage.attr("alt", favArray[i].title);
            superHeroImage.attr("src", favArray[i].images.fixed_width_still.url);
            superHeroImage.attr("data-still", favArray[i].images.fixed_width_still.url);
            superHeroImage.attr("data-move", favArray[i].images.fixed_width.url);
            superHeroImage.attr("data-state", "still");
            superHeroImage.attr("class", "gif");

            $(infoDiv).append(favStatement);
            $(infoDiv).append(rating);
            $(picDiv).append(superHeroImage);
            $(picDiv).append(infoDiv);

            // appending newly made div to the Html page, and going to next one.
            $("#pics_here").append(picDiv);

        }
        $(".gif").on("click", function () {
            // switches state of still or moving gif
            var state = $(this).attr("data-state");
            console.log(this);
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-move"))
                $(this).attr("data-state", "moving")
            } else if (state === "moving") {
                $(this).attr("src", $(this).attr("data-still"))
                $(this).attr("data-state", "still")
            }

        });
    })
});

$("#favClear").on("click", function () {
    favArray = [""];
    localStorage.clear("favoriteHeros");
});

