<form action="?page=contact" method="POST" class="contact-form-cute p-4 rounded shadow-sm bg-white">
  <h2 class="mb-4">Contactez-nous</h2>

  <!-- Nom -->
  <div class="mb-3">
    <label for="nom" class="form-label">Nom <span class="required-mark">*</span></label>
    <input type="text" class="form-control" id="nom" name="nom" required>
  </div>

  <!-- Prénom -->
  <div class="mb-3">
    <label for="prenom" class="form-label">Prénom <span class="required-mark">*</span></label>
    <input type="text" class="form-control" id="prenom" name="prenom" required>
  </div>

  <!-- Email -->
  <div class="mb-3">
    <label for="email" class="form-label">Adresse e-mail <span class="required-mark">*</span></label>
    <input type="email" class="form-control" id="email" name="email" required>
  </div>

  <!-- À qui s'adresser -->
  <fieldset class="mb-3">
    <legend class="form-label">À qui souhaitez-vous adresser votre message ? <span class="required-mark">*</span></legend>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="destinataire" id="artisan" value="artisan" required>
      <label class="form-check-label" for="artisan">La créatrice des produits</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="destinataire" id="site" value="site">
      <label class="form-check-label" for="site">L'hébergeur du site</label>
    </div>
  </fieldset>

  <!-- Motif -->
  <fieldset class="mb-3">
    <legend class="form-label">Motif de votre message <span class="required-mark">*</span></legend>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="motif" id="paiement" value="paiement" required>
      <label class="form-check-label" for="paiement">Problème de paiement</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="motif" id="remboursement" value="remboursement">
      <label class="form-check-label" for="remboursement">Demande de remboursement</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="motif" id="livraison" value="livraison">
      <label class="form-check-label" for="livraison">Problème de livraison</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="radio" name="motif" id="autre" value="autre">
      <label class="form-check-label" for="autre">Autre</label>
    </div>
  </fieldset>

  <!-- Message -->
  <div class="mb-3">
    <label for="message" class="form-label">Merci de décrire précisément votre demande <span class="required-mark">*</span></label>
    <textarea class="form-control" id="message" name="message" rows="5" required></textarea>
  </div>

  <!-- Bouton -->
  <button type="submit" class="btn btn-cart-cute mt-3">
    Envoyer le message
  </button>
</form>
