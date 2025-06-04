function loadHomeProducts() {
  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      const mainContainer = document.getElementById('containerHome');

      // Create product grid container
      const productGrid = document.createElement('div');
      productGrid.id = 'home-products';
      productGrid.className = 'd-flex flex-wrap justify-content-center gap-3';

      products.forEach((product, index) => {
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

        // Button ajouter au panier
        const button = document.createElement('button');
        button.className = 'btn btn-cart-cute';
        button.innerHTML = '<i class="bi bi-cart-plus"></i> Ajouter au panier';
        button.setAttribute('data-id', product.id);

        button.addEventListener('click', () => {
          const productId = button.getAttribute('data-id');
          addToCart(parseInt(productId));
        });

        // Button See the product
        const viewBtn = document.createElement('a');
        viewBtn.href = `?page=product&id=${index}`;
        viewBtn.className = 'btn btn-view-cute ms-2';
        viewBtn.textContent = 'Voir le produit';



        // Assemble card
        cardBody.appendChild(title);
        cardBody.appendChild(desc);
        cardBody.appendChild(button);
        cardBody.appendChild(viewBtn);
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

document.addEventListener('DOMContentLoaded', () => {
  const containerHome = document.getElementById('containerHome');
  if (containerHome) {
    loadHomeProducts(); // ✅ no parameter needed
  }
});





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


function loadCatalogueProducts() {
  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      const mainContainer = document.getElementById('catalogueConteiner');

      products.forEach((product, index) => {

        const premierDiv = document.createElement('div')
        premierDiv.className = 'col-md-6 col-lg-4';

        const dousiemeDiv = document.createElement('div')
        dousiemeDiv.className = 'card product-cute shadow-sm h-100 text-center border-0'

        const troisiemeDiv = document.createElement('div')
        troisiemeDiv.className = 'card-body d-flex flex-column justify-content-between'

        const divBoutton = document.createElement('div')
        divBoutton.className = 'd-flex flex-column gap-2'

        // Image
        const img = document.createElement('img');
        img.src = product.image;
        img.className = 'card-img-top';
        img.alt = product.nom;
        dousiemeDiv.appendChild(img);

        const title = document.createElement('h4');
        title.className = 'card-title fw-semibold';
        title.textContent = product.nom;

        const description = document.createElement('p');
        description.className = 'card-text text-muted small';
        description.textContent = product.description;

        const qtt = document.createElement('p');
        qtt.className = 'fw-bold mb-1';
        qtt.innerHTML = `Quantité disponible : <span class="text-success">${product.quantite}</span>`

        const prix = document.createElement('p');
        prix.className = 'fw-bold text-primary mb-3';
        prix.innerHTML = `Prix : ${product.prix}`

        const button = document.createElement('button');
        button.className = 'btn btn-cart-cute';
        button.innerHTML = '<i class="bi bi-cart-plus"></i> Ajouter au panier';
        button.setAttribute('data-id', product.id);

        button.addEventListener('click', () => {
          const productId = button.getAttribute('data-id');
          addToCart(parseInt(productId));
        });

        // Button See the product
        const viewBtn = document.createElement('a');
        viewBtn.href = `?page=product&id=${index}`;
        viewBtn.className = 'btn btn-view-cute ms-2';
        viewBtn.textContent = 'Voir le produit';



        // Assemble card
        premierDiv.appendChild(dousiemeDiv);
        dousiemeDiv.appendChild(img);
        dousiemeDiv.appendChild(troisiemeDiv);
        troisiemeDiv.appendChild(title);
        troisiemeDiv.appendChild(description);
        troisiemeDiv.appendChild(qtt);
        troisiemeDiv.appendChild(prix);
        troisiemeDiv.appendChild(divBoutton);
        divBoutton.appendChild(button);
        divBoutton.appendChild(viewBtn);

        mainContainer.appendChild(premierDiv);

      });

    })
    .catch(error => {
      console.error("Erreur lors du chargement des produits :", error);
    
    });
    
}

document.addEventListener('DOMContentLoaded', () => {
  const catalogueContainer = document.getElementById('catalogueConteiner');
  if (catalogueContainer) {
    loadCatalogueProducts();
  }
});


            // FUNCTION TO SAVE PANIER

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
  let cart = getCart();

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.qtt += 1;
  } else {
    cart.push({ id: productId, qtt: 1 });
  }

  saveCart(cart);
  updateCartCount(); // Update UI
}

function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qtt, 0);
  document.getElementById('cart-count').textContent = totalItems;
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});

 const cart = getCart(); // from earlier

  fetch('products.json')
    .then(res => res.json())
    .then(products => {
      const content = document.getElementById('cart-content');
      cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        const div = document.createElement('div');
        div.innerHTML = `${product.nom} x ${item.qtt}`;
        content.appendChild(div);
      });
    });


    

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartPage() {
  const cart = getCart();
  const container = document.getElementById('cart-list');
  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = '<p class="text-muted text-center">Votre panier est vide 🧺</p>';
    document.getElementById('total-price').textContent = 'Total : 0 €';
    return;
  }

  fetch('products.json')
    .then(res => res.json())
    .then(products => {
      let total = 0;

      cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return;

        const productTotal = product.prix * item.qtt;
        total += productTotal;

        const card = document.createElement('div');
        card.className = 'd-flex align-items-start p-3 rounded-4 shadow-sm border cute-cart-item flex-wrap';

        card.innerHTML = `
          <img src="${product.image}" alt="${product.nom}" class="rounded me-3 mb-3 mb-md-0" style="width: 120px; height: auto; object-fit: cover;" />
          <div class="flex-grow-1">
            <h5 class="fw-semibold">
                <a href="?page=product&id=${product.id}" class="text-cute text-decoration-none">${product.nom}</a>
            </h5>
            <div class="d-flex align-items-center gap-2 my-2">
              <button class="btn btn-sm btn-outline-secondary rounded-circle px-2 py-1 minus-btn" data-id="${product.id}">-</button>
              <span class="badge bg-light text-dark px-3 py-2 quantity-badge" data-id="${product.id}">${item.qtt}</span>
              <button class="btn btn-sm btn-outline-secondary rounded-circle px-2 py-1 plus-btn" data-id="${product.id}">+</button>
              <button class="btn btn-sm btn-outline-danger ms-3 delete-btn" data-id="${product.id}">
                <i class="bi bi-trash"></i>
              </button>
            </div>
            <p class="mb-0 text-muted small">Prix unitaire : ${product.prix.toFixed(2)} €</p>
            <p class="mb-0 fw-bold text-primary">Total : ${productTotal.toFixed(2)} €</p>
          </div>
        `;

        container.appendChild(card);
      });

      document.getElementById('total-price').textContent = `Total : ${total.toFixed(2)} €`;

      // Interactions
      document.querySelectorAll('.plus-btn').forEach(btn => {
        btn.addEventListener('click', () => changeQuantity(btn.dataset.id, 1));
      });
      document.querySelectorAll('.minus-btn').forEach(btn => {
        btn.addEventListener('click', () => changeQuantity(btn.dataset.id, -1));
      });
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => removeItem(btn.dataset.id));
      });
    });
}

function changeQuantity(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id == id);
  if (item) {
    item.qtt += delta;
    if (item.qtt <= 0) {
      const index = cart.indexOf(item);
      cart.splice(index, 1);
    }
    saveCart(cart);
    updateCartPage();

    // Bounce animation
    setTimeout(() => {
      const badge = document.querySelector(`.quantity-badge[data-id="${id}"]`);
      if (badge) {
        badge.classList.remove('bounce'); // reset animation if already there
        void badge.offsetWidth; // trick to restart animation
        badge.classList.add('bounce');
      }
    }, 50);
  }
}


function removeItem(id) {
  let cart = getCart();
  cart = cart.filter(i => i.id != id);
  saveCart(cart);
  updateCartPage();
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cart-list')) {
    updateCartPage();
  }
});

