$( document ).ready(function() {
  console.log("con2ready?");


if ( localStorage.getItem('lsyoutubelink') === null ) {
    console.log("no previous played video, I am hidding");
  }  //end if
else {
  // popuplink = result.youtubelink;
  lsyoutubelink = localStorage.getItem('lsyoutubelink');
  console.log("??");
  // console.log(result.youtubelink);
  linkkk = document.createElement('link');
  linkkk.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
  linkkk.rel = 'stylesheet';
  document.head.appendChild(linkkk);

  document.body.appendChild(container);
  $('.popup-player-container').show();
  var overlay=document.createElement("iframe");
  var oStyle=overlay.style;
  overlay.setAttribute('id', 'player');
  overlay.setAttribute('class', 'popup-player');
  ///  mainipulate playtime from current popup, not inherit from original playtime
  // newvideo = document.getElementsByClassName('video-stream')[0];
  // newplaytime = newvideo.currentTime;
  // urlpt1 = lsyoutubelink.split('=')[0];
  // newurl = urlpt1 + "=" + newplaytime + "&autoplay=1&modestbranding=1";
  // console.log(newurl);

  ///
  overlay.setAttribute('src', lsyoutubelink);
  oStyle.position='fixed';
  oStyle.display='block !important';
  oStyle.width='500px';
  oStyle.height='314px';
  oStyle.top='6.2.4in';
  oStyle.right='18.5px';
  oStyle.borderRadius='3px';
  oStyle.border='1px solid #000';
  $('.popup-player-container').append(overlay);

  var closeicon = document.createElement("i");
      clostyle = closeicon.style;
      clostyle.position='relative';
      clostyle.top = '1px';
      clostyle.right = '-5.13in';
      clostyle.color = 'white';
      clostyle.cursor = 'pointer';
      closeicon.setAttribute("class", "material-icons");
      closeicon.setAttribute("id", "close-iconss");
      closeicon.innerHTML = "clear";
      $('.popup-player-container').append(closeicon);

  $('body').on('click', 'i#close-iconss', function (){
      $('iframe.popup-player').get(0).remove();
      $('.popup-player-container').get(0).remove();
      $(this).remove();
      localStorage.removeItem('lsyoutubelink');
      // chrome.storage.sync.remove(['youtubelink'], function(result) {
      //   console.log("storage youtubelink removed");
      // });
      });
}  /// else
// });  // end get storage
//////////////////////////////
});  ///end ready

var container = document.createElement("div");
var conStyle=container.style;
container.setAttribute('class', 'popup-player-container');
conStyle.width='518px';
conStyle.height='319px';
conStyle.position='fixed';
conStyle.zIndex='1000';
// conStyle.display='none';
conStyle.top='56%';
conStyle.right='0.1in';
conStyle.background='black';
if (localStorage.getItem('lsyoutubelink') == null) {
  conStyle.display='none';
}
  else {
        conStyle.display='active';
        }