import { apiKey } from './key.js'
const botaoPesquisar = document.querySelector('.lupa')

//Conectando com a API
async function getApi(query) {
    
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?include_adult=false&language=pt-br&api_key=${apiKey}&query=${query}`)
        const dados = await response.json()
        return dados
    }
    catch (erro) {
        return "Erro ao conectar com a api. " + erro
    }
}

//Armazenando dados da API



buscarFilme(botaoPesquisar)

//Busca por fillmes
function buscarFilme(botao) {
    botao.addEventListener("click", async () => {
        document.querySelector('.container_banner').innerHTML = ""
        let inputFilme = document.querySelector('.input_pesquisa')
       
    
        const divLista = document.getElementById('lista')
        divLista.innerHTML = ""        
        let filmesEncontrados = await getApi(inputFilme.value) 

        criaEstruturaHtml(filmesEncontrados)

    })

}

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

        const link = document.createElement('a')
        link.href = "descricao.php?url=" + valor.id
        //criando tag img
        const img = document.createElement('img')
        img.classList.add('img_filmes')
        img.src = (http + valor.poster_path)

        //div container para agrupar elementos para estilização
        const box_left = document.createElement('div')
        box_left.classList.add('container_left')

        //criando tag p de titulo
        const titulo = document.createElement('h3')
        if(valor.title){
            titulo.innerHTML = valor.title  
        }else{
            titulo.innerHTML = valor.name
        }
      
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

        

        //img com imagem da estrela de notas
        const img_portuacao = document.createElement('img')
        img_portuacao.classList.add('icone')
        img_portuacao.src = "./public/icones/estrela.png"

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
        img_fav.src = "./public/icones/coracao.png"


        //adicionando elementos criados dentro das div

        box_left.appendChild(titulo)
        box_pontuacao.appendChild(img_portuacao)
        box_fav.appendChild(img_fav)
        box_fav.appendChild(p3)
        box_filmes.appendChild(link)
        link.appendChild(img)
        box_filmes.appendChild(box_left)
        box_left.appendChild(box_fav_nota)
        box_fav_nota.appendChild(box_pontuacao)
        box_pontuacao.appendChild(paragrafo_pont)
        box_fav_nota.appendChild(box_fav)



        lista.insertAdjacentElement("beforeend", box_filmes)
    })
}