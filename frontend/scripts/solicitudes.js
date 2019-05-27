
//------------

document.getElementById('select-facultad').onchange = () => {
    refreshSelectProgramaByFacultad()
    document.getElementById('select-uoc').value = ''
    document.getElementById('select-uoc').disabled = true

    document.getElementById('select-asignatura').value = ''
    document.getElementById('select-asignatura').disabled = true

    document.getElementById('select-docente').value = ''
    document.getElementById('select-docente').disabled = true
}

document.getElementById('select-programa').onchange = () => {
    refreshSelectUOCByPrograma()

    document.getElementById('select-asignatura').value = ''
    document.getElementById('select-asignatura').disabled = true

    document.getElementById('select-docente').value = ''
    document.getElementById('select-docente').disabled = true
}

document.getElementById('select-uoc').onchange = () => {
    refreshSelectAsignaturasByUOCs()
    refreshtSelectDocenteByUOC()
}

document.getElementById('select-asignatura').onchange = () => {
    selectAsignatura()
}

document.getElementById('select-docente').onchange = () => {
    selectDocente()
}

document.getElementById('btn-crear').onclick = () => {
    createSolicitud()

    document.getElementById('select-uoc').value = ''
    document.getElementById('select-uoc').disabled = true

    document.getElementById('select-asignatura').value = ''
    document.getElementById('select-asignatura').disabled = true

    document.getElementById('select-programa').value = ''
    document.getElementById('select-programa').disabled = true

    document.getElementById('select-docente').value = ''
    document.getElementById('select-docente').disabled = true
}


//------
function makeAlert(alertID) {
    const alert = document.getElementById(alertID)
    alert.style.display = 'block'
    alert.style.opacity = '1'

    setTimeout(() => {
        alert.style.opacity = '0'
        setTimeout(() => {
            alert.style.display = 'none'
        }, 1000)
    }, 2000)
}

function validateForm(className) {
    validateDate()

    const inputs = [...document.getElementsByClassName(className)]

    let isValid = true
    inputs.forEach((input) => {
        if (!input.value) {
            input.classList.add("is-invalid")
            makeAlert("alertWarning")
            isValid = false
        } else {
            input.classList.remove("is-invalid")
        }
    })
    return isValid
}

function validateDate() {
    const newDate = document.getElementById('new-date')

    let splitted = newDate.value.split('-')

    let date = new Date(splitted[0], parseInt(splitted[1]) - 1, splitted[2], 23, 59, 59)

    let todaysDate = new Date()

    if (date >= todaysDate) {
        newDate.classList.remove("is-invalid")

    } else {
        newDate.classList.add("is-invalid")
    }
}

function clearFields() {
    const inputs = [...document.getElementsByClassName('form-solicitud')]
    inputs.forEach(input => input.value = "")
}

//---

async function refreshTableMicrocurriculos(){
    let microcurriculos = await getMicrocurriculos()

    let tbody = document.getElementById("microcurriculos-table")
    let row = ''

    if (!microcurriculos.error) {
        microcurriculos.forEach(element => {
            row += '<tr>'
            row += `<td>${element.codigo}</td>`
            row += `<td>${element.asignatura}</td>`
            row += `<td>${element.version}</td>`
            row += `<td>${element.estado}</td>`
            row += '</tr>'

            tbody.innerHTML = row
        })
    } else {
        tbody.innerHTML = ''
    }
}

async function refreshTableParticipaciones(){
    let participaciones = await getParticipaciones()

    let tbody = document.getElementById("participaciones-table")
    let row = ''

    if (!participaciones.error) {
        participaciones.forEach(element => {
            row += '<tr>'
            row += `<td>${element.codigo}</td>`
            row += `<td>${element.participante}</td>`
            row += `<td>${element.tipo}</td>`
            row += `<td>${element.estado}</td>`
            row += `<td>${element.fecha}</td>`
            row += `<td>${element.observaciones}</td>`
            row += '</tr>'

            tbody.innerHTML = row
        })
    } else {
        tbody.innerHTML = ''
    }
}


//----
var currentFacultades = []
var currentFacultad = {}

var currentProgramas = []
var currentPrograma = {}

var currentUOCs = []
var currentUOC = {}

var currentAsignaturas = []
var currentAsignatura = {}

var currentDocentes = []
var currentDocente = {}

async function refreshSelectFacultad() {
    currentFacultades = await getFacultades()

    let select = document.getElementById('select-facultad')
    let option = '<option></option>'

    if (currentFacultades) {
        currentFacultades.forEach(element => {
            option += `<option> ${element.codigo} - ${element.nombre}</option>`
        })
        select.innerHTML = option
    }
}

async function refreshSelectProgramaByFacultad() {
    let inputSelectFacultad = document.getElementById('select-facultad')
    let inputIndex = inputSelectFacultad.selectedIndex
    currentFacultad = currentFacultades[inputIndex - 1]
    let select = document.getElementById('select-programa')

    if (inputIndex) {
        let programas = await getProgramasByFacultad(currentFacultad.codigo)
        currentProgramas = programas
        let option = '<option></option>'

        if (!programas.error && inputIndex) {
            programas.forEach(element => {
                option += `<option>${element.nombre}</option>`
            })
            select.innerHTML = option
            select.disabled = false
        } else {
            option += '<option></option>'
            select.innerHTML = ''
            select.disabled = true
        }
    } else {
        select.innerHTML = ''
        select.disabled = true
    }
}

async function refreshSelectUOCByPrograma() {
    let inputSelectPrograma = document.getElementById('select-programa')
    let inputIndex = inputSelectPrograma.selectedIndex
    currentPrograma = currentProgramas[inputIndex - 1]
    let select = document.getElementById('select-uoc')

    if (inputIndex) {
        let UOCs = await getUOCsByPrograma(currentPrograma.codigo)
        currentUOCs = UOCs
        let option = '<option></option>'

        if (!UOCs.error && inputIndex) {
            UOCs.forEach(element => {
                option += `<option>${element.codigo} - ${element.nombre}</option>`
            })
            select.innerHTML = option
            select.disabled = false
        } else {
            option += '<option></option>'
            select.innerHTML = ''
            select.disabled = true
        }
    } else {
        select.innerHTML = ''
        select.disabled = true
    }
}

async function refreshSelectAsignaturasByUOCs() {
    let inputSelectUOC = document.getElementById('select-uoc')
    let inputIndex = inputSelectUOC.selectedIndex
    currentUOC = currentUOCs[inputIndex - 1]
    let select = document.getElementById('select-asignatura')

    if (inputIndex) {
        let asignaturas = await getAsignaturasByUOC(currentUOC.codigo)
        currentAsignaturas = asignaturas
        let option = '<option></option>'


        if (!asignaturas.error && inputIndex) {
            asignaturas.forEach(element => {
                option += `<option>${element.codigo} - ${element.nombre}</option>`
            })
            select.innerHTML = option
            select.disabled = false
        } else {
            option += '<option></option>'
            select.innerHTML = ''
            select.disabled = true
        }
    } else {
        select.innerHTML = ''
        select.disabled = true
    }
}

async function refreshtSelectDocenteByUOC() {
    let inputSelectUOC = document.getElementById('select-uoc')
    let inputIndex = inputSelectUOC.selectedIndex
    currentUOC = currentUOCs[inputIndex - 1]
    let select = document.getElementById('select-docente')

    if (inputIndex) {
        let docentes = await getDocentesByUOC(currentUOC.codigo)
        currentDocentes = docentes
        let option = '<option></option>'


        if (!docentes.error && inputIndex) {
            docentes.forEach(element => {
                option += `<option>${element.nombre} - ${element.correo}</option>`
            })
            select.innerHTML = option
            select.disabled = false
        } else {
            option += '<option></option>'
            select.innerHTML = ''
            select.disabled = true
        }
    } else {
        select.innerHTML = ''
        select.disabled = true
    }
}

async function selectAsignatura() {
    const selectAsignatura = document.getElementById('select-asignatura')

    let inputIndex = selectAsignatura.selectedIndex
    currentAsignatura = currentAsignaturas[inputIndex - 1]
}

async function selectDocente() {
    const selectDocente = document.getElementById('select-docente')

    let inputIndex = selectDocente.selectedIndex
    currentDocente = currentDocentes[inputIndex - 1]
}


//---

async function createSolicitud() {
    let fecha = document.getElementById('new-date').value
    let version = document.getElementById('new-version').value
    let observaciones = document.getElementById('new-observaciones').value
    let asignatura = currentAsignatura.codigo
    let docente = currentDocente.codigo

    if (validateForm('form-solicitud')) {
        let microcurriculo = {
            asignatura: asignatura,
            version: version,
            estado: "En construcción"
        }
        let participacion = {
            participante: docente,
            tipo: "Solicitud",
            estado: "Asignada",
            fecha: fecha,
            observaciones: observaciones
        }
        let email = {
            mail: currentDocente.correo,
            subject: "Notificación de participación",
            text: `Te han solicitado para la participación en la creación del microcurrículo de la asignatura ${currentAsignatura.nombre}. \nSigue éste enlace para participar: http://www.ocms-gc.com/microcurriculos`
        }
        let notificacion = {
            usuario: docente,
            evento: "Participación en diseño de microcurrículo",
            fecha: fecha,
            titulo: "Notificación de participación",
            cuerpo: `Te han solicitado para la participación en la creación del microcurrículo de la asignatura ${currentAsignatura.nombre}. \nSigue éste enlace para participar: http://www.ocms-gc.com/microcurriculos`,
            tipo: "Solicitud"
        }

        await postMicrocurriculo(microcurriculo)
        await postParticipacion(participacion)
        await postSendEmail(email)
        await postNotificacion(notificacion)

        refreshTableMicrocurriculos()
        refreshTableParticipaciones()
        clearFields()
    }
}


//----
var root = "http://localhost:3000"

async function getFacultades() {
    let url = `${root}/facultades`

    const facultades = await fetch(url, {
        method: 'GET'
    })
        .then(res => res.json())
        .catch(error => console.log(error))

    return facultades
}

async function getMicrocurriculos(){
    let url = `${root}/microcurriculos`

    const microcurriculos = await fetch(url, {
        method: 'GET'
    })
        .then(res => res.json())
        .catch(error => console.log(error))

    return microcurriculos
}

async function getParticipaciones(){
    let url = `${root}/participaciones`

    const participaciones = await fetch(url, {
        method: 'GET'
    })
        .then(res => res.json())
        .catch(error => console.log(error))

    return participaciones
}

async function getProgramasByFacultad(codigoFacultad) {
    let url = `${root}/programas/facultad/${codigoFacultad}`

    const programas = await fetch(url, {
        method: 'GET'
    })
        .then(res => res.json())
        .catch(error => console.log(error))

    return programas
}

async function getUOCsByPrograma(codigoPrograma) {
    let url = `${root}/uocs/programa/${codigoPrograma}`

    const uocs = await fetch(url, {
        method: 'GET'
    })
        .then(res => res.json())
        .catch(error => console.log(error))

    return uocs
}

async function getAsignaturasByUOC(codigoUOC) {
    let url = `${root}/asignaturas/uoc/${codigoUOC}`


    const asignaturas = await fetch(url, {
        method: 'GET'
    })
        .then(res => res.json())
        .catch(error => console.log(error))

    return asignaturas
}

async function getDocentesByUOC(codigoUOC) {
    let url = `${root}/docentes/uoc/${codigoUOC}`


    const docentes = await fetch(url, {
        method: 'GET'
    })
        .then(res => res.json())
        .catch(error => console.log(error))

    return docentes
}

async function postMicrocurriculo(microcurriculo) {
    let url = `${root}/microcurriculos`

    await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(microcurriculo)
    })
    .then(res => res.ok ? makeAlert('alertSuccess') : makeAlert('alertDanger'))
    .catch(error => console.log(error))
}

async function postParticipacion(participacion) {
    let url = `${root}/participaciones`

    await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(participacion)
    })
    .then(res => res.ok ? makeAlert('alertSuccess') : makeAlert('alertDanger'))
    .catch(error => console.log(error))
}

async function postSendEmail(email) {
    let url = `${root}/notificaciones/sendemail`

    await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(email)
    })
    .then(res => res.ok ? makeAlert('alertSuccess') : makeAlert('alertDanger'))
    .catch(error => console.log(error))
}

async function postNotificacion(notificacion){
    let url = `${root}/notificaciones`

    await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(notificacion)
    })
    .then(res => res.ok ? makeAlert('alertSuccess') : makeAlert('alertDanger'))
    .catch(error => console.log(error))
}

//------------
refreshSelectFacultad()
refreshTableMicrocurriculos()
refreshTableParticipaciones()