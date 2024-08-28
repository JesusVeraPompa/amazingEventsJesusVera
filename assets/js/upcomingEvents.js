/*------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------- Logica de UpcomingEvents.html -------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------*/

//  Importamos la vista del DOM
import { CargarTarjetasUpcomingEvents, viewDomCategorias } from './module/viewDom.js'
//  Importamos los filtros
import { filtroCheckbox, filtroInput } from './module/filter.js'

//  Declaracion de Variables
let contenedor = document.getElementById('contenedor')
// Limpiar tarjetas
function LimpiarTarjetas() {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild)
    }
}

//  API con la Información
const api = 'https://mindhub-xj03.onrender.com/api/amazing'
fetch(api)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)

        //  Tarjetas cargadar por DOM
        LimpiarTarjetas()
        CargarTarjetasUpcomingEvents(contenedor, data)

        //  Creamos un filtro por Fecha
        const filtroFecha = data.events.filter((e) => data.currentDate <= e.date)
        console.log(filtroFecha)

        //  Mostramos las categorias por DOM
        viewDomCategorias(filtroFecha)

        //  Filtro por Categoría (checkbox)
        filtroCheckbox(filtroFecha)

        //  Filtro por Buscar (input)
        filtroInput(filtroFecha)
    })
