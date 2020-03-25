<?php

function get_img($name, $className = false, $alt = false) {
   $extension = substr($name, -3);
   $name = substr($name, 0, -4);
   $path   = "./public/images/$name.$extension";
   $path2x = "./public/images/$name@2x.$extension";

   $img    = "<img ";
   $img   .= add_class($className);
   $img   .= "src=$path
   srcset='$path 1x, $path2x 2x'";
   $img   .= get_alt_img($alt);
   $img   .= ">";

   return $img;
}


function get_path_img($name) {
   $path = "./public/images/$name";
   return $path;
}




//FOLDER IMG
$pathFolder = './src/images/';
$sizeMax = 2000;
$ratioRetina = 2;

$folder = opendir($pathFolder);
while ($file = readdir($folder)):
   $fileOptions      = pathinfo($file);
   $fullName         = $fileOptions['basename'];
   $name             = $fileOptions['filename'];
   $extension        = $fileOptions['extension'];
   $pathImage        = $pathFolder . $fullName;
   $pathImageRetina  = $pathFolder . $name . "@2x.$extension";

   if(!empty($extension) && !empty($name)):
      renameFile($fullName, $pathFolder, $pathImage);
      //resizeImage($extension, $pathImage, $sizeMax, $pathImageRetina, $name);
      createRetina($pathImageRetina, $name, $extension, $pathImage, $ratioRetina);
   endif;

endwhile;



function renameFile($name, $pathFolder, $pathImage){
   $newName = str_replace(' ', '_', $name);
   $newName = strtolower($newName);
   $pathNewImage = $pathFolder . $newName;
   rename($pathImage, $pathNewImage);
}


function resizeImage($extension, $pathImage, $sizeMax, $pathImageRetina, $name){

   $is_retina = checkRetina($pathImageRetina, $name);
   if(!$is_retina):
      list($width, $height) = getimagesize($pathImage);

      if($width >= $height):
         $newwidth = $sizeMax;
         $newheight = $height/$width * $newwidth;
      else:
         $newheight = $sizeMax;
         $newwidth = $width/$height * $newheight;
      endif;

      if($width > $sizeMax || $height > $sizeMax):
            $image  = imagecreatetruecolor($newwidth, $newheight);
            imagecopyresized($image, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);

            if($extension === 'png'):
               $source = imagecreatefrompng($pathImage);
               imagepng($image, $pathImage);
            else:
               $source = imagecreatefromjpeg($pathImage);
               imagejpeg($image, $pathImage);
            endif;
      endif;
   endif;
}

function checkRetina($pathImageRetina, $fileName){
   $fileHaveCopyRetina  = file_exists($pathImageRetina);
   $fileIsRetina        = substr($fileName,  -3);

   if($fileHaveCopyRetina === false && $fileIsRetina !== "@2x"):
      return false;
   else:
      return true;
   endif;
}

function createRetina($pathImageRetina, $name, $extension, $pathImage, $ratioRetina){
   $is_retina = checkRetina($pathImageRetina, $name);
   if(!$is_retina):

      list($width, $height) = getimagesize($pathImage);
      $newwidth = $width * $ratioRetina;
      $newheight = $height * $ratioRetina;
      $image = imagecreatetruecolor($newwidth, $newheight);

      if($extension === 'png'):
         $source = imagecreatefrompng($pathImage);
         imagealphablending($image, false);
         imagesavealpha($image, true);
         $transparent = imagecolorallocatealpha($image, 255, 255, 255, 127);
         imagefilledrectangle($image, 0, 0, $newwidth, $newheight, $transparent);
         imagecopyresized($image, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
         imagepng($image, $pathImageRetina);
      else:
         $source = imagecreatefromjpeg($pathImage);
         imagecopyresized($image, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
         imagejpeg($image, $pathImageRetina);
      endif;

   endif;
}