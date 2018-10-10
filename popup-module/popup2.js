$(document).ready(()=> {
var container = document.createElement("div");
var conStyle=container.style;
container.setAttribute('class', 'popup-player-container');
conStyle.width='518px';
conStyle.height='319px';
conStyle.position='fixed';
conStyle.top='56%';
conStyle.right='0.1in';
conStyle.background='black';
document.body.appendChild(container);

var overlay=document.createElement("div");
var oStyle=overlay.style;
overlay.setAttribute('id', 'player');
overlay.setAttribute('class', 'popup-player');
overlay.setAttribute('src', '');
oStyle.position='fixed';
oStyle.display='block !important';
oStyle.width='500px';
oStyle.height='314px';
oStyle.top='6.2.4in';
oStyle.right='18.5px';
oStyle.borderRadius='3px';
oStyle.border='1px solid #000';
document.popup-player-container.appendChild(overlay);

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
    $('.popup-player-container').hide();
    $(this).hide();
    });
}); // end doc ready



var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          key: 'AIzaSyAqUTJ7FN3wt8NqNP8557WMcS9VfYhXKaw',
          events: {
            'onReady': function() {player.loadVideoById("S12cgccAsy0", 25, "large")},
            'onStateChange': onPlayerStateChange
          }
        });
      }




      // player.loadVideoById("Huab6p5HW0E", 5, "large");

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();

      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          // setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }
