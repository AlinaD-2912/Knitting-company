<?php
$page = $_GET['page'] ?? 'home'; // default to home

include 'includes/header.php';

switch ($page) {
  case 'catalogue':
    include 'pages/catalogue.php';
    break;
  case 'product':
    include 'pages/product.php';
    break;
  case 'contact':
    include 'pages/contact.php';
    break;
  case 'about':
    include 'pages/about.php';
    break;
  default:
    include 'pages/home.php';
    break;
}

include 'includes/footer.php';
?>
