
console.log("content ready?");
let ssbutton = document.createElement("button");
ssbutton.setAttribute('class', 'ytp-screenshot-button ytp-button' );
ssbutton.innerText = "SS";
document.body.getElementsByClassName("ytp-right-controls")[0].appendChild(ssbutton);

$(document).ready(()=> {
       $(".ytp-screenshot-button").click(function() {
         // alert("click work?")
         chrome.runtime.getBackgroundPage(function(bg) {
           bg.capture(window);
         });

      });
})
