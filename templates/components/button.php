<?php
$classDefault = 'button';

if($class):
   $class = $classDefault . ' ' . $class;
else:
   $class = $classDefault;
endif;

$url = $url ?? '#';
$text = $text ?? '';
?>
<a class="<?= $class ?>" href="<?= $url ?>"><?= $text ?></a>
