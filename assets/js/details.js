/*------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------- Logica de details.html -------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------*/

//  Importamos los datos de la url API
import { dataAPI } from './module/dataAPI.js'

let url = new URLSearchParams(window.location.search)
let id = url.get('id')
console.log(id)

//  API con la Información
const api = dataAPI()
fetch(api)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)

        // filtra data.events segun la varieble id y muestramelo en array
        let filtroID = data.events.find((e) => e._id === parseInt(id))
        console.log(filtroID)

        let contenedor = document.getElementById('contenedorN')
        let tarjeta = document.createElement('div')
        tarjeta.className = 'tarjetaN'
        tarjeta.innerHTML = `
                            <div class="caja">
                                <div class="div-img-detail col-12 col-md-6 p-2 rounded-3">
                                    <img src="${
                                        filtroID.image
                                    }" class="img-detail p-2 rounded-3" alt="cinema" />
                                </div>
                                <div class="col-12 col-md-6 bg-white rounded-3 p-5">
                                    <h3>${filtroID.name}</h3>
                                    <p class="par">Date:</p><p> ${filtroID.date}</p>
                                    <p class="par">Description:</p><p> ${filtroID.description}</p>
                                    <p class="par">Category:</p><p class="part"> ${
                                        filtroID.category
                                    }</p>
                                    <p class="par">Place:</p><p> ${filtroID.place}</p>
                                    <p class="par">Capacity:</p><p> ${Intl.NumberFormat(
                                        'de-DE'
                                    ).format(filtroID.capacity)}</p>
                                    <p class="par">Estimate:</p><p> ${
                                        !filtroID.estimate
                                            ? ' N/A '
                                            : Intl.NumberFormat('de-DE').format(filtroID.estimate)
                                    }</p>
                                    <p class="par">Assistance:</p><p> ${
                                        !filtroID.assistance
                                            ? ' N/A '
                                            : Intl.NumberFormat('de-DE').format(filtroID.assistance)
                                    }</p>
                                    <p class="par">Price:</p><p class="price">$${filtroID.price}</p>
                                </div>
                            </div>    
        
        `

        contenedor.appendChild(tarjeta)
    }).catch(error => console.error("Error al obtener los datos en details:",
        error));
