function loadProductsForHome() {
  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      const mainContainer = document.getElementById('containerHome');

      // Create product grid container
      const productGrid = document.createElement('div');
      productGrid.id = 'home-products';
      productGrid.className = 'd-flex flex-wrap justify-content-center gap-3';

      products.forEach(product => {
        // Card container
        const card = document.createElement('div');
        card.className = 'card product-cute';
        card.style.width = '18rem';

        // Image
        const img = document.createElement('img');
        img.src = product.image;
        img.className = 'card-img-top';
        img.alt = product.nom;
        card.appendChild(img);

        // Body
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = product.nom;

        const desc = document.createElement('p');
        desc.className = 'card-text';
        desc.textContent = product.description;

        // Button
        const button = document.createElement('button');
        button.className = 'btn btn-cart-cute';
        button.innerHTML = '<i class="bi bi-cart-plus"></i> Ajouter au panier';
        button.setAttribute('data-id', product.id);

        button.addEventListener('click', () => {
          const productId = button.getAttribute('data-id');
          addToCart(parseInt(productId));
        });

        // Assemble card
        cardBody.appendChild(title);
        cardBody.appendChild(desc);
        cardBody.appendChild(button);
        card.appendChild(cardBody);
        productGrid.appendChild(card);
      });

      // Append grid to main wrapper
      mainContainer.appendChild(productGrid);
    })
    .catch(error => {
      console.error("Erreur lors du chargement des produits :", error);
    });
}

loadProductsForHome()


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
