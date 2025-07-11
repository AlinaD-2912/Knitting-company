<?php
$page = isset($_GET['page']) ? $_GET['page'] : 'home'; // default page

// Handle cart operations before loading any HTML
if ($page === 'cart_handler') {
    session_start();
    header('Content-Type: application/json');
    
    // Initialize cart in session if not exists
    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = [];
    }
    
    $action = $_POST['action'] ?? $_GET['action'] ?? '';
    
    switch ($action) {
        case 'get':
            echo json_encode(['success' => true, 'cart' => $_SESSION['cart']]);
            break;
            
        case 'add':
            $productId = intval($_POST['productId'] ?? 0);
            if ($productId > 0) {
                $found = false;
                foreach ($_SESSION['cart'] as &$item) {
                    if ($item['id'] == $productId) {
                        $item['qtt']++;
                        $found = true;
                        break;
                    }
                }
                if (!$found) {
                    $_SESSION['cart'][] = ['id' => $productId, 'qtt' => 1];
                }
                echo json_encode(['success' => true, 'cart' => $_SESSION['cart']]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid product ID']);
            }
            break;
            
        case 'update':
            $productId = intval($_POST['productId'] ?? 0);
            $quantity = intval($_POST['quantity'] ?? 0);
            
            if ($productId > 0) {
                foreach ($_SESSION['cart'] as $key => &$item) {
                    if ($item['id'] == $productId) {
                        if ($quantity <= 0) {
                            unset($_SESSION['cart'][$key]);
                            $_SESSION['cart'] = array_values($_SESSION['cart']);
                        } else {
                            $item['qtt'] = $quantity;
                        }
                        break;
                    }
                }
                echo json_encode(['success' => true, 'cart' => $_SESSION['cart']]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid product ID']);
            }
            break;
            
        case 'remove':
            $productId = intval($_POST['productId'] ?? 0);
            if ($productId > 0) {
                foreach ($_SESSION['cart'] as $key => $item) {
                    if ($item['id'] == $productId) {
                        unset($_SESSION['cart'][$key]);
                        $_SESSION['cart'] = array_values($_SESSION['cart']);
                        break;
                    }
                }
                echo json_encode(['success' => true, 'cart' => $_SESSION['cart']]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid product ID']);
            }
            break;
            
        case 'clear':
            $_SESSION['cart'] = [];
            echo json_encode(['success' => true, 'cart' => []]);
            break;
            
        case 'count':
            $totalItems = 0;
            foreach ($_SESSION['cart'] as $item) {
                $totalItems += $item['qtt'];
            }
            echo json_encode(['success' => true, 'count' => $totalItems]);
            break;
            
        default:
            echo json_encode(['success' => false, 'message' => 'Invalid action']);
            break;
    }
    exit; // Important: Stop execution after handling cart operations
}

// Continue with regular page routing
include 'header.php';

switch ($page) {
  case 'catalogue':
    include 'pages/catalogue.php';
    break;
  case 'product':
    include 'pages/product.php';
    break;
  case 'panier':
    include 'pages/panier.php';
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
    http_response_code(404);
    include 'pages/404.php';
    break;
}

include 'footer.php';
?>