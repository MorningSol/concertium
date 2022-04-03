var ytPlayerEl = document.querySelector("#ytplayer");
var searchBtnEl = document.querySelector("#")

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
        });
    });
};

var getEventData = function(city){
    var concertApi = "https://api.seatgeek.com/2/events?venue.city=" + city + "&per_page=10&taxonomies.name=concert&client_id=MjYzNTM0MjB8MTY0ODc0MDYyMS44ODMyNzE1";

    fetch(concertApi)
    .then(function(response){
        response.json().then(function(data){
           console.log(data);
          
            

            for (var i = 0; i < data.events.length; i++){

                var eventTitle = data.events[i].title;
                var eventDate = data.events[i].datetime_local;
                var eventVenue = data.events[i].venue.name
                var eventUrl = data.events[i].venue.url;
                var eventPerformers = data.events[i].performers
                
                console.log(eventTitle);
                console.log(eventDate);
                console.log(eventVenue);
                console.log(eventUrl);
                console.log(eventPerformers);
                
                createEventCard(eventTitle, eventDate, eventVenue, eventUrl ,eventPerformers)
            };
        });
    });
};

var createEventCard = function(eventTitle, eventDate, eventVenue, eventUrl ,eventPerformers){
    
    
    for (var i = 0; i < eventPerformers.length; i++){
        var performer = eventPerformers[i].name;
        var performerImage = eventPerformers[i].image;
        
        var eventCard = document.createElement("div");
        eventCard.classList = "Card";

        var cardTitle = document.createElement("");
        cardTitle.classList= "card-header";

        var cardImage = document.createElement("");
        cardImage.classList = "card-image";

        var cardInfo = document.createElement("");
        cardInfo.classList = "card-content";




    }


};
searchBtnEl.addEventListener("submit", getEventData)
// getEventData("ottawa");
// getVideoData("billy talent");