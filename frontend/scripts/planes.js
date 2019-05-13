/**
 * 
 */

function hideCollapse() {
    $("#collapseNew").collapse("hide")
    $("#collapseMod").collapse("hide")
    $("#collapseDel").collapse("hide")
}

function newCollapse() {
    hideCollapse()
    const newPrograma = document.getElementById("newPrograma")
    newPrograma.value = currentPrograma.codigo

    $("#collapseNew").collapse("toggle")
}

function editCollapse() {
    hideCollapse()
    const editPrograma = document.getElementById("editPrograma")
    editPrograma.value = currentPrograma.codigo

    $("#collapseMod").collapse("toggle")
}

function deleteCollapse() {
    hideCollapse()
    $("#collapseDel").collapse("toggle")
}

function modClick() {
    $("#collapseMod").collapse("show")
    $("#collapseNew").collapse("hide")
    $("#collapseDel").collapse("hide")
}

function validateForm(className) {
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


var currentFacultades = []
var currentFacultad = {}
var currentProgramas = []
var currentPrograma = {}

async function refreshSelectFacultad() {
    let facultades = await getFacultades()
    currentFacultades = facultades
    let select = document.getElementById('inputSelectFacultad')
    let option = '<option></option>'

    if (facultades) {
        facultades.forEach(element => {
            option += `<option> ${element.codigo} - ${element.nombre}</option>`
        })
        select.innerHTML = option
    }
}

async function refreshSelectProgramaByFacultad() {
    let inputSelectFacultad = document.getElementById('inputSelectFacultad')
    let inputIndex = inputSelectFacultad.selectedIndex
    currentFacultad = currentFacultades[inputIndex - 1]
    let select = document.getElementById('inputSelectPrograma')

    if (inputIndex) {
        let programas = await getProgramasByFacultad(currentFacultad.codigo)
        currentProgramas = programas
        let option = ''

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

async function refreshTitlePlanes() {
    hideCollapse()
    const titlePlanes = document.getElementById('title-planes')
    const inputSelectPrograma = document.getElementById('inputSelectPrograma')

    let inputIndex = inputSelectPrograma.selectedIndex
    currentPrograma = currentProgramas[inputIndex]

    let selectProgramas = inputSelectPrograma.innerText.split('\n')

    selectProgramas[inputIndex] ? $("#div-filter-planes").collapse("show") : $("#div-filter-planes").collapse("hide")
    titlePlanes.innerText = 'Planes de formación de: ' + (selectProgramas[inputIndex] ? selectProgramas[inputIndex] : "")

    await refreshTablePlanes()
}

async function refreshTablePlanes() {
    let planes = await getPlanesByPrograma(currentPrograma.codigo)
    let tbody = document.getElementById('planesTable')
    let row = ''

    if (!planes.error) {
        planes.forEach(element => {
            row += '<tr>'
            row += `<td>${element.codigo}</td>`
            row += `<td>${element.nombre}</td>`
            row += `<td>${element.programa}</td>`
            row += `<td>${element.numeroAcuerdo}</td>`
            row += `<td>${element.semestreInicio}</td>`
            row += `<td>${element.semestreVigencia}</td>`
            row += `<td>${element.rutaActa}</td>`
            row += `<td>${element.rutaImagen}</td>`
            row += `<td><a href="asignaturas.html" class="btn btn-warning">Asignaturas</td>`
            row += `<td><button type="button" class="btn btn-info" onclick="editPlan('${element.codigo}')">Modificar</button></td>`
            row += `<td><button type="button" class="btn btn-danger" onclick="eliminatePlan('${element.codigo}')">Eliminar</button></td>`
            row += '</tr>'

            tbody.innerHTML = row
        })
    } else {
        tbody.innerHTML = ''
    }
}

function clearFields() {
    const inputs = [...document.getElementsByClassName('form-control')]
    inputs.forEach(input => input.value = "")

    const newPrograma = document.getElementById("newPrograma")
    const editPrograma = document.getElementById("editPrograma")

    newPrograma.value = currentPrograma.codigo
    editPrograma.value = currentPrograma.codigo
}



async function addPlan() {
    let codigo = document.getElementById("newID").value
    let nombre = document.getElementById("newNombre").value
    let programa = document.getElementById("newPrograma").value
    let numeroAcuerdo = document.getElementById("newAcuerdo").value
    let semestreInicio = document.getElementById("newSemestreInicio").value
    let semestreVigencia = document.getElementById("newSemestreVigencia").value
    let rutaActa = document.getElementById("newRutaActa").value
    let rutaImagen = document.getElementById("newRutaImagen").value


    if (validateForm('form-nuevo')) {
        let plan = {
            codigo: codigo,
            nombre: nombre,
            programa: programa,
            numeroAcuerdo: numeroAcuerdo,
            semestreInicio: semestreInicio,
            semestreVigencia: semestreVigencia,
            rutaActa: rutaActa,
            rutaImagen: rutaImagen
        }

        await postPlan(plan)

        refreshTablePlanes()
        clearFields()
    }
}


async function updatePlan() {
    let codigo = document.getElementById("editID").value
    let nombre = document.getElementById("editNombre").value
    let programa = document.getElementById("editPrograma").value
    let numeroAcuerdo = document.getElementById("editAcuerdo").value
    let semestreInicio = document.getElementById("editSemestreInicio").value
    let semestreVigencia = document.getElementById("editSemestreVigencia").value
    let rutaActa = document.getElementById("editRutaActa").value
    let rutaImagen = document.getElementById("editRutaImagen").value


    if (validateForm('form-modificar')) {

        let modifiedPlan = {
            codigo: codigo,
            nombre: nombre,
            programa: programa,
            numeroAcuerdo: numeroAcuerdo,
            semestreInicio: semestreInicio,
            semestreVigencia: semestreVigencia,
            rutaActa: rutaActa,
            rutaImagen: rutaImagen
        }

        await putPlan(codigo, modifiedPlan)

        refreshTablePlanes()
        clearFields()
    }
}

async function removePlan() {
    let codigo = document.getElementById('deleteID').value

    if (validateForm('form-delete')) {
        await deletePlan(codigo)

        refreshTablePlanes()
        clearFields()
    }
}


async function eliminatePlan(codigo) {
    await deletePlan(codigo)

    refreshTablePlanes()
    clearFields()
}



async function editPlan(codigo) {
    let plan = await getPlan(codigo)
    modClick()


    document.getElementById("editID").value = plan[0].codigo
    document.getElementById("editNombre").value = plan[0].nombre
    document.getElementById("editPrograma").value = plan[0].programa
    document.getElementById("editAcuerdo").value = plan[0].numeroAcuerdo
    document.getElementById("editSemestreInicio").value = plan[0].semestreInicio
    document.getElementById("editSemestreVigencia").value = plan[0].semestreVigencia
    document.getElementById("editRutaActa").value = plan[0].rutaActa
    document.getElementById("editRutaImagen").value = plan[0].rutaImagen

}






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

async function getProgramasByFacultad(codigoFacultad) {
    let url = `${root}/programas/facultad/${codigoFacultad}`

    const programas = await fetch(url, {
        method: 'GET'
    })
        .then(res => res.json())
        .catch(error => console.log(error))

    return programas
}

async function getPlanesByPrograma(codigoPrograma) {

    let url = `${root}/planes/programa/${codigoPrograma}`

    const planes = await fetch(url, {
        method: 'GET'
    })
        .then(res => res.json())
        .catch(error => console.log(error))

    return planes
}

async function getPlan(codigo) {
    let url = `${root}/planes/${codigo}`

    const plan = await fetch(url, {
        method: 'GET'
    })
        .then(res => res.json())
        .catch(error => console.log(error))

    return plan
}

async function postPlan(plan) {
    let url = `${root}/planes`

    await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(plan)
    })
        .then(res => res.ok ? makeAlert("alertSuccess") : makeAlert("alertDanger"))
        .catch(error => console.log(error))
}

async function putPlan(codigo, modifiedPlan) {
    let url = `${root}/planes/${codigo}`

    await fetch(url, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(modifiedPlan)
    })
        .then(res => res.ok ? makeAlert('alertSuccess') : makeAlert('alertDanger'))
        .catch(error => console.log(error))
}

async function deletePlan(codigo) {
    let url = `${root}/planes/${codigo}`

    await fetch(url, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' }
    })
        .then(res => res.ok ? makeAlert('alertSuccess') : makeAlert('alertDanger'))
        .catch(error => console.log(error))
}


refreshSelectFacultad()
