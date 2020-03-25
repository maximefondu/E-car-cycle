<?php

//––––––––––––– TOOLS –––––––––––––

//IMPORT
function import($nameFile, $class = false, $data = []){
   extract( $data );
   $nameFolder = 'components';
   if($folder && $folder !== ''){
      $nameFolder = $folder;
   }
   include("./templates/$nameFolder/$nameFile.php");
}

//ALT IMAGE
function get_alt_img($alt){
   if($alt):
      $alt = "alt='$alt'";
      return $alt;
   endif;
}

//ADD CLASS
function add_class($className){
   if($className):
      $class = "class='$className'";
      return $class;
   endif;
}




//––––––––––––– IMPORT –––––––––––––

require('image.php');
require('svg.php');
?>
