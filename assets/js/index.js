/*------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------- Logica de index.html -------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------*/

//  Importamos la vista del DOM
import { CargarTarjetas, viewDomCategorias } from './module/viewDom.js'
//  Importamos los filtros
import { filtroCheckbox, filtroInput } from './module/filter.js'

//  API con la Información
const api = 'https://mindhub-xj03.onrender.com/api/amazing'
fetch(api)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        console.log(data.events)

        //  Mostramos las tarjetas por DOM
        CargarTarjetas(contenedor, data)

        //  Mostramos las categorias por DOM
        viewDomCategorias(data.events)

        //  Filtro por Categoría (checkbox)
        filtroCheckbox(data.events)

        //  Filtro por Buscar (input)
        filtroInput(data.events)
    })
