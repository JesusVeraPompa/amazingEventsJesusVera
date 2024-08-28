/*------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------- Logica de index.html -------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------*/

//  Importamos la vista del DOM
import { CargarTarjetas, viewDomIndex, viewDomDetailsVacio } from './module/viewDom.js'

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
        CargarTarjetas(contenedor, data)

        //  Categorias cargadar por DOM
        let filtroCategory = data.events.map((events) => events.category)
        const resultfiltroCategory = filtroCategory.reduce((acc, item) => {
            if (!acc.includes(item)) {
                acc.push(item)
            }
            return acc
        }, [])
        console.log(resultfiltroCategory)
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

        /*---------------------------------------- Filtro por Categoría ----------------------------------------*/
        //  escuchamos el cambio del checkbox y lo guardamos en un array
        document.getElementById("category").addEventListener("change", (e) => {
            let checkboxChekeados = document.querySelectorAll(
              "input[type=checkbox]:checked"
            );
            let arreglo = Array.from(checkboxChekeados).map((e) => e.value);
            console.log(arreglo);
  
            //  si hay checkbox Activados
            if (arreglo.length > 0) {
              // creamos un array en base a los checkbox activamos
              let nuevoArreglo = data.events.filter((e) =>
                arreglo.includes(e.category.toString())
              );
              console.log(nuevoArreglo);
  
              if (nuevoArreglo.length === 0) {
                LimpiarTarjetas();
                viewDomDetailsVacio(contenedor);
              } else {
                //  Cargamos por DOM los datos checkbox activamos
                LimpiarTarjetas();
                viewDomIndex(contenedor, nuevoArreglo);
  
                //  Escuchamos el input y lo guardamos en un array
                document
                  .getElementById("search")
                  .addEventListener("input", (e) => {
                    let input = e.target.value.toLowerCase();
                    const arregloFiltroLetra = nuevoArreglo.filter((e) =>
                      e.name.toLowerCase().includes(input)
                    );
                    console.log(arregloFiltroLetra);
                    if (arregloFiltroLetra.length === 0) {
                      LimpiarTarjetas();
                      viewDomDetailsVacio(contenedor);
                    } else {
                      //  Cargamos por DOM los datos checkbox activamos segun el filtro del input
                      LimpiarTarjetas();
                      viewDomIndex(contenedor, arregloFiltroLetra);
                    }
                  });
              }
            } else {
              //  si NO hay checkbox Activados
  
              //  Cargamos por DOM los datos del Array Final
              LimpiarTarjetas();
              viewDomIndex(contenedor, data.events);
  
              //  Escuchamos el input y lo guardamos en un array
              document.getElementById("search").addEventListener("input", (e) => {
                let input = e.target.value.toLowerCase();
                const arregloFiltroLetra = data.events.filter((e) =>
                  e.name.toLowerCase().includes(input)
                );
                console.log(arregloFiltroLetra);
  
                if (arregloFiltroLetra.length === 0) {
                  LimpiarTarjetas();
                  viewDomDetailsVacio(contenedor);
                } else {
                  //  Cargamos por DOM los datos del Array Final segun el filtro del input
                  LimpiarTarjetas();
                  viewDomIndex(contenedor, arregloFiltroLetra);
                }
              });
            }
          });
  
          /*---------------------------------------- Filtro por Buscar ----------------------------------------*/
          //  Escuchamos el input y lo guardamos en un array
          document.getElementById("search").addEventListener("input", (e) => {
            let input = e.target.value.toLowerCase();
            const arregloFiltroLetra = data.events.filter((e) =>
              e.name.toLowerCase().includes(input)
            );
            console.log(arregloFiltroLetra);
  
            if (arregloFiltroLetra.length === 0) {
              LimpiarTarjetas();
              viewDomDetailsVacio(contenedor);
            } else {
              //  Cargamos por DOM los datos que guardamos en un array
              LimpiarTarjetas();
              viewDomIndex(contenedor, arregloFiltroLetra);
  
              //  escuchamos el cambio del checkbox y lo guardamos en un array
              document
                .getElementById("category")
                .addEventListener("change", (e) => {
                  let checkboxChekeados = document.querySelectorAll(
                    "input[type=checkbox]:checked"
                  );
                  let arreglo = Array.from(checkboxChekeados).map((e) => e.value);
                  console.log(arreglo);
  
                  //  si hay checkbox Activados
                  if (arreglo.length > 0) {
                    // creamos un array en base a los checkbox activamos
                    let nuevoArreglo = arregloFiltroLetra.filter((e) =>
                      arreglo.includes(e.category)
                    );
                    console.log(nuevoArreglo);
  
                    if (nuevoArreglo.length === 0) {
                      LimpiarTarjetas();
                      viewDomDetailsVacio(contenedor);
                    } else {
                      //  Cargamos por DOM los datos del filtro del input segun el checkbox activo
                      LimpiarTarjetas();
                      viewDomIndex(contenedor, nuevoArreglo);
                    }
                  } else {
                    //  si NO hay checkbox Activados
                    //  Cargamos por DOM los datos del filtro del input segun lo guardamos en un array inical del input
                    LimpiarTarjetas();
                    viewDomIndex(contenedor, arregloFiltroLetra);
                  }
                });
            }
          });
    })
