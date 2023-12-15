import { apiKey } from './key.js'
let url = "https://api.themoviedb.org/3/movie"
let url_1 = url + "/top_rated?"
let url_2 = url + "/popular?"

//Api de filmes que deu certo

fetch(`${url_2}api_key=${apiKey}&language=pt-BR`)
    .then((resp) => resp.json())

    .catch((erro) => {
        console.log("Erro ao conectar com a api" + erro)
    })

    .then(dados => {
        criaEstruturaHtml(dados)
        //local de variáveis
        let listaPes = document.querySelectorAll('.container_filmes')
        let input_pesquisa = document.querySelector('.input_pesquisa')
        let img = document.querySelectorAll('.imgFav')
        let check = document.querySelector('.check')


        pesquisaFilme(input_pesquisa, listaPes)

        getFilmeClicado(img)


        /*se o chekbox estiver ativado os varitos aparecem, senão é
        ocultado*/


        check.addEventListener("click", (e) => {

            let vazio = JSON.parse(localStorage.getItem('favoritos'))

            //verifica se existe favoritos na lista
            if (vazio != null && vazio != "") {

                if (check.checked) {
                    manipularStore("favoritos", "display", "none")
                } else {
                    manipularStore("favoritos", "display", "flex")
                }
            }
            //senão houver favoritos na lista então mensagem será exibida
            else if (vazio == "" && e.target.checked == true || vazio == null && e.target.checked == true) {
                document.getElementById('aviso').innerHTML = "Lista de favoritos vazia"

            } else {
                document.getElementById('aviso').innerHTML = ""
                manipularStore("favoritos", "display", "flex")
            }

        })


        //Funções

        //Cria a estrutura html
        function criaEstruturaHtml(dados) {
            dados.results.forEach((valor) => {
                //endereço http das imagens
                const http = "https://image.tmdb.org/t/p/w500/"

                //pegando id da div no html
                const lista = document.getElementById('lista')

                //div que contem individualmente cada titulo e img do filme
                const box_filmes = document.createElement('div')
                box_filmes.classList.add('container_filmes')
                box_filmes.setAttribute("name", valor.title)

                //criando tag img
                const img = document.createElement('img')
                img.classList.add('img_filmes')
                img.src = (http + valor.backdrop_path)

                //div container para agrupar elementos para estilização
                const box_left = document.createElement('div')
                box_left.classList.add('container_left')

                //criando tag p de titulo
                const titulo = document.createElement('h3')
                titulo.innerHTML = valor.title
                titulo.classList.add('titulo')

                //container de favoritos e de nota do filme
                const box_fav_nota = document.createElement('div')
                box_fav_nota.classList.add('container_fav_and_nota')

                //container potuação
                const box_pontuacao = document.createElement('div')
                box_pontuacao.classList.add('container_pontuacao')

                //paragrafo com nota do filme
                const paragrafo_pont = document.createElement('p')
                paragrafo_pont.classList.add('pontuacao')
                paragrafo_pont.innerHTML = valor.vote_average.toFixed(1)

                //img com imagem da estrela de notas
                const img_portuacao = document.createElement('img')
                img_portuacao.classList.add('icone')
                img_portuacao.src = "icones/estrela.png"

                //container de favorito
                const box_fav = document.createElement('div')
                box_fav.classList.add('container_favorito')
                box_fav.setAttribute("name", valor.title)

                //paragrafo do favoritos
                const p3 = document.createElement('p')
                p3.innerHTML = "Favoritar"

                //img do favoritos (coração)
                const img_fav = document.createElement('img')
                img_fav.classList.add('icone')
                img_fav.classList.add('imgFav')
                img_fav.setAttribute("name", valor.title)
                img_fav.src = "icones/coracao.png"


                //adicionando elementos criados dentro das div
                box_left.appendChild(titulo)
                box_pontuacao.appendChild(img_portuacao)
                box_fav.appendChild(img_fav)
                box_fav.appendChild(p3)
                box_filmes.appendChild(img)
                box_filmes.appendChild(box_left)
                box_left.appendChild(box_fav_nota)
                box_fav_nota.appendChild(box_pontuacao)
                box_pontuacao.appendChild(paragrafo_pont)
                box_fav_nota.appendChild(box_fav)



                lista.insertAdjacentElement("beforeend", box_filmes)
            })
        }

        //limitar tamanho do texto da descrição do filme
        function limitador(nomeClass, maxCaracterer) {

            const maxCaracter = maxCaracterer//maximo de caracteres permitidos
            let classe = document.querySelector("." + nomeClass)

            //verificando se a quantidade de caracteres na descrição é mairo de maxCaracter
            let rows = classe.innerHTML.length > maxCaracter

            if (rows == true) {
                let conteudo = classe.innerHTML
                //Permitir que o texto seja exibido até atingir o limite max de caracter
                classe.innerHTML = conteudo.substring(0, maxCaracter) + "..."
            }

        }

        //Adicionar no localstorege
        function adicionarStorage(chave, valorName) {
            let arrayStorage = []
            let posicao

            //resgata pro storage
            if (localStorage.favoritos) {
                arrayStorage = JSON.parse(localStorage.getItem(chave))

                //validação de duplicata
                if (arrayStorage.includes(valorName)) {
                    posicao = arrayStorage.indexOf(valorName)
                    arrayStorage.splice(posicao, 1)
                } else {
                    //add novo item
                    arrayStorage.push(valorName)
                }
            } else {
                arrayStorage.push(valorName)
            }

            //envia pro storage
            localStorage.setItem(chave, JSON.stringify(arrayStorage))
        }

        //manipular dados resgastados do localStorage
        function manipularStore(chave, propriedade, valorPropriedade) {
            let arrayStorageMan = []

            arrayStorageMan = JSON.parse(localStorage.getItem(chave))

            listaPes.forEach((valorLista) => {

                let namelista = valorLista.getAttribute('name')

                if (!arrayStorageMan.includes(namelista)) {
                    valorLista.style = propriedade + ":" + valorPropriedade
                }
            })
        }

        //pesquisar pelo filme
        function pesquisaFilme(pesquisa, lista) {
            pesquisa.addEventListener("input", (a) => {

                //transforma texto digitado em letras minusculas
                let pesquisa = a.target.value.toLowerCase()

                lista.forEach((titulo) => {
                    //transforma texto contido da div em letras minusculas
                    let text = titulo.getAttribute('name').toLowerCase()

                    //verificar se o filme está incluso na lista
                    if (text.includes(pesquisa)) {
                        titulo.style.display = "flex"
                    } else {
                        titulo.style.display = "none"
                    }
                })
            })
        }

        //Pegar favorito selecionado
        function getFilmeClicado(click) {

            click.forEach((valorImg) => {

                valorImg.addEventListener("click", () => {
                    //passa o nome do filme clicado para a função abaixo

                    adicionarStorage("favoritos", valorImg.name)

                })
            })
        }



    })
    .catch((erro) => {
        console.log("Erro ao receber dados da api" + erro)
    })

