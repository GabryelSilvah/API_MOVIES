import { apiKey } from './key.js'
let search = "search"
let query = null

const url = new URLSearchParams(window.location.search)
query = url.get('url')
async function getApi(search, query) {

    try {
        const response = await fetch(`http://api.themoviedb.org/3/movie/${query}?api_key=${apiKey}&language=pt-BR`)
        // const response = await fetch(`https://api.themoviedb.org/3/find/${query}?external_source=imdb_id&api_key=${apiKey}&language=pt-br`)
        const dados = await response.json()
        return dados
    }
    catch (erro) {
        return "Erro ao conectar com a api. " + erro
    }
}
const url_Img = "https://image.tmdb.org/t/p/w500/"
//Armazenando dados da API
let dados = await getApi(search, query)
console.log(dados)




document.querySelector('.img').src = url_Img + dados.poster_path
document.querySelector('.titulo').innerHTML = dados.title
document.querySelector('.data').innerHTML = dados.release_date
document.querySelector('.descicao').innerHTML = dados.overview
document.querySelector('.popularidade').innerHTML = "Avaliação: " + dados.vote_average.toFixed(1)
dados.genres.forEach((valor) => {
    const genero = document.createElement('p')
    genero.innerHTML = valor.name


    const container_genero = document.querySelector('.container_genero')
    container_genero.insertAdjacentElement("beforeend", genero)
});

// criarEstrutura(dados.results[0])

//Funções

//Criar estrutura html
function criarEstrutura(dados) {
    const url_Img = "https://image.tmdb.org/t/p/w500/"
    const div_descricao = document.querySelector('.container_descricao')

    const descricao_filme = document.createElement('div')


    const container_img = document.createElement('div')
    container_img.classList.add('container_img')

    const img = document.createElement('img')
    img.src = url_Img + dados.poster_path

    const container_texto = document.createElement('div')
    container_texto.classList.add('container_texto')


    const titulo = document.createElement('h3')
    titulo.innerHTML = dados.title

    const sinopse = document.createElement('p')
    sinopse.innerHTML = dados.overview



    container_img.appendChild(img)
    descricao_filme.appendChild(container_texto)

    container_texto.appendChild(titulo)
    container_texto.appendChild(sinopse)

    descricao_filme.appendChild(container_img)
    descricao_filme.appendChild(container_texto)


    div_descricao.insertAdjacentElement("beforeend", descricao_filme)

}