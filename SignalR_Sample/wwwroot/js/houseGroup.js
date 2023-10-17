﻿let lbl_houseJoined = document.getElementById("lbl_houseJoined");


let btn_un_gryffindor = document.getElementById("btn_un_gryffindor");
let btn_un_slytherin = document.getElementById("btn_un_slytherin");
let btn_un_hufflepuff = document.getElementById("btn_un_hufflepuff");
let btn_un_ravenclaw = document.getElementById("btn_un_ravenclaw");
let btn_gryffindor = document.getElementById("btn_gryffindor");
let btn_slytherin = document.getElementById("btn_slytherin");
let btn_hufflepuff = document.getElementById("btn_hufflepuff");
let btn_ravenclaw = document.getElementById("btn_ravenclaw");

let trigger_gryffindor = document.getElementById("trigger_gryffindor");
let trigger_slytherin = document.getElementById("trigger_slytherin");
let trigger_hufflepuff = document.getElementById("trigger_hufflepuff");
let trigger_ravenclaw = document.getElementById("trigger_ravenclaw");

var connectionhouseCount = new signalR.HubConnectionBuilder()
    // .configureLogging(signalR.LogLevel.Information) 
    .withUrl("/hubs/houseGroup", signalR.HttpTransportType.WebSockets).build();

//subscribe
btn_gryffindor.addEventListener("click", function (event) {
    connectionhouseCount.send("JoinHouse", "Gryffindor");
    event.preventDefault();
});
btn_slytherin.addEventListener("click", function (event) {
    connectionhouseCount.send("JoinHouse", "Slytherin");
    event.preventDefault();
});
btn_hufflepuff.addEventListener("click", function (event) {
    connectionhouseCount.send("JoinHouse", "Hufflepuff");
    event.preventDefault();
});
btn_ravenclaw.addEventListener("click", function (event) {
    connectionhouseCount.send("JoinHouse", "Ravenclaw");
    event.preventDefault();
});


// unsubscribe
btn_un_gryffindor.addEventListener("click", function (event) {
    connectionhouseCount.send("LeaveHouse", "Gryffindor");
    event.preventDefault();
});
btn_un_slytherin.addEventListener("click", function (event) {
    connectionhouseCount.send("LeaveHouse", "Slytherin");
    event.preventDefault();
});
btn_un_hufflepuff.addEventListener("click", function (event) {
    connectionhouseCount.send("LeaveHouse", "Hufflepuff");
    event.preventDefault();
});
btn_un_ravenclaw.addEventListener("click", function (event) {
    connectionhouseCount.send("LeaveHouse", "Ravenclaw");
    event.preventDefault();
});

connectionhouseCount.on("subscriptionStatus", (strGroupJoined, houseName, hasSubscribe) => {
    lbl_houseJoined.innerText = strGroupJoined;
    if (hasSubscribe) {
        switch (houseName) {
            case 'slytherin':
                btn_slytherin.style.display = "none";
                btn_un_slytherin.style.display = "";
                break;
            case 'gryffindor':
                btn_gryffindor.style.display = "none";
                btn_un_gryffindor.style.display = "";
                break;
            case 'hufflepuff':
                btn_hufflepuff.style.display = "none";
                btn_un_hufflepuff.style.display = "";
                break;
            case 'ravenclaw':
                btn_ravenclaw.style.display = "none";
                btn_un_ravenclaw.style.display = "";
                break;
            default:
                break;
        }
        toastr.success(`You have subcribe successfully. ${houseName}`);
    } else {
        // unsubscribe
        switch (houseName) {
            case 'slytherin':
                btn_slytherin.style.display = "";
                btn_un_slytherin.style.display = "none";
                break;
            case 'gryffindor':
                btn_gryffindor.style.display = "";
                btn_un_gryffindor.style.display = "none";
                break;
            case 'hufflepuff':
                btn_hufflepuff.style.display = "";
                btn_un_hufflepuff.style.display = "none";
                break;
            case 'ravenclaw':
                btn_ravenclaw.style.display = "";
                btn_un_ravenclaw.style.display = "none";
                break;
            default:
                break;
        }
        toastr.success(`You have unsubcribe successfully. ${houseName}`);
    }
});

function fullFilled() {
    console.log("Connection to User hub successfully!!!");
}
// Fail 
function rejected() {

}
// start connection
connectionhouseCount .start().then(fullFilled, rejected);