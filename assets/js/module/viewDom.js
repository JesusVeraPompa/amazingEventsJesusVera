/*------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------- Logica de Vistas por DOM -------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------- Vista de Tarjetas ---------------------------------------------------*/

export let CargarTarjetas = (idHtmlConteiner, data) => {
    for (let i = 0; i < data.length; i++) {
        let tarjeta = document.createElement('div')
        tarjeta.className = 'tarjeta'
        tarjeta.innerHTML = `   <div class="card row" >
                                    <img src="${data[i].image}" class="card-img-top p-2" alt="${data[i].name}"/>
                                    <div class="card-body justify-content-center align-items-center">
                                        <h4 class="card-title">${data[i].name}</h4>
                                        <p class="category-text">${data[i].category}</p>
                                        <p class="date-text">${data[i].date}</p>
                                        <p class="card-text">${data[i].description}</p>
                                        <div class="d-flex justify-content-center align-items-center">
                                            <div class="col-6 d-flex justify-content-center align-items-center">
                                                <p class="precio">Price:</p>
                                                <h5 class="precio px-2">$ ${data[i].price}</h5>
                                            </div>
                                            <div class="col-6">
                                                <a id="boton${data[i]._id}" href="./pages/details.html?id=${data[i]._id}" class="btn btn-primary">Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>`

        idHtmlConteiner.appendChild(tarjeta)
    }
}

export let viewDomDetailsVacio = (idHtmlConteiner) => {
    let tarjeta = document.createElement('div')
    tarjeta.innerHTML = `   
                                <div >
                                    <h4 class="p-2">Sorry, there are no records to display.</h4>
                                </div>`
    idHtmlConteiner.appendChild(tarjeta)
}


/*-------------------------------------------------------------- Vista de Categorias ---------------------------------------------------*/
export let viewDomCategorias = (info) => {
    //  Filtramos y buscamos el nombre de las categorias
    let filtroCategory = info.map((events) => events.category)
    const resultfiltroCategory = filtroCategory.reduce((acc, item) => {
        if (!acc.includes(item)) {
            acc.push(item)
        }
        return acc
    }, [])

    //  Ordenamos de la a a la z el nombre de las categorias
    const filtroCategoryOrder = resultfiltroCategory.sort(function (a, b) {
        if (a < b) {
            return -1
        }
        if (a > b) {
            return 1
        }
        return 0
    })
    console.log(filtroCategoryOrder)

    //  Mostramos las categorias por DOM
    let category = document.getElementById('category')
    for (let i = 0; i < filtroCategoryOrder.length; i++) {
        let check = document.createElement('div')
        check.className = 'check'
        check.innerHTML = ` <div class="form-check-inline py-2">
                <input class="form-check-input" type="checkbox" id="${resultfiltroCategory[i]}" value="${resultfiltroCategory[i]}" />
                <label class="form-check-label" for="flexCheckDefault1"> ${resultfiltroCategory[i]} </label>
                </div>
                `
        category.appendChild(check)
    }
}
