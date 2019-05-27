
async function refreshTableNotificaciones() {
    let notificaciones = await getNotificaciones()
    let tbody = document.getElementById('notificaciones-table')
    let row = ''

    if (!notificaciones.error) {
        notificaciones.forEach(element => {
            row += '<tr>'
            row += `<td>${element.usuario}</td>`
            row += `<td>${element.evento}</td>`
            row += `<td>${element.codigo}</td>`
            row += `<td>${element.fecha}</td>`
            row += `<td>${element.titulo}</td>`
            row += `<td>${element.cuerpo}</td>`
            row += `<td>${element.tipo}</td>`
            row += '</tr>'

            tbody.innerHTML = row
        })
    } else {
        tbody.innerHTML = ''
    }
}

async function getNotificaciones(){
    let url = "http://localhost:3000/notificaciones"

    const notificaciones = await fetch(url, { method: 'GET' })
        .then(res => res.json())
        .catch(error => console.log(error))

    return notificaciones
}

refreshTableNotificaciones()