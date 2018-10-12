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
      });

      $draggable.on("dragEnd", function(event, pointer) {
        $(".popup-player").show();
        $("#close-iconss").show();
      });

      ///

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
      oStyle.top = "6px";
      oStyle.right = "-8.5px";
      oStyle.borderRadius = "11px";
      oStyle.border = "1px solid rgb(39, 147, 230)";
      $(".popup-player-container").append(overlay);

      var closeicon = document.createElement("i");
      clostyle = closeicon.style;
      clostyle.position = "relative";
      clostyle.top = "-3.28in";
      clostyle.right = "-5.06in";
      clostyle.color = "white";
      clostyle.cursor = "pointer";
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
  conStyle.background = "rgb(39, 147, 230)";
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
