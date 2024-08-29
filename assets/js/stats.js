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
            console.log(newEventsAssistance);

            //  Obtenemos el valor de porcentaje a buscar si es mayor o menor
            if (signo === 'mayor') {
                let assistanceSigno = newEventsAssistance.reduce((prev, cur) =>
                    cur.porcentaje > prev.porcentaje ? cur : prev
                )
                console.log(assistanceSigno)
                vistaDOM(assistanceSigno)
            }else if (signo === 'menor') {
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
    })
    .catch((error) => console.error('Error al obtener los datos en Index:', error))
