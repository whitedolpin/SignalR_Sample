// create a connection


var connectionuserCount = new signalR.HubConnectionBuilder()
   // .configureLogging(signalR.LogLevel.Information) 
    .withUrl("/hubs/userCount", signalR.HttpTransportType.WebSockets).build();

// connect to meothd that hub 
connectionuserCount.on("updateTotalViews", (value) => {
    var newCountspan = document.getElementById("totalViewsCountrer");
    newCountspan.innerText = value.toString();
});

connectionuserCount.on("updateTotalUser", (value) => {
    var newCountspan = document.getElementById("totalUsersCounter");
    newCountspan.innerText = value.toString();
});
function newWindownLoadOnClient() {
    connectionuserCount.invoke("NewWindownLoaded").then((value) => console.log(value));
}
// Ok
function fullFilled() {
    console.log("Connection to User hub successfully!!!");
    newWindownLoadOnClient();
}
// Fail 
function rejected() {

}
// start connection
connectionuserCount.start().then(fullFilled, rejected);