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
