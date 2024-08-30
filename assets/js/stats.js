/*------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------- Logica de stats.html -------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------*/

//  Importamos los datos de la url API
import { dataAPI } from './module/dataAPI.js'

//  API con la Información
const api = dataAPI()
fetch(api)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        console.log(data.events)

        /*--------------------------------- Start Function Assistance ---------------------------------*/
        //  Declaramos las variables
        let porcenHighest = document.getElementById('porcen-highest')
        let porcenLowest = document.getElementById('porcen-lowest')

        //  Funciones
        Assistance(porcenHighest, 'mayor')
        Assistance(porcenLowest, 'menor')

        function Assistance(idHtmlConteiner, signo) {
            //  Filtramos por assistance
            let eventsAssistance = data.events.filter((item) => item.assistance)

            //  Agregamos el campo Porcentaje al final del array de cada uno
            let newEventsAssistance = []
            for (let i = 0; i < eventsAssistance.length; i++) {
                let assistance = eventsAssistance[i].assistance
                let capacity = eventsAssistance[i].capacity
                let porcentaje = (assistance / capacity) * 100
                let porcentajeTOTAL = parseInt(porcentaje)
                let newData = { ...eventsAssistance[i], porcentaje: porcentajeTOTAL }
                newEventsAssistance.push(newData)
            }
            console.log(newEventsAssistance)

            //  Obtenemos el valor de porcentaje a buscar si es mayor o menor
            if (signo === 'mayor') {
                let assistanceSigno = newEventsAssistance.reduce((prev, cur) =>
                    cur.porcentaje > prev.porcentaje ? cur : prev
                )
                console.log(assistanceSigno)
                vistaDOM(assistanceSigno)
            } else if (signo === 'menor') {
                let assistanceSigno = newEventsAssistance.reduce((prev, cur) =>
                    cur.porcentaje < prev.porcentaje ? cur : prev
                )
                console.log(assistanceSigno)
                vistaDOM(assistanceSigno)
            }

            //  mostramos por DOM el resultado
            function vistaDOM(params) {
                //  Creamos un string con la info obtenida anterior
                let eventsHighest = `<h4 class="assistance"><strong>${
                    params.porcentaje
                }</strong>% with Highest Assistance</h4> <p> Name: <strong>${
                    params.name
                }</strong>,  Category: <strong>${params.category}</strong>,  Date: <strong>${
                    params.date
                }</strong>,  Capacity: <strong>${Intl.NumberFormat('de-DE').format(
                    params.capacity
                )}</strong>, Assistance: <strong>${Intl.NumberFormat('de-DE').format(
                    params.assistance
                )}</strong> </p>`
                //  Mostramos la info por DOM
                idHtmlConteiner.innerHTML += `${eventsHighest}`
            }
        }
        /*--------------------------------- End Function Assistance  ----------------------------------*/

        /*--------------------------------- Start Events with larger capacity ----------------------------------------*/
        //  Obtenemos el valor mayor de capacity
        let capacityMayor = data.events.reduce((prev, cur) =>
            cur.capacity > prev.capacity ? cur : prev
        )
        //  Creamos un string con la info obtenida anterior
        let eventsCapacityMayor = ` <p>Name: <strong>${
            capacityMayor.name
        }</strong>,  Category: <strong>${capacityMayor.category}</strong>,  Date: <strong>${
            capacityMayor.date
        }</strong>,  Capacity: <strong>${Intl.NumberFormat('de-DE').format(
            capacityMayor.capacity
        )}</strong> </p>`
        console.log(eventsCapacityMayor)
        //  Mostramos la info por DOM
        let contenedor = document.getElementById('larger-capacity')
        contenedor.innerHTML += `${eventsCapacityMayor}
        `
        /*--------------------------------- End Events with larger capacity ----------------------------------------*/

        /*--------------------------------- Start Upcoming Events and Past Events Statistics ---------------------------------*/
        //  Declaramos las variables
        let UpcomingEvents = document.getElementById('UpcomingEvents')
        let PastEvents = document.getElementById('PastEvents')

        //  Creamos un filtro por Fecha
        const filtroFechaUpcoming = data.events.filter((e) => data.currentDate <= e.date)
        console.log(filtroFechaUpcoming)

        const filtroFechaPast = data.events.filter((e) => data.currentDate >= e.date)
        console.log(filtroFechaPast)

        Events(UpcomingEvents,filtroFechaUpcoming,"UpcomingEvents")
        Events(PastEvents,filtroFechaPast,"PastEvents")

        function Events(idHtmlConteiner,data,info) {


            //  Filtramos y buscamos el nombre de las categorias
            let filtroCategory = data.map((events) => events.category)
            const resultfiltroCategory = filtroCategory.reduce((acc, item) => {
                if (!acc.includes(item)) {
                    acc.push(item)
                }
                return acc
            }, [])

            //  Ordenamos de la a a la z el nombre de las categorias
            const filtroCategoryOrder = resultfiltroCategory.sort(function (a, b) {
                if (a < b) {
                    return -1
                }
                if (a > b) {
                    return 1
                }
                return 0
            })
            console.log(filtroCategoryOrder)

            let array = []
            for (let e = 0; e < filtroCategoryOrder.length; e++) {
                let contador = 0
                let sumaRevenues = 0
                let sumaPorcentaje = 0
                let sumaEstimate = 0
                let sumaCapacity = 0
                let porcentaje = 0
                let porcentajeTOTAL = 0
                for (let i = 0; i < data.length; i++) {
                    if (data[i].category === filtroCategoryOrder[e] && info === "UpcomingEvents") {
                        ++contador
                            let Revenues =
                            data[i].estimate * data[i].price
                            sumaRevenues += Revenues
                            sumaEstimate += data[i].estimate
                            sumaCapacity += data[i].capacity
                    }else if (data[i].category === filtroCategoryOrder[e] && info === "PastEvents") {
                        ++contador
                            let Revenues =
                            data[i].assistance * data[i].price
                            sumaRevenues += Revenues
                            sumaEstimate += data[i].assistance
                            sumaCapacity += data[i].capacity
                    }
                }

                porcentaje = (sumaEstimate / sumaCapacity) * 100
                porcentajeTOTAL = parseInt(porcentaje)
                sumaPorcentaje += porcentajeTOTAL

                let category = filtroCategoryOrder[e]
                let a = { ...array[e], category, contador, sumaRevenues, sumaPorcentaje }
                array.push(a)
            }

            console.log(array)


            for (let i = 0; i < array.length; i++) {
                let tarjeta = document.createElement('tr')
                tarjeta.className = 'tarjeta'
                tarjeta.innerHTML = ` 
                                <td class="td"><strong>${array[i].category}</strong> with ${array[i].contador} Events</td>
                                <td class="td"><strong>$</strong> ${Intl.NumberFormat('de-DE').format(
                                    array[i].sumaRevenues
                                )}</td>
                                <td class="td">${array[i].sumaPorcentaje}<strong>%</strong></td>
                                
                                
                            
                            `

                            idHtmlConteiner.appendChild(tarjeta)
            }
        }

        /*--------------------------------- End Upcoming Events and Past Events Statistics -----------------------------------*/
    })
    .catch((error) => console.error('Error al obtener los datos en Index:', error))
