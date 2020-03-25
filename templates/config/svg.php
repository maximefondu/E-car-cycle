<?php

function get_svg($name, $className = false, $alt = false) {
   $path = "./public/svg/non-optimized/$name.svg";

   $img  = "<img ";
   $img .= add_class($className);
   $img .= "src='$path'";
   $img .= get_alt_img($alt);
   $img .= ">";

   return $img;
}


function print_svg($name, $className = false) {
   $svg = file_get_contents("./public/svg/optimized/$name.svg");

   if($svg):
      $svg = resetPositionViewbox($svg);
   endif;

   if($className):
      $svg = str_replace('<svg', "<svg class='$className'", $svg);
   endif;

   return $svg;
}


function get_path_svg($name) {
   $path = "./public/svg/optimized/$name.svg";
   return $path;
}


function resetPositionViewbox($svg){
   $startViewbox = strpos($svg, 'viewBox') + 9;
   $space = 0;
   $c = $startViewbox;

   while ($space !== 2) {
      if($svg[$c] === ' '):
         $space++;
      endif;

      $endViewbox = $c;
      $c++;
   }

   $svg = substr_replace($svg, '0 0', $startViewbox, $endViewbox - $startViewbox);

   return $svg;
}
?>
