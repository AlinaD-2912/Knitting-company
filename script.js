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
                viewBtn.href = `?page=product&id=${product.id}`; // NOT index, use product.id from your JSON
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
                prix.innerHTML = `Prix : ${product.prix} €`; // Added € symbol

                const button = document.createElement('button');
                button.className = 'btn btn-cart-cute';
                button.innerHTML = '<i class="bi bi-cart-plus"></i> Ajouter au panier';
                button.setAttribute('data-id', product.id);

                // Button See the product
                const viewBtn = document.createElement('a');
                viewBtn.href = `?page=product&id=${product.id}`;
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






// AJAX Cart Management Functions
function makeAjaxRequest(url, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    callback(response);
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                    callback({ success: false, message: 'Invalid response' });
                }
            } else {
                callback({ success: false, message: 'Server error' });
            }
        }
    };

    // Convert data object to URL-encoded string
    const params = Object.keys(data).map(key =>
        encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
    ).join('&');

    xhr.send(params);
}

function getCart(callback) {
    makeAjaxRequest('?page=cart_handler', { action: 'get' }, callback);
}

function addToCart(productId, callback) {
    makeAjaxRequest('?page=cart_handler', {
        action: 'add',
        productId: productId
    }, callback);
}

function updateCartItem(productId, quantity, callback) {
    makeAjaxRequest('?page=cart_handler', {
        action: 'update',
        productId: productId,
        quantity: quantity
    }, callback);
}

function removeFromCart(productId, callback) {
    makeAjaxRequest('?page=cart_handler', {
        action: 'remove',
        productId: productId
    }, callback);
}

function clearCart(callback) {
    makeAjaxRequest('?page=cart_handler', { action: 'clear' }, callback);
}

function getCartCount(callback) {
    makeAjaxRequest('?page=cart_handler', { action: 'count' }, callback);
}

// Update cart count in header
function updateCartCount() {
    getCartCount(function (response) {
        if (response.success) {
            const cartCountElement = document.getElementById('cart-count');
            if (cartCountElement) {
                cartCountElement.textContent = response.count;
            }
        }
    });
}

// Add product to cart with AJAX
function handleAddToCart(productId, callback) {
    addToCart(productId, function (response) {
        if (response.success) {
            updateCartCount();
            // Show success message (optional)
            showMessage('Produit ajouté au panier !', 'success');
        } else {
            showMessage('Erreur: ' + response.message, 'error');
        }

        // Call the callback if provided
        if (callback && typeof callback === 'function') {
            callback(response);
        }
    });
}

// Optional: Show messages to user
function showMessage(message, type) {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className = `alert alert-${type === 'success' ? 'success' : 'danger'} position-fixed`;
    toast.style.top = '20px';
    toast.style.right = '20px';
    toast.style.zIndex = '9999';
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Event delegation for dynamically created buttons
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-cart-cute') || e.target.closest('.btn-cart-cute')) {
        e.preventDefault();
        const button = e.target.classList.contains('btn-cart-cute') ? e.target : e.target.closest('.btn-cart-cute');
        const productId = parseInt(button.getAttribute('data-id'));

        if (productId) {
            handleAddToCart(productId);
        }
    }
});

// Update cart page display
function updateCartPage() {
    const container = document.getElementById('cart-list');
    if (!container) return; // Not on cart page

    container.innerHTML = '<div class="text-center"><div class="spinner-border" role="status"></div></div>';

    getCart(function (cartResponse) {
        if (!cartResponse.success) {
            container.innerHTML = '<p class="text-danger text-center">Erreur lors du chargement du panier</p>';
            return;
        }

        const cart = cartResponse.cart;
        container.innerHTML = '';

        if (cart.length === 0) {
            container.innerHTML = '<p class="text-muted text-center">Votre panier est vide 🧺</p>';
            document.getElementById('total-price').textContent = 'Total : 0 €';
            return;
        }

        // Fetch products data
        fetch('products.json')
            .then(res => res.json())
            .then(products => {
                let total = 0;

                cart.forEach(item => {
                    const product = products.find(p => p.id === item.id);
                    if (!product) return;

                    const itemTotal = product.prix * item.qtt;
                    total += itemTotal;

                    const cartItem = document.createElement('div');
                    cartItem.className = 'card mb-3';
                    cartItem.innerHTML = `
                        <div class="card-body">
                            <div class="row align-items-center">
                                <div class="col-md-2">
                                    <img src="${product.image}" alt="${product.nom}" class="img-fluid rounded">
                                </div>
                                <div class="col-md-4">
                                    <h5 class="card-title">${product.nom}</h5>
                                    <p class="text-muted">${product.prix} €</p>
                                </div>
                                <div class="col-md-3">
                                    <div class="input-group">
                                        <button class="btn btn-outline-secondary btn-decrease" data-id="${product.id}" type="button">-</button>
                                        <input type="number" class="form-control text-center quantity-input" value="${item.qtt}" min="1" data-id="${product.id}">
                                        <button class="btn btn-outline-secondary btn-increase" data-id="${product.id}" type="button">+</button>
                                    </div>
                                </div>
                                <div class="col-md-2">
                                    <strong>${itemTotal.toFixed(2)} €</strong>
                                </div>
                                <div class="col-md-1">
                                    <button class="btn btn-outline-danger btn-remove" data-id="${product.id}">×</button>
                                </div>
                            </div>
                        </div>
                    `;
                    container.appendChild(cartItem);
                });

                document.getElementById('total-price').textContent = `Total : ${total.toFixed(2)} €`;

                // Add event listeners for cart item controls
                addCartItemEventListeners();
            })
            .catch(error => {
                console.error('Error loading products:', error);
                container.innerHTML = '<p class="text-danger text-center">Erreur lors du chargement des produits</p>';
            });
    });
}

// Add event listeners for cart item controls
function addCartItemEventListeners() {
    // Quantity increase buttons
    document.querySelectorAll('.btn-increase').forEach(btn => {
        btn.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
            const newQuantity = parseInt(input.value) + 1;

            updateCartItem(productId, newQuantity, function (response) {
                if (response.success) {
                    updateCartPage();
                    updateCartCount();
                }
            });
        });
    });

    // Quantity decrease buttons
    document.querySelectorAll('.btn-decrease').forEach(btn => {
        btn.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
            const newQuantity = Math.max(1, parseInt(input.value) - 1);

            updateCartItem(productId, newQuantity, function (response) {
                if (response.success) {
                    updateCartPage();
                    updateCartCount();
                }
            });
        });
    });

    // Manual quantity input
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            const newQuantity = Math.max(1, parseInt(this.value));

            updateCartItem(productId, newQuantity, function (response) {
                if (response.success) {
                    updateCartPage();
                    updateCartCount();
                }
            });
        });
    });

    // Remove item buttons
    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));

            if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
                removeFromCart(productId, function (response) {
                    if (response.success) {
                        updateCartPage();
                        updateCartCount();
                    }
                });
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    updateCartCount();

    // If we're on the cart page, load cart contents
    if (document.getElementById('cart-list')) {
        updateCartPage();
    }
});





// PRODUCT LOADING PAGE
function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function displayProduct(product) {
  const container = document.getElementById('product-container');

  container.innerHTML = `
    <div class="col-md-6 text-center mb-4">
      <img src="${product.image}" alt="${product.nom}" class="img-fluid rounded shadow" style="max-height: 400px;" />
    </div>
    <div class="col-md-6">
      <h2 class="mb-3">${product.nom}</h2>
      <p><strong>Prix:</strong> ${product.prix} €</p>
      <p><strong>Description:</strong> ${product.description || "Pas de description."}</p>
      <p><strong>Catégorie:</strong> ${product.categorie}</p>
      <p><strong>Couleur:</strong> ${product.couleur}</p>
      <p><strong>Matériaux:</strong> ${product.materiaux.join(', ')}</p>
      <p><strong>Dimensions:</strong> ${product.largeur} cm × ${product.hauteur} cm</p>
      
      <a href="?page=panier" class="btn btn-success me-2">Aller au panier</a>
      <button class="btn btn-primary" onclick="addToCart(${product.id})">Ajouter au panier</button>
    </div>
  `;
}

async function initProductPage() {
  const id = getProductIdFromUrl();
  if (!id) return;

  try {
    const response = await fetch('products.json');
    const products = await response.json();
    const product = products.find(p => p.id == id);

    if (product) {
      displayProduct(product);
    } else {
      document.getElementById('product-container').innerHTML = "<p>Produit non trouvé.</p>";
    }
  } catch (error) {
    console.error("Erreur lors du chargement des produits :", error);
    document.getElementById('product-container').innerHTML = "<p>Erreur de chargement du produit.</p>";
  }
}

function addToCart(id) {
  fetch('?page=cart_handler', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `action=add&productId=${id}`
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("Produit ajouté au panier !");
    } else {
      alert("Erreur : " + data.message);
    }
  });
}

initProductPage();
