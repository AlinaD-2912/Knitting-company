<div class="container py-5">
    <div class="row">
        <div class="col-lg-8">
            <h2 class="text-center text-cute mb-4">Votre Panier</h2>
            <div id="cart-list" class="d-flex flex-column gap-3">
                <!-- Cart items will be loaded here -->
                <div class="text-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Chargement...</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-lg-4">
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">Récapitulatif</h5>
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-3">
                        <span>Sous-total:</span>
                        <span id="subtotal-price">0 €</span>
                    </div>
                    <div class="d-flex justify-content-between mb-3">
                        <span>Livraison:</span>
                        <span class="text-muted">Gratuite</span>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-between mb-4">
                        <strong>Total:</strong>
                        <strong id="total-price" class="text-primary">0 €</strong>
                    </div>
                    
                    <button class="btn btn-success w-100 mb-2" id="checkout-btn">
                        <i class="bi bi-credit-card"></i> Procéder au paiement
                    </button>
                    
                    <button class="btn btn-outline-secondary w-100" onclick="window.location.href='?page=catalogue'">
                        <i class="bi bi-arrow-left"></i> Continuer mes achats
                    </button>
                    
                    <button class="btn btn-outline-danger w-100 mt-2" id="clear-cart-btn">
                        <i class="bi bi-trash"></i> Vider le panier
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.text-cute {
    color: #ff6b9d;
}

.btn-cart-cute {
    background: linear-gradient(45deg, #ff6b9d, #ffa8cc);
    color: white;
    border: none;
    border-radius: 25px;
    padding: 8px 16px;
    transition: all 0.3s ease;
}

.btn-cart-cute:hover {
    background: linear-gradient(45deg, #ff5588, #ff9bb8);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(255, 107, 157, 0.3);
}

.card {
    border: none;
    border-radius: 15px;
}

.card-header {
    border-radius: 15px 15px 0 0 !important;
}

.quantity-input {
    max-width: 80px;
}

.btn-outline-secondary, .btn-outline-danger {
    border-radius: 8px;
}

.btn-success {
    background: linear-gradient(45deg, #28a745, #20c997);
    border: none;
    border-radius: 8px;
}

.btn-success:hover {
    background: linear-gradient(45deg, #218838, #1ea976);
}

.spinner-border {
    width: 3rem;
    height: 3rem;
}
</style>

<script>
// Add clear cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const clearCartBtn = document.getElementById('clear-cart-btn');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('Êtes-vous sûr de vouloir vider complètement votre panier ?')) {
                clearCart(function(response) {
                    if (response.success) {
                        updateCartPage();
                        updateCartCount();
                        showMessage('Panier vidé avec succès', 'success');
                    }
                });
            }
        });
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            // Add your checkout logic here
            alert('Fonctionnalité de paiement à implémenter');
        });
    }
});
</script>