if('serviceWorker' in navigator){
    navigator.serviceWorker.register("sw.js").then(reg => {
        console.log(`Registration:`, reg);
    }).catch(err => {
        console.warn(`Registration:`, err);
    })
}   

const prepend = msg => {
    let initElement = document.createElement("div"),
        initContent = document.createTextNode(`${msg}`),
        consoleNode = document.getElementById("console");
    initElement.appendChild(initContent);

    consoleNode.insertBefore(initElement, consoleNode.childNodes[0]);    
}

window.onload = () => {    
    prepend(`console@${window.location.hostname}`);

    document.getElementById("request").onclick = () => {
        if("Notification" in window){
            Notification.requestPermission(stat => {
                prepend(stat);
            })
        } else {
            prepend("Notification API is not supported in your browser!");
        }
    }

    document.getElementById("show").onclick = () => {
        if("Notification" in window){
            Notification.requestPermission(stat => {
                if(stat === "granted"){
                    navigator.serviceWorker.getRegistration().then(sw => {
                        let options = {
                            body: "Let's buy some Nendoroid!",
                            icon: "img/Sukusuku Hakutaku.png",
                        }
                        sw.showNotification("I want to buy a Nendoroid!", options);
                        prepend("Show Notification");
                    })
                } else {
                    prepend("Notification isn't granted");
                }
            })
        } else {
            prepend("Notification API is not supported in your browser!");
        }
    }
}
     
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
    