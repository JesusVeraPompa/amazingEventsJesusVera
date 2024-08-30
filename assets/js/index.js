/*------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------- Logica de index.html -------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------*/

//  Importamos la vista del DOM
import { CargarTarjetas, viewDomCategorias } from './module/viewDom.js'
//  Importamos los filtros
import { filtroCheckbox, filtroInput } from './module/filter.js'
//  Importamos los datos de la url API
import { dataAPI } from './module/dataAPI.js'

//  API con la Información
const api = dataAPI()
fetch(api)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        console.log(data.events)

        //  Mostramos las tarjetas por DOM
        CargarTarjetas(contenedor, data.events,"./pages/")

        //  Mostramos las categorias por DOM
        viewDomCategorias(data.events)

        //  Filtro por Categoría (checkbox)
        filtroCheckbox(data.events,"./pages/")

        //  Filtro por Buscar (input)
        filtroInput(data.events,"./pages/")
        
    }).catch(error => console.error("Error al obtener los datos en Index:",
        error));
