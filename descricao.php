<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php
    require_once("./public/templete/head.php");
    ?>
    <title>Decrição</title>
    <link rel="stylesheet" href="./public/css/descricao.css">
    <script type="module" src="./public/js/descricao.js" defer></script>
</head>

<body>

    <?php
    require_once("./public/templete/menu.php");
    ?>

    <main>
        <section class="container_descricao">

            <div class="containe_img">
                <img src="./public/img/banner_pagina.jpg" class="img" alt="">
            </div>

            <div class="container_texto">
                <h3 class="titulo"></h3>
                <div class="container_genero">

                </div>

                <p class="popularidade"></p>
                <p class="data"></p>

                <p class="descicao"></p>


            </div>
        </section>
    </main>


    <footer>
        <?php
        require_once("./public/templete/footer.php");
        ?>
    </footer>
    
</body>

</html>