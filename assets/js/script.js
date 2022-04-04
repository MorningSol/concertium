var ytPlayerEl = document.querySelector("#ytplayer");
var citySearchBtnEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city-input");
var resultsBox = document.querySelector("#results-box");
var modalPlayer = document.querySelector("#listen-here-modal");
var modalBackground = document.querySelector(".modal-background"); 
var modalDelete = document.querySelector(".delete")


var getVideoData = function(band){
    var videoApi = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + band + "&maxResults=1&type=video&key=AIzaSyCbq62d8uqQFXIYt2QwFKC3x2we8t8KYEc"

    fetch(videoApi)
    .then(function(response){
        response.json().then(function(data){
            console.log(data);
            var videoId = data.items[0].id.videoId;
            console.log(videoId)
            var video = "https://www.youtube.com/embed/" + videoId
            
            ytPlayerEl.src = video;
            modalPlayer.setAttribute("class","modal is-active")
        });
    });
};

var getEventData = function(city){
    var concertApi = "https://api.seatgeek.com/2/events?venue.city=" + city + "&per_page=10&taxonomies.name=concert&client_id=MjYzNTM0MjB8MTY0ODc0MDYyMS44ODMyNzE1";

    fetch(concertApi)
    .then(function(response){
        response.json().then(function(data){
           console.log(data);
            
            if (data.events.length === 0 ){
                    alert("Error: Could Not Find " + city)
            }
            else {

                for (var i = 0; i < data.events.length; i++){

                    
                    var eventDate = data.events[i].datetime_local;
                    var eventVenue = data.events[i].venue.name
                    var eventUrl = data.events[i].venue.url;
                    var eventPerformers = data.events[i].performers
                    
                    createEventCard(eventDate, eventVenue, eventUrl ,eventPerformers)
                };
            };   
        });
    });
};

var createEventCard = function(eventDate, eventVenue, eventUrl ,eventPerformers){
    
    
    for (var i = 0; i < eventPerformers.length; i++){
        var performer = eventPerformers[i].name;
        var performerImage = eventPerformers[i].image;
        
        var div1 = document.createElement("div");
        div1.classList = "column is-4-tablet is-3-desktop";
        var eventCard = document.createElement("div");
        eventCard.classList = "card";
        var cardHeader = document.createElement("div");
        cardHeader.classList = "media has-text-centered px-6";
        var div2 = document.createElement("div");
        div2.classList = "media-content mt-4";
        var date = document.createElement("p");
        date.textContent = eventDate
        var title = document.createElement("p");
        title.classList = "title is-4 mt-1";
        title.textContent = performer;
        var venue = document.createElement("p");
        venue.classList = "subtitle is-5";
        venue.textContent = eventVenue;

        div2.appendChild(date);
        div2.appendChild(title);
        div2.appendChild(venue);
        cardHeader.appendChild(div2);

        var cardImage = document.createElement("div");
        cardImage.classList = "card-image";
        var figure = document.createElement("figure");
        figure.classList = "image is-4by3";
        var bandImg = document.createElement("img");
        bandImg.src = performerImage;

        figure.appendChild(bandImg);
        cardImage.appendChild(figure);
        
        var cardContent = document.createElement("div");
        cardContent.classList = "card-content block";
        var div3 = document.createElement("div");
        div3.classList = "content";
        var ticketBtn = document.createElement("div");
        ticketBtn.classList = "control";
        var button1 = document.createElement("a");
        button1.classList = "button is-large is-fullwidth is-warning"
        button1.setAttribute("href",eventUrl);
        button1.setAttribute("target", "_blank") 
        button1.textContent = "Buy a Ticket"
        var modalBtn = document.createElement("div");
        modalBtn.classList = "control mt-2 block";
        var button2 = document.createElement("button");
        button2.classList = "button js-modal-trigger is-large is-fullwidth is-warning";
        button2.textContent = "Listen Here";
        button2.setAttribute("data-target","listen-here-modal")
        button2.setAttribute("id",performer)
        ticketBtn.appendChild(button1)
        modalBtn.appendChild(button2)
        div3.appendChild(ticketBtn)
        div3.appendChild(modalBtn)
        cardContent.appendChild(div3);

        eventCard.appendChild(cardHeader)
        eventCard.appendChild(cardImage)
        eventCard.appendChild(cardContent)
        div1.appendChild(eventCard);
        resultsBox.appendChild(div1);

    }  
};


var searchButtonHandler = function(event){
    event.preventDefault();

    var allCards = document.querySelectorAll(".column");

    for (var i= 0; i < allCards.length; i++){
        allCards[i].remove();
    };
    
    var city = cityInputEl.value.trim();

    if (city) {
        getEventData(city);
        cityInputEl.value = "";
    }
    else {
        alert("Please enter a city");
    }       
};

var videoButtonHandler = function(event){
    
    var band = event.target.id.trim();
    console.log(band)
    getVideoData(band)    
};


citySearchBtnEl.addEventListener("submit",searchButtonHandler)
resultsBox.addEventListener("click",videoButtonHandler)

modalBackground.addEventListener("click",function(){
    ytPlayerEl.src = "";
    modalPlayer.setAttribute("class","modal")
});

modalDelete.addEventListener("click",function(){
    ytPlayerEl.src = "";
    modalPlayer.setAttribute("class","modal")
});

