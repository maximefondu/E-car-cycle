<?php
$json       = file_get_contents('./public/json/number-car.json');
$datas      = json_decode($json);
$numbers    =  $datas[0]->numbers;
$numbersArray = json_decode(json_encode($numbers), true);
$firstDate = '2015'; //array_key_first($numbersArray);
$lastDate = '2019'; //array_key_last($numbersArray);
?>

<div class='head-pourcent'>

    <h2 class='title title--medium grid__c-4-9 grid__r-2-4'>L’augmentation <span class='title__light'>des différents types de véhicule&nbsp;:</span></h2>
    
    <p class='head-pourcent__first-date'><?= $firstDate ?></p>

    <ul class='head-pourcent__content'>
        <?php foreach($datas as $data):
            $view         = $data->view;
            $numbers      = $data->numbers;
            $numbersArray = json_decode(json_encode($numbers), true);
            $firstNumber  = $numbersArray[$firstDate];
            $lastNumber   = $numbersArray[$lastDate];
            
            $pourcent     = round(($lastNumber - $firstNumber) / $firstNumber * 100);
            $pourcent > 0 ? $pourcent = '+' . $pourcent : $pourcent;
            $type         = $data->plural;
        ?>
            <?php if($view): ?>
                <li class='head-pourcent__el'>
                    <span class='head-pourcent__pourcent'><?= $pourcent ?>%</span>
                    <p class='head-pourcent__title'>de voitures <?= $type ?></p>
                </li>
            <?php endif; ?>
        
        <?php endforeach; ?>
    </ul>

    <p class='head-pourcent__last-date'><?= $lastDate ?></p>

    <canvas class='head-pourcent__canvas'></canvas>

</div>