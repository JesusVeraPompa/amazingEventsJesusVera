export let CargarTarjetas = (idHtmlConteiner, data) => {
    for (let i = 0; i < data.events.length; i++) {
        let tarjeta = document.createElement('div')
        tarjeta.className = 'tarjeta'
        tarjeta.innerHTML = `   <div class="card row" >
                                    <img src="${data.events[i].image}" class="card-img-top p-2" alt="${data.events[i].name}"/>
                                    <div class="card-body justify-content-center align-items-center">
                                        <h5 class="card-title">${data.events[i].name}</h5>
                                        <p class="card-text">${data.events[i].description}</p>
                                        <div class="d-flex justify-content-center align-items-center">
                                            <div class="col-6 d-flex justify-content-center align-items-center">
                                                <p class="precio">Price:</p>
                                                <h5 class="precio px-2">$ ${data.events[i].price}</h5>
                                            </div>
                                            <div class="col-6">
                                                <a id="boton${data.events[i]._id}" href="./pages/details.html?id=${data.events[i]._id}" class="btn btn-primary" onClick="valorDelID('${data.events[i]._id}')">Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>`

        idHtmlConteiner.appendChild(tarjeta)
    }
}

export let viewDomIndex = (idHtmlConteiner, data) => {
    for (let i = 0; i < data.length; i++) {
        let tarjeta = document.createElement('div')
        tarjeta.className = 'tarjeta'
        tarjeta.innerHTML = `   <div class="card row" >
                                    <img src="${data[i].image}" class="card-img-top p-2" alt="${data[i].name}"/>
                                    <div class="card-body justify-content-center align-items-center">
                                        <h5 class="card-title">${data[i].name}</h5>
                                        <p class="card-text">${data[i].description}</p>
                                        <div class="d-flex justify-content-center align-items-center">
                                            <div class="col-6 d-flex justify-content-center align-items-center">
                                                <p class="precio">Price:</p>
                                                <h5 class="precio px-2">$ ${data[i].price}</h5>
                                            </div>
                                            <div class="col-6">
                                                <a id="boton${data[i]._id}" href="./pages/details.html?id=${data[i]._id}" class="btn btn-primary" onClick="valorDelID('${data[i]._id}')">Details</a>
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

export let CargarTarjetasPastEvents = (idHtmlConteiner, data) => {
    for (let i = 0; i < data.events.length; i++) {
        if (data.currentDate >= data.events[i].date) {
            //console.log("tarjeta");
            let tarjeta = document.createElement('div')
            tarjeta.className = 'tarjeta'
            tarjeta.innerHTML = `   <div class="card row" >
                            <img src="${data.events[i].image}" class="card-img-top p-2" alt="${data.events[i].name}"/>
                            <div class="card-body justify-content-center align-items-center">
                                <h5 class="card-title">${data.events[i].name}</h5>
                                <p class="card-text">${data.events[i].description}</p>
                                <div class="d-flex justify-content-center align-items-center">
                                    <div class="col-6 d-flex justify-content-center align-items-center">
                                        <p class="precio">Price:</p>
                                        <h5 class="precio px-2">$ ${data.events[i].price}</h5>
                                    </div>
                                    <div class="col-6">
                                        <a id="boton${data.events[i]._id}" href="../pages/details.html?id=${data.events[i]._id}" class="btn btn-primary" onClick="valorDelID('${data.events[i]._id}')">Details</a>
                                    </div>
                                </div>
                            </div>
                        </div>`

            contenedor.appendChild(tarjeta)
        }
    }
}

export let viewDomIndexPastEvents = (idHtmlConteiner, data) => {
    for (let i = 0; i < data.length; i++) {
        let tarjeta = document.createElement('div')
        tarjeta.className = 'tarjeta'
        tarjeta.innerHTML = `   <div class="card row" >
                                    <img src="${data[i].image}" class="card-img-top p-2" alt="${data[i].name}"/>
                                    <div class="card-body justify-content-center align-items-center">
                                        <h5 class="card-title">${data[i].name}</h5>
                                        <p class="card-text">${data[i].description}</p>
                                        <div class="d-flex justify-content-center align-items-center">
                                            <div class="col-6 d-flex justify-content-center align-items-center">
                                                <p class="precio">Price:</p>
                                                <h5 class="precio px-2">$ ${data[i].price}</h5>
                                            </div>
                                            <div class="col-6">
                                                <a id="boton${data[i]._id}" href="../pages/details.html?id=${data[i]._id}" class="btn btn-primary" onClick="valorDelID('${data[i]._id}')">Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>`

        idHtmlConteiner.appendChild(tarjeta)
    }
}
