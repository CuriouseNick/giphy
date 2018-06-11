// Initial array of movies
      var animals = ["Cat", "Dog", "Capybara", "Frog", "Serval"];

      // Function for dumping the JSON content for each button into the div
      function displayMovieInfo() {

        var animal = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=EnHpwbtQxkUNLGC1BxvE1OqrKZTrbUEQ&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
              var animalDiv = $("<div class=\"animal-item\">");
    
              var rating = results[i].rating;
    
              var p = $("<p>").text("Rating: " + rating);
    
              var animated = results[i].images.fixed_height.url;
              var still = results[i].images.fixed_height_still.url;
    
              var animalImage = $("<img>");
              animalImage.attr("src", still);
              animalImage.attr("data-still", still);
              animalImage.attr("data-animate", animated);
              animalImage.attr("data-state", "still");
              animalImage.addClass("animal-image");
    
              animalDiv.append(p);
              animalDiv.append(animalImage);
    
              $("#animals-view").append(animalDiv);
            }
        });
      }
      
      //Event if image was clicked 
      $(document).on("click", ".animal-image", function() {

        var state = $(this).attr("data-state");
    
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

      // Function for displaying data
      function renderButtons() {

        // Deleting the buttons prior to adding new data
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {

          // Then dynamically generating buttons for each animal in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of animal to our button
          a.addClass("animal");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where one button is clicked
      $("#add-animal").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        // Adding the animal from the textbox to our array
        animals.push(animal);
        console.log(animals);

        // Calling renderButtons which handles the processing of our animal array
        renderButtons();
      });

      // Function for displaying the animal info
      // Using $(document).on instead of $(".movie").on to add event listeners to dynamically generated elements
      $(document).on("click", ".animal", displayMovieInfo);

      // Calling the renderButtons function to display the initial buttons
      renderButtons();