function populateUFs(){
    const ufSelect = document
    .querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then((res)=>{
            return res.json()
    }).then( states => {

        for( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

        }
       

    })
}

populateUFs()


function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url).then((res)=>{
        return res.json()
}).then( cities => {

    for( const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

    }
   
    citySelect.disabled = false

})
}


document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)



//itens de coleta
const itensToCollect = document.querySelectorAll(".itens-grid li")

for(const item of itensToCollect){
        item.addEventListener("click", handleSelectedItem)


}

const collectedItens = document.querySelector("input[name=itens]")

let selectedItens = []

function handleSelectedItem(){
    const itemLi = event.target
      //adicionar ou remover a classe
        itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

        //verificar se existem itens selecionados, se sim
        // pegar os itens selecionados
        const alreadySelected = selectedItens.findIndex( item=>{
                       const itemFound = item ==itemId 
            return itemFound
        })

       
        //se já estiver selecionado, retira

       if(alreadySelected >= 0){
                const filteredItens = selectedItens.filter( item =>{
                    const itemIsDifferent = item != itemId
                    return itemIsDifferent
                })

              selectedItens = filteredItens



        }else{
            //se não estiver selecionado, adiciona

            selectedItens.push(itemId)
        }
        
        collectedItens.value = selectedItens

}


