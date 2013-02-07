

function init(){
  //var is_safari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;
  //var is_chrome= navigator.userAgent.toLowerCase().indexOf('chrome/') > -1;
  var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox/') > -1;
  //var is_ie = navigator.userAgent.toLowerCase().indexOf('msie ') > -1;

  if(!is_firefox){
    audiojs.events.ready(function() {
      var as = audiojs.createAll(),
          audio = as[0],
          ids = ['vol-0', 'vol-10', 'vol-40', 'vol-70', 'vol-100'];
      for (var i = 0, ii = ids.length; i < ii; i++) {
        var elem = document.getElementById(ids[i]),
            volume = ids[i].split('-')[1];
        elem.setAttribute('data-volume', volume / 100)
        elem.onclick = function(e) {
          audio.setVolume(this.getAttribute('data-volume'));
          e.preventDefault();
          return false;
        }
      }
    
    });

    playerHTML5();

  } else {
    playerFlash();
  }
    
}

function playerHTML5(){
  document.write('<div id="player"><audio  preload="none" src="http://67.212.179.138:7082/;stream.nsv" type="audio/mpeg" ></audio></div>');

  // var repro = document.getElementById("player").childNodes[1];
  // var nombre = document.createElement("div");
  // nombre.innerHTML = "hola";
  // repro.appendChild(nombre);
}

function playerFlash(){
  document.write('<div id="player"><embed quality="high" flashvars="type=mp3&amp;file=http://67.212.179.138:7082/;stream.nsv&amp;autostart=true&amp;backcolor=0x#FFFFFF&amp;frontcolor=0x1D0051&amp;lightcolor=0x1D0051&amp;screencolor=0x1D0051" type="application/x-shockwave-flash" height="36" src="http://globalhouse.es/player.swf" id="streambaby" style="" width="100%" name="streambaby">');
}