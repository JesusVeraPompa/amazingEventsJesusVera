/*------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------- Logica de UpcomingEvents.html ---------------------------------------*/
/*------------------------------------------------------------------------------------------------------------*/

//  Importamos la vista del DOM
import { CargarTarjetas, viewDomCategorias } from './module/viewDom.js'
//  Importamos los filtros
import { filtroCheckbox, filtroInput } from './module/filter.js'
//  Importamos los datos de la url API
import { dataAPI } from './module/dataAPI.js'

//  Declaracion de Variables
let contenedor = document.getElementById('contenedor')
// Limpiar tarjetas
function LimpiarTarjetas() {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild)
    }
}

//  API con la Información
const api = dataAPI()
fetch(api)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)

        //  Creamos un filtro por Fecha
        const filtroFecha = data.events.filter((e) => data.currentDate <= e.date)
        console.log(filtroFecha)

        //  Tarjetas cargadar por DOM
        LimpiarTarjetas()
        CargarTarjetas(contenedor, filtroFecha, "")


        //  Mostramos las categorias por DOM
        viewDomCategorias(filtroFecha)

        //  Filtro por Categoría (checkbox)
        filtroCheckbox(filtroFecha)

        //  Filtro por Buscar (input)
        filtroInput(filtroFecha)

    }).catch(error => console.error("Error al obtener los datos en UpcomingEvents:",
        error));

