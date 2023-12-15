const categoria = document.querySelector('.categoria')
const subLista = document.querySelector('.subLista')

categoria.addEventListener("mouseover", (e) => {
    console.log(e)
    subLista.classList.toggle('flex')
})



categoria.addEventListener("mouseout", () => {
    console.log("saida")
    subLista.classList.toggle('flex')


})




