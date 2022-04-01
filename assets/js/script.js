



var getEventData = function(city){
    var concertApi = "https://api.seatgeek.com/2/events?venue.city=" + city + "&q=concert&client_id=MjYzNTM0MjB8MTY0ODc0MDYyMS44ODMyNzE1";

    fetch(concertApi)
    .then(function(response){
        response.json().then(function(data){
            console.log(data.events)
            console.log(data.events[1]);
            console.log(data.events[1].datetime_local);
            console.log(data.events[1].performers[0].name);
            console.log(data.events[1].performers[1].name);
            console.log(data.events[1].title);
            console.log(data.events[1].venue.name);
            console.log(data.events[1].venue.url);
        });
    });
}

getEventData("ottawa");