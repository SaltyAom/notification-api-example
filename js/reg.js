window.onload = () => {
    if('serviceWorker' in navigator){
        navigator.serviceWorker.register("sw.js").then(reg => {
            console.log(`Registration:`, reg);
        }).catch(err => {
            console.warn(`Registration:`, err);
        })
    }
}

$(document).ready(function(){
    $("#console").append(`Console@${window.location.hostname}`);
    $("#request").on("click", () => {
        if("Notification" in window){
            Notification.requestPermission(stat => {
                $("#console").append(`<p>${stat}</p>`);
            })
        } else {
            $("#console").append("<p>Push API is not supported!</p>")
        }
    });
    $("#show").on("click", () => {
        if("Notification" in window){
            Notification.requestPermission(stat => {
                if(stat === "granted"){
                    navigator.serviceWorker.getRegistration().then(sw => {
                        let options = {
                            body: "Do you want some salt, captain?",
                            icon: "img/ai-chan.png",
                            image: "img/saltyAI.png"
                        }
                        sw.showNotification("Message from AI Chan", options);
                        $("#console").append("<p>Show notification</p>");
                    })
                } else {
                    $("#console").append("<p>Permission isn't granted</p>")
                }
            })
        } else {
            $("#console").append("<p>Push API is not supported!</p>")
        }
    });
})

/* Valid Options
{
    "//": "Visual Options",
    "body": "<String>",
    "icon": "<URL String>",
    "image": "<URL String>",
    "badge": "<URL String>",
    "vibrate": "<Array of Integers>",
    "sound": "<URL String>",
    "dir": "<String of 'auto' | 'ltr' | 'rtl'>",

    "//": "Behavioural Options",
    "tag": "<String>",
    "data": "<Anything>",
    "requireInteraction": "<boolean>",
    "renotify": "<Boolean>",
    "silent": "<Boolean>",

    "//": "Both Visual & Behavioural Options",
    "actions": "<Array of Strings>",

    "//": "Information Option. No visual affect.",
    "timestamp": "<Long>"
}
*/