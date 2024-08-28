//  Url con la Información
const url = 'https://mindhub-xj03.onrender.com/api/amazing'

const data = fetch(url)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })

console.log(data)
