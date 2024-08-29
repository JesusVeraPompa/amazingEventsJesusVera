/*------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------- Logica de Filtros ----------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------*/

//  Importamos la vista del DOM
import { CargarTarjetas, viewDomDetailsVacio } from './viewDom.js'

//  Declaracion de Variables
let contenedor = document.getElementById('contenedor')
// Limpiar tarjetas
function LimpiarTarjetas() {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild)
    }
}

/*---------------------------------------- Filtro por Categoría (checkbox) ----------------------------------------*/
export let filtroCheckbox = (filtro) => {
    //  escuchamos el cambio del checkbox y lo guardamos en un array
    document.getElementById('category').addEventListener('change', (e) => {
        let checkboxChekeados = document.querySelectorAll('input[type=checkbox]:checked')
        let arreglo = Array.from(checkboxChekeados).map((e) => e.value)
        console.log(arreglo)

        //  si hay checkbox Activados
        if (arreglo.length > 0) {
            // creamos un array en base a los checkbox activamos
            let nuevoArreglo = filtro.filter((e) => arreglo.includes(e.category.toString()))
            console.log(nuevoArreglo)

            //  Si no encontro nada en la busqueda, muestra mensaje de Sorry
            if (nuevoArreglo.length === 0) {
                LimpiarTarjetas()
                viewDomDetailsVacio(contenedor)
            } else {
                //  Cargamos por DOM los datos checkbox activamos
                LimpiarTarjetas()
                CargarTarjetas(contenedor, nuevoArreglo)

                //  Escuchamos el input y lo guardamos en un array
                document.getElementById('search').addEventListener('input', (e) => {
                    let input = e.target.value.toLowerCase()
                    const arregloFiltroLetra = nuevoArreglo.filter((e) =>
                        e.name.toLowerCase().includes(input)
                    )
                    console.log(arregloFiltroLetra)
                    if (arregloFiltroLetra.length === 0) {
                        LimpiarTarjetas()
                        viewDomDetailsVacio(contenedor)
                    } else {
                        //  Cargamos por DOM los datos checkbox activamos segun el filtro del input
                        LimpiarTarjetas()
                        CargarTarjetas(contenedor, arregloFiltroLetra)
                    }
                })
            }
        } else {
            //  si NO hay checkbox Activados

            //  Cargamos por DOM los datos del Array Final
            LimpiarTarjetas()
            CargarTarjetas(contenedor, filtro)

            //  Escuchamos el input y lo guardamos en un array
            document.getElementById('search').addEventListener('input', (e) => {
                let input = e.target.value.toLowerCase()
                const arregloFiltroLetra = filtro.filter((e) =>
                    e.name.toLowerCase().includes(input)
                )
                console.log(arregloFiltroLetra)

                if (arregloFiltroLetra.length === 0) {
                    LimpiarTarjetas()
                    viewDomDetailsVacio(contenedor)
                } else {
                    //  Cargamos por DOM los datos del Array Final segun el filtro del input
                    LimpiarTarjetas()
                    CargarTarjetas(contenedor, filtarregloFiltroLetraoFecha)
                }
            })
        }
    })
}

/*---------------------------------------- Filtro por Buscar (input) ----------------------------------------*/
export let filtroInput = (filtro) => {
    //  Escuchamos el input y lo guardamos en un array
    document.getElementById('search').addEventListener('input', (e) => {
        let input = e.target.value.toLowerCase()
        const arregloFiltroLetra = filtro.filter((e) => e.name.toLowerCase().includes(input))
        console.log(arregloFiltroLetra)

        if (arregloFiltroLetra.length === 0) {
            LimpiarTarjetas()
            viewDomDetailsVacio(contenedor)
        } else {
            //  Cargamos por DOM los datos que guardamos en un array
            LimpiarTarjetas()
            CargarTarjetas(contenedor, arregloFiltroLetra)

            //  escuchamos el cambio del checkbox y lo guardamos en un array
            document.getElementById('category').addEventListener('change', (e) => {
                let checkboxChekeados = document.querySelectorAll('input[type=checkbox]:checked')
                let arreglo = Array.from(checkboxChekeados).map((e) => e.value)
                console.log(arreglo)

                //  si hay checkbox Activados
                if (arreglo.length > 0) {
                    // creamos un array en base a los checkbox activamos
                    let nuevoArreglo = arregloFiltroLetra.filter((e) =>
                        arreglo.includes(e.category)
                    )
                    console.log(nuevoArreglo)

                    if (nuevoArreglo.length === 0) {
                        LimpiarTarjetas()
                        viewDomDetailsVacio(contenedor)
                    } else {
                        //  Cargamos por DOM los datos del filtro del input segun el checkbox activo
                        LimpiarTarjetas()
                        CargarTarjetas(contenedor, nuevoArreglo)
                    }
                } else {
                    //  si NO hay checkbox Activados
                    //  Cargamos por DOM los datos del filtro del input segun lo guardamos en un array inical del input
                    LimpiarTarjetas()
                    CargarTarjetas(contenedor, arregloFiltroLetra)
                }
            })
        }
    })
}
