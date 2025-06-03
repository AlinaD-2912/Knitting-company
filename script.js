function addProductsOnPageHome(){
    const containerHome = document.getElementById("containerHome")

    if (!containerHome) return

}
let cartCount = 0;

function addToCart() {
  cartCount++;
  document.getElementById('cart-count').textContent = cartCount;
}

// Optional: attach to all buttons with class 'btn-cart-cute'
document.querySelectorAll('.btn-cart-cute').forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault(); // prevent page reload if needed
    addToCart();
  });
});
