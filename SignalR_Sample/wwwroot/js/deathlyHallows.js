// create a connection
var cloakspan = document.getElementById("cloakCounter");
var stonespan = document.getElementById("stoneCounter");
var wandspan = document.getElementById("wandCounter");

var connectionDeathlyHallows = new signalR.HubConnectionBuilder()
   // .configureLogging(signalR.LogLevel.Information) 
    .withUrl("/hubs/deathyhallows").build();

// connect to meothd that hub 
connectionDeathlyHallows.on("updateDeathlyHallowCount", (cloak, stone, wand) => {
    cloakspan.innerText = cloak.toString();
    stonespan.innerText = stone.toString();
    wandspan.innerText = wand.toString();

});

// Ok
function fullFilled() {
    console.log("Connection to User hub successfully!!!");
    newWindownLoadOnClient();
}
// Fail 
function rejected() {

}
// start connection
connectionDeathlyHallows.start().then(fullFilled, rejected);