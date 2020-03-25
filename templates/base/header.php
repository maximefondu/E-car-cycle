<?php
require('./templates/config/config.php');

$title_website = 'Cyclee';
$description   = 'Description du site';

$url_website   = 'url';
$banner_url    = './public/images/banner.jpg';
?>

<!DOCTYPE html>
<html lang="fr">
<head>
   <title><?= $title_website ?></title>
   <meta name="description" content="<?= $description ?>"/>
   <?= import('favicon') ?>
   <!-- Meta Partage -->
   <meta name="title" content="<?= $title_website ?>"/>
   <meta property="og:title" content="<?= $title_website ?>"/>
   <meta property="og:description" content="<?= $description ?>"/>
   <meta property="og:url" content="<?= $url_website ?>"/>
   <meta property="og:image" content="<?= $banner_url ?>"/>
   <meta property="og:type" content="website"/>
   <meta name="twitter:title" content="<?= $title_website ?>"/>
   <meta name="twitter:description" content="<?= $description ?>"/>
   <meta name="twitter:url" content="<?= $url_website ?>"/>
   <meta name="twitter:image" content="<?= $banner_url ?>"/>
   <meta charset="utf-8">
   <link rel="stylesheet" href="./public/css/style.css">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
   <header></header>
   <main>