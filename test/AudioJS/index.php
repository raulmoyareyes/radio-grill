
<?php 

function imagenesHTML($archivo, $norepetidos = true) {
    $contenido = file($archivo);
    $contenido = array_map("trim", $contenido);
    $contenido = implode(" ", $contenido);
 
    if ( preg_match_all('/<img([^<>]+)>/i', $contenido, $match) ) {
            foreach($match[1] as $atributos) {
                if ( preg_match('/src="([^"]+)"/i', $atributos, $matchpaths) ) {
                    $pathimgs[] = $matchpaths[1];
                } elseif ( preg_match('/src=([^ ]+)/i', $atributos, $matchpaths) ) {
                    $pathimgs[] = $matchpaths[1];        
                }
                unset($matchpaths);
            }
    }
    if ( !empty($pathimgs) ) {
        if ($norepetidos) {
            return array_unique($pathimgs);
        } else {
            return $pathimgs;
        }
    } else {
        return false;
    }
}

function IMGG() {
  $paths = imagenesHTML("http://www.globalhouse.es/ProgramaScript.php");

  $img = str_replace("'", "", $paths[0]);

  $img = "http://www.globalhouse.es".$img;
  
  return $img;
}

function mostrarNombre(){
  return "Nombre del programa";
}

?>



<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>audio.js</title>

    <script src="./audiojs/audio.min.js"></script>
    <script src="./includes/functions.js"></script>
    <script>

    function refresh() {
      document.images['imgg'].src="<?php echo IMGG(); ?>";
      var div = document.getElementById("nombre");
      while(div.hasChildNodes())
      {
          div.removeChild(div.lastChild);
      }
      div.innerHTML = "<?php echo mostrarNombre(); ?>";
    }

    init();
    </script>

    <link rel="stylesheet" href="./includes/index.css" media="screen">

  </head>
  <body onLoad="setInterval('refresh()',1000);">

    <div id="volumen">volumen</div>
    
    <div id="nombre">Sin titulo...</div>

    <div id="botones">

    </div>

    <img id="imgg" alt="Cargando imangen..."/>
    <img id="logo" src="http://www.globalhouse.es/wp-content/themes/fanclub/images/pink/bg-and-bullets/logo-bg.png"/>
  </body>
</html>

