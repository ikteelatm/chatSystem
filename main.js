 var cntr = 0;

 function add() {
    var iframeSource = './iframe.html';
    // Create the iframe
    var iframe = document.createElement('iframe');
    var draggableElem = document.createElement('div');
    draggableElem.setAttribute('id', 'drag');

    draggableElem.appendChild(iframe);

    iframe.onload = function() {
        msg = "iframeId:" + cntr;
        iframe.contentWindow.postMessage(msg, '*');
    }

    iframe.setAttribute('src', iframeSource);
    iframe.setAttribute('id', 'iFrame' + (cntr + 1));
    iframe.setAttribute('name', 'iFrame' + (cntr + 1));

    document.body.appendChild(draggableElem);

    // make the div which contains the iframe draggable
    $(draggableElem).draggable({
      iframeFix: true
    });


    // message sent by system when iframe created
    var msg = "[system] - iframe" + (cntr + 1) + " joined the conversation";
    // Send a message to the child iframe
    sendMessage(msg);
    cntr++;
}

 // event listener 
function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener){
        element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, eventHandler);
    }
}


// Listen to message from child window
bindEvent(window, 'message', function (e) {
    // send message to all the existing frames
    var obj = JSON.parse(e.data);
    var msg = "[" + obj.source + "] - "+ obj.msg;
    sendMessage(msg);
});


// Send a message to the child iframe
var sendMessage = function(msg) {
    var iframes = document.getElementsByTagName('iframe');
    for (var i =0 ; i < iframes.length; i++) {
        iframes[i].contentWindow.postMessage(msg, '*');
    }
};