var id;
var inputField;


function setId(idFromMain) {
    id = idFromMain;
    document.getElementById("footer").innerHTML = "[iframe" + id + "]: " + document.getElementById("footer").innerHTML;
     listen();
}

 // handling the click handler of send button
 function send() {
    var msg = document.getElementById("txt");
    if (msg && msg.value != "")
        sendMessage(msg.value);
    msg.value = "";
}


// Listen to messages from parent window
bindEvent(window, 'message', function (e) {
    if (e.data.includes("iframeId:"))
        setId(e.data.split(":")[1]);
    else {
        var results = document.getElementById('conversation');
        var newMsg = document.createElement('p');
        newMsg.innerHTML = e.data;
        results.appendChild(newMsg);
        var d = $('#conversation');
        d.scrollTop(d.prop("scrollHeight"));
    }
});

 // event listener 
function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener) {
        element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, eventHandler);
    }
}
// Send a message to the parent
var sendMessage = function (msg) {
    // Make sure you are sending a string, and to stringify JSON
    var message = {
        'msg': msg,
        'source': window.name 
    };

    var msgToSend = JSON.stringify(message);
    window.parent.postMessage(msgToSend, '*');
};

function listen() {
    inputField = document.getElementById("txt");
    inputField.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("send").click();
        }
    });
}



