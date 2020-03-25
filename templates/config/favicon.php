<?php
$pathFolder = './src/favicon/';
$files = [];
$sizes = [
   16,
   32,
   144,
   150,
   180
];

$folder = opendir($pathFolder);
while ($file = readdir($folder)):
   $fileOptions   = pathinfo($file);
   $name          = $fileOptions["filename"];
   $extension     = $fileOptions["extension"];

   if($extension === "png"):
      array_push($files, $name);
   endif;
endwhile;

if(count($files) === 1):
   foreach($sizes as $size):
      createSizes($pathFolder . $files[0] . ".png", $pathFolder, $size);
   endforeach;
   
   unlink($pathFolder . $files[0] . ".png");
endif;

function createSizes($pathImage, $pathFolder, $size){
   list($width, $height) = getimagesize($pathImage);
   $image = imagecreatetruecolor($size, $size);

   $source = imagecreatefrompng($pathImage);
   imagealphablending($image, false);
   imagesavealpha($image, true);
   $transparent = imagecolorallocatealpha($image, 255, 255, 255, 127);
   imagefilledrectangle($image, 0, 0, $size, $size, $transparent);
   imagecopyresized($image, $source, 0, 0, 0, 0, $size, $size, $width, $height);

   $pathNewImage = $pathFolder . "favicon-" . $size . "x" . $size . ".png";

   imagepng($image, $pathNewImage);
}