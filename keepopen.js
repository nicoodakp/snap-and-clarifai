$(document).ready(function() {
  console.log("con2ready?");

  chrome.storage.local.get(["cslyoutubelink"], function(result) {
    var cslyoutubelink = result.cslyoutubelink;
    console.log("i get the cslyoutubelink?" + cslyoutubelink);

    if (typeof cslyoutubelink === "undefined") {
      console.log("no previous played video, I am hidding");
      $(".popup-player-container").css("display", "");
    } //end if
    else {
      // popuplink = result.youtubelink;
      lsyoutubelink = localStorage.getItem("lsyoutubelink");

      console.log("chrome sto local is" + cslyoutubelink);
      console.log("??");
      // console.log(result.youtubelink);
      linkkk = document.createElement("link");
      linkkk.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
      linkkk.rel = "stylesheet";
      document.head.appendChild(linkkk);

      document.body.appendChild(container);
      $(".popup-player-container").show();

      ///drag event
      var $draggable = $(".draggable").draggabilly({
        // options...
      });

      $draggable.on("dragMove", function() {
        $(".popup-player").hide();
        $("#close-iconss").hide();
        $(".loadcon").hide();

      });

      $draggable.on("dragEnd", function(event, pointer) {
        $(".popup-player").show();
        $("#close-iconss").show();
        $(".loadcon").show();
          // $(".load-wrapp").css("display", "active");
      });

      /// load icon
     var loadcon = document.createElement("i");
         // loadcon.setAttribute("class","load-wrapp");
         // loadcon.setAttribute("id","loading");
     //     loadcon.setAttribute("alt","loading");
     //     $( '.popup-player-container' ).append(loadcon);
        loadcon.setAttribute("class","material-icons loadcon");
        loadcon.setAttribute("alt","loading");
        loadcon.innerHTML = "hourglass_empty";
        loadcon.style.zIndex = "1500";
        loadcon.style.position = "relative";
        loadcon.style.top = "1.5in";
        loadcon.style.left = "2.59in";
        loadcon.style.height = "2.569in";
        loadcon.style.color = "white";
        loadcon.style.fontSize = "-webkit-xxx-large";

         $( '.popup-player-container' ).append(loadcon);
     // var loadcon1 = document.createElement("div");
     //     loadcon1.setAttribute("class", "load-wrapp");
     //     loadcon1.setAttribute("id", "lo");
     //     loadcon1.style.position = "relative";
     //     loadcon1.style.top = "-0.4in";
     //     loadcon1.style.right = "0.1in";
     //     loadcon1.style.zIndex = "1800";
     //
     //     $('.load-wrapp').append(loadcon1);
     //
     // var loadcon2 = document.createElement("div");
     //     loadcon2.setAttribute("class", "load-1");
     //     $( 'div#lo' ).append(loadcon2);
     //
     // var $newdiv;
     //   for (var i = 0; i < 3; i++) {
     //       $newdiv = $('<div class="line" />');
     //       $('.load-1').append($newdiv);
     //   }
///end loading con

      var overlay = document.createElement("iframe");
      var oStyle = overlay.style;
      overlay.setAttribute("id", "player");
      overlay.setAttribute("class", "popup-player");
      ///  mainipulate playtime from current popup, not inherit from original playtime
      // newvideo = document.getElementsByClassName('video-stream html5-main-video')[0];
      // newplaytime = newvideo.currentTime;
      // urlpt1 = lsyoutubelink.split('=')[0];
      // newurl = urlpt1 + "=" + newplaytime + "&autoplay=1&modestbranding=1";
      // console.log(newurl);

      ///
      overlay.setAttribute("src", cslyoutubelink);
      oStyle.position = "relative";
      oStyle.display = "block !important";
      oStyle.width = "500px";
      oStyle.height = "315px";
      oStyle.top = "-2.51in";
      oStyle.right = "-8.5px";
      oStyle.zIndex = "2000";
      oStyle.borderRadius = "11px";
      oStyle.border = "1px solid rgb(88, 220, 229, 0.5)";
      $(".popup-player-container").append(overlay);

      var closeicon = document.createElement("i");
      clostyle = closeicon.style;
      clostyle.position = "relative";
      clostyle.top = "-5.85in";
      clostyle.right = "-5.06in";
      clostyle.color = "white";
      clostyle.cursor = "pointer";
      clostyle.zIndex = "2020";
      closeicon.setAttribute("class", "material-icons");
      closeicon.setAttribute("id", "close-iconss");
      closeicon.innerHTML = "clear";
      $(".popup-player-container").append(closeicon);

      $("body").on("click", "i#close-iconss", function() {
        $("iframe.popup-player")
          .get(0)
          .remove();
        $(".popup-player-container")
          .get(0)
          .remove();
        $(this).remove();
        localStorage.removeItem("lsyoutubelink");
        chrome.storage.local.remove(["cslyoutubelink"], function(result) {
          console.log("storage cslyoutubelink removed");
        });
        chrome.storage.sync.remove(["youtubelink"], function(result) {
          console.log("storage youtubelink removed");
        });
      });
    } /// else
  }); // end get storage
  //////////////////////////////
}); ///end ready

chrome.storage.local.get(["cslyoutubelink"], function(obj) {
  var container = document.createElement("div");
  var conStyle = container.style;
  container.setAttribute("class", "popup-player-container draggable");
  container.setAttribute("draggable", "true");
  conStyle.width = "518px";
  conStyle.height = "329px";
  conStyle.position = "fixed";
  conStyle.zIndex = "1000";
  conStyle.display = "none !important";
  conStyle.top = "63.8%";
  conStyle.right = "2.2px";
  conStyle.background = "linear-gradient(135deg, rgba(85,239,203,1) 0%,rgba(30,87,153,1) 0%,rgba(85,239,203,1) 0%,rgba(91,202,255,1) 100%)";
  conStyle.display = "none";
  conStyle.cursor = "-webkit-grab";
  //

  //     cslyoutubelink = obj.cslyoutubelink;
  // if ( cslyoutubelink == "undefined" ) {
  //   // conStyle.display='none';
  //   console.log("???", cslyoutubelink);
  // }
  //   else {
  //         conStyle.display='active';
  //         console.log("went here?");
  //         }
});
