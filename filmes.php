<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php
    require_once("./public/templete/head.php");
    ?>
    <script type="module" src="./public/js/filmes.js" defer></script>
    <link rel="stylesheet" href="./public/css/style_index.css">
    <title>Document</title>
</head>

<body>

    <header>
        <!--menu-->
        <?php
        require_once("./public/templete/menu.php");
        ?>

        <h3 style="text-align: center;">Página em desenvolvimento</h3>
    </header>


    <main class="container_lista">
        <div id="lista">
        </div>
    </main>

    
    <footer>
        <?php
        require_once("./public/templete/footer.php");
        ?>
    </footer>

</body>

</html>