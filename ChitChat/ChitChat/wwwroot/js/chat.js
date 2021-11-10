"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var li = document.createElement("li");
    var Time = document.createElement("li");
    var date = new Date();
    var time = date.toLocaleString('en-Us', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        weekday: 'short',
        day: 'numeric',
        year: 'numeric',
        month: 'long',
    });
    document.getElementById("messagesList").appendChild(li);
    document.getElementById("time").appendChild(Time);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    if (user == "") user = "Unknown"
    //li.textContent = `${user}: ${message} ${temp.sub}`;
    li.textContent = user + ":" + message;
    Time.textContent = time;
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});