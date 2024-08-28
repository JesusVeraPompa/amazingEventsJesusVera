/*------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------- Logica de index.html -------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------*/

//  Importamos la vista del DOM
import { CargarTarjetas } from './module/viewDom.js'

//  Declaracion de Variables
let contenedor = document.getElementById('contenedor')

//  Url con la Información
const url = 'https://mindhub-xj03.onrender.com/api/amazing'
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)

        //  Tarjetas cargadar por DOM
        CargarTarjetas(contenedor, data)

        // Limpiar tarjetas
        function LimpiarTarjetas() {
            while (contenedor.firstChild) {
                contenedor.removeChild(contenedor.firstChild)
            }
        }

        //  Categorias cargadar por DOM
        let filtroCategory = data.events.map((events) => events.category)
        //console.log(filtroCategory);
        const resultfiltroCategory = filtroCategory.reduce((acc, item) => {
            if (!acc.includes(item)) {
                acc.push(item)
            }
            return acc
        }, [])
        //.log(resultfiltroCategory);
        let category = document.getElementById('category')
        for (let i = 0; i < resultfiltroCategory.length; i++) {
            //console.log(resultfiltroCategory[i]);
            let check = document.createElement('div')
            check.className = 'check'
            check.innerHTML = ` <div class="form-check-inline py-2">
                        <input class="form-check-input" type="checkbox" id="${resultfiltroCategory[i]}" value="${resultfiltroCategory[i]}" />
                        <label class="form-check-label" for="flexCheckDefault1"> ${resultfiltroCategory[i]} </label>
                        </div>
                        `

            category.appendChild(check)
        }

        //  Filtro por categoría
        document.getElementById('category').addEventListener('change', (e) => {
            //console.log(e.target);
            let checkboxChekeados = document.querySelectorAll('input[type=checkbox]:checked')
            let arreglo = Array.from(checkboxChekeados).map((e) => e.value)
            //console.log(arreglo);
            let nuevoArreglo = data.events.filter((e) => arreglo.includes(e.category))
            //console.log(nuevoArreglo);

            if (nuevoArreglo.length === 0) {
                LimpiarTarjetas()
                CargarTarjetas()
            } else {
                // Limpiar tarjetas
                LimpiarTarjetas()
                // Cargar tarjetas filtradas
                for (let i = 0; i < nuevoArreglo.length; i++) {
                    let tarjeta = document.createElement('div')
                    tarjeta.className = 'tarjeta'
                    tarjeta.innerHTML = `   
                                <div class="card row" >
                                <img src="${nuevoArreglo[i].image}" class="card-img-top p-2" alt="${nuevoArreglo[i].name}"/>
                                <div class="card-body justify-content-center align-items-center">
                                    <h5 class="card-title">${nuevoArreglo[i].name}</h5>
                                    <p class="card-text">${nuevoArreglo[i].description}</p>
                                    <div class="d-flex justify-content-center align-items-center">
                                        <div class="col-6 d-flex justify-content-center align-items-center">
                                            <p class="precio">Price:</p>
                                            <h5 class="precio px-2">$ ${nuevoArreglo[i].price}</h5>
                                        </div>
                                        <div class="col-6">
                                            <a id="boton${nuevoArreglo[i]._id}" href="#" class="btn btn-primary" onClick="valorDelID('${nuevoArreglo[i]._id}')">Details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                    contenedor.appendChild(tarjeta)
                }

                document.getElementById('search').addEventListener('input', (e) => {
                    let input = e.target.value.toLowerCase()
                    let arregloFiltroLetra = nuevoArreglo.filter(
                        (e) =>
                            e.name.toLowerCase().includes(input) ||
                            e.description.toLowerCase().includes(input)
                    )
                    //console.log(input);
                    if (arregloFiltroLetra.length === 0) {
                        LimpiarTarjetas()
                        /*CargarTarjetas();*/
                        let tarjeta = document.createElement('div')
                        tarjeta.innerHTML = `   
                                    <div >
                                    <h4 class="p-2">Sorry, there is no record to display.</h4>
                                </div>`
                        contenedor.appendChild(tarjeta)
                    } else {
                        // Limpiar tarjetas
                        LimpiarTarjetas()
                        // Cargar tarjetas filtradas
                        for (let i = 0; i < arregloFiltroLetra.length; i++) {
                            let tarjeta = document.createElement('div')
                            tarjeta.className = 'tarjeta'
                            tarjeta.innerHTML = `   
                                    <div class="card row" >
                                    <img src="${arregloFiltroLetra[i].image}" class="card-img-top p-2" alt="${arregloFiltroLetra[i].name}"/>
                                    <div class="card-body justify-content-center align-items-center">
                                    <h5 class="card-title">${arregloFiltroLetra[i].name}</h5>
                                    <p class="card-text">${arregloFiltroLetra[i].description}</p>
                                    <div class="d-flex justify-content-center align-items-center">
                                    <div class="col-6 d-flex justify-content-center align-items-center">
                                    <p class="precio">Price:</p>
                                    <h5 class="precio px-2">$ ${arregloFiltroLetra[i].price}</h5>
                                    </div>
                                    <div class="col-6">
                                            <a id="boton${arregloFiltroLetra[i]._id}" href="#" class="btn btn-primary" onClick="valorDelID('${arregloFiltroLetra[i]._id}')">Details</a>
                                    </div>
    
                                    </div>
                                    </div>
                                </div>`
                            contenedor.appendChild(tarjeta)
                        }
                    }
                })
            }
        })

        document.getElementById('search').addEventListener('input', (e) => {
            let input = e.target.value.toLowerCase()
            let arregloFiltroLetra = data.events.filter(
                (e) =>
                    e.name.toLowerCase().includes(input) ||
                    e.description.toLowerCase().includes(input)
            )
            console.log(input)

            if (arregloFiltroLetra.length === 0) {
                LimpiarTarjetas()
                /*CargarTarjetas();*/
                let tarjeta = document.createElement('div')
                tarjeta.innerHTML = `   
                                <div >
                                <h4 class="p-2">Sorry, there is no record to display.</h4>
                            </div>`
                contenedor.appendChild(tarjeta)
            } else {
                // Limpiar tarjetas
                LimpiarTarjetas()
                // Cargar tarjetas filtradas
                for (let i = 0; i < arregloFiltroLetra.length; i++) {
                    let tarjeta = document.createElement('div')
                    tarjeta.className = 'tarjeta'
                    tarjeta.innerHTML = `   
                                <div class="card row" >
                                <img src="${arregloFiltroLetra[i].image}" class="card-img-top p-2" alt="${arregloFiltroLetra[i].name}"/>
                                <div class="card-body justify-content-center align-items-center">
                                <h5 class="card-title">${arregloFiltroLetra[i].name}</h5>
                                <p class="card-text">${arregloFiltroLetra[i].description}</p>
                                <div class="d-flex justify-content-center align-items-center">
                                <div class="col-6 d-flex justify-content-center align-items-center">
                                <p class="precio">Price:</p>
                                <h5 class="precio px-2">$ ${arregloFiltroLetra[i].price}</h5>
                                </div>
                                <div class="col-6">
                                            <a id="boton${arregloFiltroLetra[i]._id}" href="#" class="btn btn-primary" onClick="valorDelID('${arregloFiltroLetra[i]._id}')">Details</a>
                                </div>

                                </div>
                                </div>
                            </div>`
                    contenedor.appendChild(tarjeta)
                }

                //  Filtro por categoría
                document.getElementById('category').addEventListener('change', (e) => {
                    //console.log(e.target);
                    let checkboxChekeados = document.querySelectorAll(
                        'input[type=checkbox]:checked'
                    )
                    let arreglo = Array.from(checkboxChekeados).map((e) => e.value)
                    //console.log(arreglo);
                    let nuevoArreglo = arregloFiltroLetra.filter((e) =>
                        arreglo.includes(e.category)
                    )
                    //console.log(nuevoArreglo);

                    if (nuevoArreglo.length === 0) {
                        LimpiarTarjetas()
                        CargarTarjetas()
                    } else {
                        // Limpiar tarjetas
                        LimpiarTarjetas()
                        // Cargar tarjetas filtradas
                        for (let i = 0; i < arregloFiltroLetra.length; i++) {
                            let tarjeta = document.createElement('div')
                            tarjeta.className = 'tarjeta'
                            tarjeta.innerHTML = `   
                                <div class="card row" >
                                <img src="${arregloFiltroLetra[i].image}" class="card-img-top p-2" alt="${arregloFiltroLetra[i].name}"/>
                                <div class="card-body justify-content-center align-items-center">
                                    <h5 class="card-title">${arregloFiltroLetra[i].name}</h5>
                                    <p class="card-text">${arregloFiltroLetra[i].description}</p>
                                    <div class="d-flex justify-content-center align-items-center">
                                        <div class="col-6 d-flex justify-content-center align-items-center">
                                            <p class="precio">Price:</p>
                                            <h5 class="precio px-2">$ ${arregloFiltroLetra[i].price}</h5>
                                        </div>
                                        <div class="col-6">
                                            <a id="boton${arregloFiltroLetra[i]._id}" href="#" class="btn btn-primary" onClick="valorDelID('${arregloFiltroLetra[i]._id}')">Details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                            contenedor.appendChild(tarjeta)
                        }
                    }
                })
            }
        })
    })
