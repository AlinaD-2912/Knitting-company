<!-- header.php -->
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet" />
    <title><?= $page_title ?? 'Titre par défaut' ?></title>
    <meta name="description" content="<?= $page_meta ?? 'Description par défaut' ?>">
    <link rel="stylesheet" href="style.css">

</head>

<body>
    <header>
        <!-- Google Fonts for a playful look -->
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap" rel="stylesheet">


<nav class="navbar navbar-expand-lg navbar-dark navbar-cute">
  <a class="navbar-brand" href="#">KnitToys</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item"><a class="nav-link" href="?page=catalogue">Catalogue</a></li>
      <li class="nav-item"><a class="nav-link" href="?page=contact">Contact</a></li>
      <li class="nav-item"><a class="nav-link" href="?page=panier">Panier</a></li>
    </ul>
    <form class="form-inline">
      <input class="form-control mr-sm-2" type="search" placeholder="Search">
      <button class="btn btn-outline-light" type="submit">Search</button>
    </form>
  </div>
</nav>



    </header>
    <main>