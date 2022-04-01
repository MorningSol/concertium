



var getEventData = function(city){
    var concertApi = "https://api.seatgeek.com/2/events?venue.city=" + city + "&q=concert&client_id=MjYzNTM0MjB8MTY0ODc0MDYyMS44ODMyNzE1";

    fetch(concertApi)
    .then(function(response){
        response.json().then(function(data){
           
          
            console.log(data.events)

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
    

};

getEventData("ottawa");