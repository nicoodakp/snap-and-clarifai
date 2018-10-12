$(document).ready(()=> {

  console.log("content ready?");
  let youtubeBtnDivName = "ytp-right-controls";
  let videoFrame = document.getElementsByClassName("html5-main-video")[0];
  let videoPage = document.getElementsByClassName("watch-title")[0];
  if (!videoPage) {
    videoPage = document.getElementsByClassName("ytd-video-primary-info-renderer")[0];
  }

  let initDone = false;
  let btnCreated = false;

      chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          console.log(sender.tab ?
                      "from a content script:" + sender.tab.url :
                      "from the extension");
          if (request.greeting == "hello")
          chrome.storage.sync.get(['key'], function(result) {


          console.log('Value currently is ' + result.key);
          var obj = { url: result.key };
          name = result.key.split('=')[1];

          /// get youtube id
          video_id = window.location.search.split('v=')[1];
          var ampersandPosition = video_id.indexOf('&');
          if(ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
          }
          //  get playtime from youtube
          console.log("current id is " + video_id );
          video = document.getElementsByClassName('video-stream')[0];
          playtime = Math.round(video.currentTime);
          console.log("current play time is " + playtime);
          var youtubelink = "https://www.youtube.com/embed/" + video_id + "?start=" + playtime + "&autoplay=1" + "&modestbranding=1" ;
          // chrome.storage.sync.set({youtubelink: youtubelink}, function() {
          //     console.log('storage youtubelink sets to ' + youtubelink);
          //   });
          chrome.storage.local.set({"cslyoutubelink":youtubelink},function (){
            console.log("Storage cslyoutubelink Succesful");
                    });

          // window.location.replace(result.key);
          document.body.appendChild(container);
          linkkk = document.createElement('link');
          linkkk.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
          linkkk.rel = 'stylesheet';
          document.head.appendChild(linkkk);



          document.body.appendChild(container);
          $('.popup-player-container').hide();

          var overlay=document.createElement("iframe");
          var oStyle=overlay.style;
          overlay.setAttribute('id', 'player');
          overlay.setAttribute('class', 'popup-player');
          overlay.setAttribute('src', youtubelink);
          oStyle.position='relative';
          oStyle.display='block !important';
          oStyle.width='500px';
          oStyle.height='314px';
          oStyle.right='-7.5px';
          oStyle.borderRadius='3px';
          oStyle.border='1px solid #000';
          $('.popup-player-container').append(overlay);

          var closeicon = document.createElement("i");
              clostyle = closeicon.style;
              clostyle.position='relative';
              clostyle.top = '-3.3in';
              clostyle.right = '-5.12in';
              clostyle.color = 'white';
              clostyle.zIndex = '9999';
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
              chrome.storage.sync.remove(['youtubelink'], function(result) {
                console.log("storage youtubelink removed");
              });
              });
        }); //end storage get

        chrome.storage.sync.remove(['key'], function(result) {
          console.log("storage key removed");
        });
      });  //end listener

});  ///end ready


function clickminimize(){
$('.ytp-miniplayer-button').trigger('click');
};

var container = document.createElement("div");
var conStyle=container.style;
container.setAttribute('class', 'popup-player-container');
conStyle.width='518px';
conStyle.height='319px';
conStyle.position='fixed';
conStyle.zIndex='1000';
conStyle.display='none';
conStyle.top='65%';
conStyle.right='2.2px';
conStyle.background='black';
conStyle.borderRadius='12px';
