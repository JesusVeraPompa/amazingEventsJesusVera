/*------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------- Logica de details.html -------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------*/

let url = new URLSearchParams(window.location.search)
let id = url.get('id')
console.log(id)

//  API con la Información
const api = 'https://mindhub-xj03.onrender.com/api/amazing'
fetch(api)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        console.log(data.events)

        // filtra data.events segun la varieble id y muestramelo en array
        let filtroID = data.events.find((e) => e._id === parseInt(id))
        console.log(filtroID)
        console.log(filtroID.assistance)
        console.log(filtroID.estimate)

        let contenedor = document.getElementById('contenedorN')
        let tarjeta = document.createElement('div')
        tarjeta.className = 'tarjetaN'
        tarjeta.innerHTML = `
                            <div class="caja">
                                <div class="div-img-detail col-12 col-md-6 p-2 rounded-3">
                                    <img src="${filtroID.image}" class="img-detail p-2 rounded-3" alt="cinema" />
                                </div>
                                <div class="col-12 col-md-6 bg-white rounded-3 p-5">
                                    <h3>${filtroID.name}</h3>
                                    <p>Name: ${filtroID.name}</p>
                                    <p>Date: ${filtroID.date}</p>
                                    <p>Description: ${filtroID.description}</p>
                                    <p>Category: ${filtroID.category}</p>
                                    <p>Place: ${filtroID.place}</p>
                                    <p>Capacity: ${Intl.NumberFormat(
                                        "de-DE"
                                      ).format(filtroID.capacity)}</p>
                                    <p>Estimate: ${!filtroID.estimate ? " N/A " : Intl.NumberFormat("de-DE").format(filtroID.estimate) }</p>
                                    <p>Assistance: ${!filtroID.assistance ? " N/A " : Intl.NumberFormat("de-DE").format(filtroID.assistance) }</p>
                                    <p>Price: <strong>$${filtroID.price}</strong></p>
                                </div>
                            </div>    
        
        `

        contenedor.appendChild(tarjeta)
    })
