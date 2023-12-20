const series = document.querySelector('.series')
const subListaSerie = document.querySelector('.subListaSerie')

series.addEventListener("mouseover", () => {
    subListaSerie.classList.toggle('flex')
})


series.addEventListener("mouseout", () => {
    subListaSerie.classList.toggle('flex')
})



const filmes = document.querySelector('.filmes')
const subListaFilmes = document.querySelector('.subListaFilmes')


filmes.addEventListener("mouseover", () => {
    subListaFilmes.classList.toggle('flex')
})


filmes.addEventListener("mouseout", () => {
    subListaFilmes.classList.toggle('flex')
})
