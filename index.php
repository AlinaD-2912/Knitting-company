<?php
$page = isset($_GET['page']) ? $_GET['page'] : 'home'; // default page

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
  case 'home':
    include 'pages/home.php';
    break;
  default:
    // tels the browser the page not found
    http_response_code(404);
    include 'pages/404.php';
    break;
}

include 'includes/footer.php';
?>
