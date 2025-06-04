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
