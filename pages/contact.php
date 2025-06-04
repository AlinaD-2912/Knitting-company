<?php
$errors = [];
$nom = $prenom = $email = $message = $motif = $destinataire = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Nettoyage et récupération
  $nom = trim($_POST["nom"] ?? "");
  $prenom = trim($_POST["prenom"] ?? "");
  $email = trim($_POST["email"] ?? "");
  $message = trim($_POST["message"] ?? "");
  $motif = $_POST["motif"] ?? "";
  $destinataire = $_POST["destinataire"] ?? "";

  // Validation
  if (!$nom) {
    $errors["nom"] = "Veuillez entrer votre nom.";
  }

  if (!$prenom) {
    $errors["prenom"] = "Veuillez entrer votre prénom.";
  }

  if (!$email) {
    $errors["email"] = "Veuillez entrer votre email.";
  } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors["email"] = "Adresse email invalide.";
  }

  if (!$message) {
    $errors["message"] = "Veuillez préciser votre message.";
  }

  if (!$motif) {
    $errors["motif"] = "Veuillez choisir un motif.";
  }

  if (!$destinataire) {
    $errors["destinataire"] = "Veuillez choisir un destinataire.";
  }

  // Si tout est OK, on envoie l'email
  if (empty($errors)) {
    $to = 'votre@email.com';
    $subject = "Contact ($motif)";
    $body = "Nom: $nom $prenom\nEmail: $email\nDestinataire: $destinataire\nMotif: $motif\nMessage:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
      $success = "Message envoyé avec succès !";
      // Réinitialiser les champs
      $nom = $prenom = $email = $message = $motif = $destinataire = "";
    } else {
      $formError = "Erreur lors de l'envoi de l'email.";
    }
  }
}
?>



<main class="container my-5">
  <form action="?page=contact" method="POST" class="contact-form-cute p-4 rounded shadow-sm bg-white needs-validation" novalidate>
    <h2 class="mb-4">Contactez-nous</h2>
    <!-- Nom -->
    <div class="mb-3">
      <label for="nom" class="form-label">Nom</label>
      <input type="text" class="form-control <?= !empty($errors['nom']) ? 'is-invalid' : '' ?>" id="nom" name="nom" value="<?= htmlspecialchars($_POST['nom'] ?? '') ?>">
      <div class="invalid-feedback"><?= $errors['nom'] ?? '' ?></div>
    </div>

    <!-- Prénom -->
    <div class="mb-3">
      <label for="prenom" class="form-label">Prénom</label>
      <input type="text" class="form-control <?= !empty($errors['prenom']) ? 'is-invalid' : '' ?>" id="prenom" name="prenom" value="<?= htmlspecialchars($_POST['prenom'] ?? '') ?>">
      <div class="invalid-feedback"><?= $errors['prenom'] ?? '' ?></div>
    </div>

    <!-- Email -->
    <div class="mb-3">
      <label for="email" class="form-label">Adresse e-mail</label>
      <input type="email" class="form-control <?= !empty($errors['email']) ? 'is-invalid' : '' ?>" id="email" name="email" value="<?= htmlspecialchars($_POST['email'] ?? '') ?>">
      <div class="invalid-feedback"><?= $errors['email'] ?? '' ?></div>
    </div>

    <!-- Destinataire -->
    <fieldset class="mb-3">
      <legend class="form-label">À qui souhaitez-vous adresser votre message ?</legend>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="destinataire" id="artisan" value="artisan" <?= ($_POST['destinataire'] ?? '') === 'artisan' ? 'checked' : '' ?>>
        <label class="form-check-label" for="artisan">La créatrice des produits</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="destinataire" id="site" value="site" <?= ($_POST['destinataire'] ?? '') === 'site' ? 'checked' : '' ?>>
        <label class="form-check-label" for="site">L'hébergeur du site</label>
      </div>
      <?php if (!empty($errors['destinataire'])): ?>
        <div class="text-danger mt-1"><?= $errors['destinataire'] ?></div>
      <?php endif; ?>
    </fieldset>

    <!-- Motif -->
    <fieldset class="mb-3">
      <legend class="form-label">Motif de votre message</legend>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="motif" id="paiement" value="paiement" <?= ($_POST['motif'] ?? '') === 'paiement' ? 'checked' : '' ?>>
        <label class="form-check-label" for="paiement">Problème de paiement</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="motif" id="remboursement" value="remboursement" <?= ($_POST['motif'] ?? '') === 'remboursement' ? 'checked' : '' ?>>
        <label class="form-check-label" for="remboursement">Demande de remboursement</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="motif" id="livraison" value="livraison" <?= ($_POST['motif'] ?? '') === 'livraison' ? 'checked' : '' ?>>
        <label class="form-check-label" for="livraison">Problème de livraison</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="motif" id="autre" value="autre" <?= ($_POST['motif'] ?? '') === 'autre' ? 'checked' : '' ?>>
        <label class="form-check-label" for="autre">Autre</label>
      </div>
      <?php if (!empty($errors['motif'])): ?>
        <div class="text-danger mt-1"><?= $errors['motif'] ?></div>
      <?php endif; ?>
    </fieldset>

    <!-- Message -->
    <div class="mb-3">
      <label for="message" class="form-label">Merci de décrire précisément votre demande</label>
      <textarea class="form-control <?= !empty($errors['message']) ? 'is-invalid' : '' ?>" id="message" name="message" rows="5"><?= htmlspecialchars($_POST['message'] ?? '') ?></textarea>
      <div class="invalid-feedback"><?= $errors['message'] ?? '' ?></div>
    </div>

    <!-- Submit -->
    <button type="submit" class="btn btn-submit-cute mt-3">
      Envoyer le message
    </button>

  </form>
</main>