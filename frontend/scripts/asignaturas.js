/**
 * @file Gestionar Asignaturas
 * @author Miguel Ángel Vélez <https://github.com/mvelezg99>
 * @version 0.1
 * @license MIT
 * 
 * @description Lógica escrita en javascript para el manejo de la página de gestión de asignaturas del 
 * proyecto OCMS Gestión curricular.
 * 
 */


document.getElementById('inputSelectFacultad').onchange = () => {
    refreshSelectProgramaByFacultad()
    document.getElementById('inputSelectPlan').value = ''
    document.getElementById('inputSelectPlan').disabled = true
}

document.getElementById('inputSelectPrograma').onchange = () => {
    refreshSelectPlanByPrograma()
}

document.getElementById('btnFilterAsignaturas').onclick = () => {
    refreshTitleAsignaturas()
}

document.getElementById('selectNewUOC').onchange = () => {
    refreshUOC('selectNewUOC')
}

document.getElementById('selectEditUOC').onchange = () => {
    refreshUOC('selectEditUOC')
}

document.getElementById('selectPreAsignatura').onchange = () => {
    refreshAsignatura()
    currentPrerrequisito = {}
    if (currentAsignatura) {
        if (currentAsignatura.codigo) {
            $("#collapsePrerrequisitos").collapse("show")
            document.getElementById("title-prerrequisitos").innerText = `Prerrequisitos de: ${currentAsignatura.nombre}`
        } else {
            $("#collapsePrerrequisitos").collapse("hide")
            document.getElementById("title-prerrequisitos").innerText = `Prerrequisitos de: `
        }
    } else {
        $("#collapsePrerrequisitos").collapse("hide")
        document.getElementById("title-prerrequisitos").innerText = `Prerrequisitos de: `
    }
    refreshSelectPrerrequisitos()

    document.getElementById("selectPrerrequisitos").classList.remove("is-invalid")

}

document.getElementById('selectPrerrequisitos').onchange = () => {
    refreshPrerrequisito()
}

document.getElementById('addPrerrequisitos').onclick = () => {
    addPrerrequisito()
    refreshAsignatura()
    currentPrerrequisito = {}
    refreshSelectPrerrequisitos()
}

//----------------------------------------- DOM HANDLING -----------------------------------------------------//
/**
 * Functions to handle the HTML elements of "asignaturas.html".
 */

function newCollapse() {
    const newPlan = document.getElementById('newPlan')
    const newPrograma = document.getElementById('newPrograma')

    newPlan.value = currentPlan.codigo
    newPrograma.value = `${currentPrograma.codigo} - ${currentPrograma.nombre}`
    refreshSelectUOC('selectNewUOC')

    $("#collapseNew").collapse("toggle")
    $("#collapseMod").collapse("hide")
    $("#collapseDel").collapse("hide")
    $("#collapsePre").collapse("hide")
}

function editCollapse() {
    const editPlan = document.getElementById('editPlan')
    const editPrograma = document.getElementById('editPrograma')

    editPlan.value = currentPlan.codigo
    editPrograma.value = `${currentPrograma.codigo} - ${currentPrograma.nombre}`
    refreshSelectUOC('selectEditUOC')

    $("#collapseMod").collapse("toggle")
    $("#collapseNew").collapse("hide")
    $("#collapseDel").collapse("hide")
    $("#collapsePre").collapse("hide")
}

function deleteCollapse() {
    $("#collapseDel").collapse("toggle")
    $("#collapseNew").collapse("hide")
    $("#collapseMod").collapse("hide")
    $("#collapsePre").collapse("hide")
}

function preCollapse() {
    refreshSelectAsignatura()

    $("#collapsePre").collapse("toggle")
    $("#collapseNew").collapse("hide")
    $("#collapseMod").collapse("hide")
    $("#collapseDel").collapse("hide")
}

function hideCollapse() {
    $("#collapseNew").collapse("hide")
    $("#collapseMod").collapse("hide")
    $("#collapseDel").collapse("hide")
    $("#collapsePre").collapse("hide")
}

function modClick() {
    const editPlan = document.getElementById('editPlan')
    const editPrograma = document.getElementById('editPrograma')

    editPlan.value = currentPlan.codigo
    editPrograma.value = `${currentPrograma.codigo} - ${currentPrograma.nombre}`
    refreshSelectUOC('selectEditUOC')

    $("#collapseMod").collapse("show")
    $("#collapseNew").collapse("hide")
    $("#collapseDel").collapse("hide")
    $("#collapsePre").collapse("hide")
}

function preClick(){
    refreshSelectAsignatura()
    document.getElementById("selectAsignatura")
    $("#collapsePre").collapse("show")
    $("#collapseMod").collapse("hide")
    $("#collapseNew").collapse("hide")
    $("#collapseDel").collapse("hide")
    
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


function clearFields() {
    const inputs = [...document.getElementsByClassName('form-control')]
    inputs.forEach(input => input.value = "")

    const newPlan = document.getElementById('newPlan')
    const newPrograma = document.getElementById('newPrograma')
    const editPlan = document.getElementById('editPlan')
    const editPrograma = document.getElementById('editPrograma')

    newPlan.value = currentPlan.codigo
    newPrograma.value = `${currentPrograma.codigo} - ${currentPrograma.nombre}`
    editPlan.value = currentPlan.codigo
    editPrograma.value = `${currentPrograma.codigo} - ${currentPrograma.nombre}`
}

async function refreshTableAsignaturas() {
    let asignaturas = await getAsignaturasByProgramaByPlan(currentPrograma.codigo, currentPlan.codigo)
    currentAsignaturas = asignaturas

    let tbody = document.getElementById("asignaturasTable")
    let row = ''

    if (!asignaturas.error) {
        asignaturas.forEach(element => {
            row += '<tr>'
            row += `<td>${element.programa}</td>`
            row += `<td>${element.uoc}</td>`
            row += `<td>${element.plan}</td>`
            row += `<td>${element.codigo}</td>`
            row += `<td>${element.nombre}</td>`
            row += `<td>${element.creditos}</td>`
            row += `<td>${element.nivel}</td>`
            row += `<td>${element.tipo}</td>`
            row += `<td>${element.horasDirectas}</td>`
            row += `<td>${element.horasIndependientes}</td>`
            row += `<td>${element.descripcion}</td>`
            row += `<td><button type="button" class="btn btn-secondary" onclick="preClick()">Prerrequisitos</button></td>`
            row += `<td><button type="button" class="btn btn-info" onclick="editAsignatura('${element.codigo}')">Modificar</button></td>`
            row += `<td><button type="button" class="btn btn-danger" onclick="eliminateAsignatura('${element.codigo}')">Eliminar</button></td>`
            row += '</tr>'

            tbody.innerHTML = row
        })
    } else {
        tbody.innerHTML = ''
    }
}

//-------------------------------------

var currentFacultades = []
var currentFacultad = {}
var currentProgramas = []
var currentPrograma = {}
var currentPlanes = []
var currentPlan = {}


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

async function refreshSelectPlanByPrograma() {
    let inputSelectPrograma = document.getElementById('inputSelectPrograma')
    let inputIndex = inputSelectPrograma.selectedIndex
    currentPrograma = currentProgramas[inputIndex - 1]
    let select = document.getElementById('inputSelectPlan')

    if (inputIndex > 0) {
        let planes = await getPlanesByPrograma(currentPrograma.codigo)
        currentPlanes = planes
        let option = ''

        if (!planes.error) {
            planes.forEach(element => {
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

async function refreshTitleAsignaturas() {
    hideCollapse()
    const titleAsignaturas = document.getElementById('title-asignaturas')
    const inputSelectPlan = document.getElementById('inputSelectPlan')

    let inputIndex = inputSelectPlan.selectedIndex
    currentPlan = currentPlanes[inputIndex]

    let selectPlanes = inputSelectPlan.innerText.split('\n')

    selectPlanes[inputIndex] ? $("#div-filter-asignaturas").collapse("show") : $("#div-filter-asignaturas").collapse("hide")
    titleAsignaturas.innerText = 'Asignaturas de: ' + (selectPlanes[inputIndex] ? selectPlanes[inputIndex] : "")

    refreshTableAsignaturas()
}


//-------------------

var currentUOCs = []
var currentUOC = {}


async function refreshSelectUOC(select) {
    let UOCs = await getUOCsByPrograma(currentPrograma.codigo)
    currentUOCs = UOCs
    let selectUOC = document.getElementById(select)
    let option = '<option></option>'

    if (!UOCs.error) {
        UOCs.forEach(element => {
            option += `<option> ${element.codigo} - ${element.nombre}</option>`
        })
        selectUOC.innerHTML = option
        selectUOC.disabled = false
    } else {
        selectUOC.innerHTML = ''
        selectUOC.disabled = true
    }
}

function refreshUOC(select) {
    let selectUOC = document.getElementById(select)
    let inputIndex = selectUOC.selectedIndex
    currentUOC = currentUOCs[inputIndex - 1]
}

var currentAsignaturas = []
var currentAsignatura = {}

async function refreshSelectAsignatura() {
    let asignaturas = currentAsignaturas
    let selectAsignatura = document.getElementById("selectPreAsignatura")
    let option = '<option></option>'

    if (!asignaturas.error) {
        asignaturas.forEach(element => {
            option += `<option> ${element.codigo} - ${element.nombre}</option>`
        })
        selectAsignatura.innerHTML = option
        selectAsignatura.disabled = false
    } else {
        selectAsignatura.innerHTML = ''
        selectAsignatura.disabled = true
    }
}

function refreshAsignatura() {
    let selectAsignatura = document.getElementById("selectPreAsignatura")
    let inputIndex = selectAsignatura.selectedIndex
    if (inputIndex > 0) {
        currentAsignatura = currentAsignaturas[inputIndex - 1]
    } else {
        currentAsignatura = {}
    }
}

var currentPrerrequisitos = []
var currentPrerrequisito = {}

async function refreshSelectPrerrequisitos() {
    await refreshListPrerrequisitos()
    let prerrequisitos = currentAsignaturas.filter(element => element.nivel < currentAsignatura.nivel)
    currentPrerrequisitos = prerrequisitos


    if (!prerrequisitosAsignatura.error) {
        //const prerrequisitosAsignaturaCod = prerrequisitosAsignatura.map(element => element.codigo)
        //prerrequisitos = currentPrerrequisitos.filter(element => !prerrequisitosAsignaturaCod.includes(element.codigo))

        prerrequisitos = currentPrerrequisitos.filter(element => {
            return !prerrequisitosAsignatura.some(element2 => {
                return element.codigo == element2.codigo
            })
        })
    }

    currentPrerrequisitos = prerrequisitos

    let selectPrerrequisitos = document.getElementById("selectPrerrequisitos")
    let option = '<option></option>'

    if (!prerrequisitos.error && prerrequisitos.length) {
        prerrequisitos.forEach(element => {
            option += `<option> ${element.codigo} - ${element.nombre}</option>`
        })
        selectPrerrequisitos.innerHTML = option
        selectPrerrequisitos.disabled = false
    } else {
        selectPrerrequisitos.innerHTML = ''
        selectPrerrequisitos.disabled = true
    }
}

function refreshPrerrequisito() {
    let selectPrerrequisito = document.getElementById("selectPrerrequisitos")
    let inputIndex = selectPrerrequisito.selectedIndex
    if (inputIndex > 0) {
        currentPrerrequisito = currentPrerrequisitos[inputIndex - 1]
    } else {
        currentPrerrequisito = {}
    }

}

var prerrequisitosAsignatura = []

async function refreshListPrerrequisitos() {
    prerrequisitosAsignatura = await getPrerrequisitosByAsignatura(currentAsignatura.codigo)
    let ul = document.getElementById("listPrerrequisitos")
    let li = ''

    if (!prerrequisitosAsignatura.error) {
        prerrequisitosAsignatura.forEach(element => {
            li += '<li class="list-group-item d-flex justify-content-between align-items-center">'
            li += `${element.nombre} - ${element.codigo} - Nivel: ${element.nivel}`
            li += `<button class="btn btn-danger" onclick="removePrerrequisito(${element.id})">Eliminar</button>`
            li += '</li>'

            ul.innerHTML = li
        })
    } else {
        ul.innerHTML = ''
    }
}
//--------------------------

async function addPrerrequisito() {
    let asignatura = currentAsignatura.codigo
    let prerrequisito = currentPrerrequisito.codigo

    let selectPrerrequisito = document.getElementById('selectPrerrequisitos')

    if (selectPrerrequisito.value == "") {
        selectPrerrequisito.classList.add("is-invalid")
        makeAlert("alertWarning")
    } else {
        selectPrerrequisito.classList.remove("is-invalid")
        
        let asignaturaPrerrequisito = {
            asignatura: asignatura,
            prerrequisito: prerrequisito
        }

        await postPrerrequisito(asignaturaPrerrequisito)

        refreshListPrerrequisitos()
        clearFields()
    }
}

async function removePrerrequisito(id){
    await deletePrerrequisito(id)

    refreshAsignatura()
    currentPrerrequisito = {}
    refreshSelectPrerrequisitos()
}

//--------------------------

async function addAsignatura() {
    let programa = currentPrograma.codigo
    let uoc = currentUOC.codigo
    let plan = currentPlan.codigo
    let codigo = document.getElementById("newID").value
    let nombre = document.getElementById("newNombre").value
    let creditos = document.getElementById("newCreditos").value
    let nivel = document.getElementById("newNivel").value
    let tipo = document.getElementById("newTipo").value
    let horasDirectas = document.getElementById("newHorasDirectas").value
    let horasIndependientes = document.getElementById("newHorasIndependientes").value
    let descripcion = document.getElementById("newDescripcion").value

    if (validateForm('form-nuevo')) {
        let asignatura = {
            programa: programa,
            uoc: uoc,
            plan: plan,
            codigo: codigo,
            nombre: nombre,
            creditos: creditos,
            nivel: nivel,
            tipo: tipo,
            horasDirectas: horasDirectas,
            horasIndependientes: horasIndependientes,
            descripcion: descripcion
        }

        await postAsignatura(asignatura)

        refreshTableAsignaturas()
        clearFields()

    }
}

async function updateAsignatura() {
    let programa = currentPrograma.codigo
    let uoc = currentUOC.codigo
    let plan = currentPlan.codigo
    let codigo = document.getElementById("editID").value
    let nombre = document.getElementById("editNombre").value
    let creditos = document.getElementById("editCreditos").value
    let nivel = document.getElementById("editNivel").value
    let tipo = document.getElementById("editTipo").value
    let horasDirectas = document.getElementById("editHorasDirectas").value
    let horasIndependientes = document.getElementById("editHorasIndependientes").value
    let descripcion = document.getElementById("editDescripcion").value

    if (validateForm('form-modificar')) {

        let modifiedAsignatura = {
            programa: programa,
            uoc: uoc,
            plan: plan,
            codigo: codigo,
            nombre: nombre,
            creditos: creditos,
            nivel: nivel,
            tipo: tipo,
            horasDirectas: horasDirectas,
            horasIndependientes: horasIndependientes,
            descripcion: descripcion
        }

        console.log(modifiedAsignatura)

        await putAsignatura(codigo, modifiedAsignatura)

        refreshTableAsignaturas()
        clearFields()
    }
}

async function removeAsignatura() {
    let codigo = document.getElementById('deleteID').value

    if (validateForm('form-delete')) {
        await deleteAsignaturaByProgramaByPlan(currentPrograma.codigo, currentPlan.codigo, codigo)

        refreshTableAsignaturas()
        clearFields()
    }
}

async function eliminateAsignatura(codigo) {
    await deleteAsignaturaByProgramaByPlan(currentPrograma.codigo, currentPlan.codigo, codigo)

    refreshTableAsignaturas()
    clearFields()
}

async function editAsignatura(codigo) {
    let asignatura = await getAsignaturaByProgramaByPlan(currentPrograma.codigo, currentPlan.codigo, codigo)
    modClick()

    refreshSelectUOC('selectEditUOC')
    document.getElementById("editID").value = asignatura[0].codigo
    document.getElementById("editNombre").value = asignatura[0].nombre
    document.getElementById("editCreditos").value = asignatura[0].creditos
    document.getElementById("editNivel").value = asignatura[0].nivel
    document.getElementById("editTipo").value = asignatura[0].tipo
    document.getElementById("editHorasDirectas").value = asignatura[0].horasDirectas
    document.getElementById("editHorasIndependientes").value = asignatura[0].horasIndependientes
    document.getElementById("editDescripcion").value = asignatura[0].descripcion
}


//-----------------

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

async function getUOCsByPrograma(codigoPrograma) {
    let url = `${root}/uocs/programa/${codigoPrograma}`

    const uocs = await fetch(url, {
        method: 'GET'
    })
        .then(res => res.json())
        .catch(error => console.log(error))

    return uocs
}

async function getAsignaturasByProgramaByPlan(codigoPrograma, codigoPlan) {
    let url = `${root}/asignaturas/programa/${codigoPrograma}/plan/${codigoPlan}`

    const asignaturas = await fetch(url, {
        method: 'GET'
    })
        .then(res => res.json())
        .catch(error => console.log(error))

    return asignaturas
}

async function getAsignaturaByProgramaByPlan(codigoPrograma, codigoPlan, codigoAsignatura) {
    let url = `${root}/asignaturas/programa/${codigoPrograma}/plan/${codigoPlan}/asignatura/${codigoAsignatura}`

    const asignatura = await fetch(url, {
        method: 'GET'
    })
        .then(res => res.json())
        .catch(error => console.log(error))

    return asignatura
}

async function postAsignatura(asignatura) {
    let url = `${root}/asignaturas`

    await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(asignatura)
    })
        .then(res => res.ok ? makeAlert("alertSuccess") : makeAlert("alertDanger"))
        .catch(error => console.log(error))
}

async function putAsignatura(codigo, modifiedAsignatura) {
    let url = `${root}/asignaturas/${codigo}`

    await fetch(url, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(modifiedAsignatura)
    })
        .then(res => res.ok ? makeAlert('alertSuccess') : makeAlert('alertDanger'))
        .catch(error => console.log(error))
}

async function deleteAsignaturaByProgramaByPlan(codigoPrograma, codigoPlan, codigoAsignatura) {
    let url = `${root}/asignaturas/programa/${codigoPrograma}/plan/${codigoPlan}/asignatura/${codigoAsignatura}`

    await fetch(url, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' }
    })
        .then(res => res.ok ? makeAlert('alertSuccess') : makeAlert('alertDanger'))
        .catch(error => console.log(error))
}

async function getPrerrequisitosByAsignatura(codigoAsignatura) {
    let url = `${root}/prerrequisitos/asignatura/${codigoAsignatura}`

    const prerrequisitos = await fetch(url, {
        method: 'GET'
    })
        .then(res => res.json())
        .catch(error => console.log(error))

    return prerrequisitos
}

async function postPrerrequisito(asignaturaPrerrequisito){
    let url = `${root}/prerrequisitos`

    await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(asignaturaPrerrequisito)
    })
        .then(res => res.ok ? makeAlert("alertSuccess") : makeAlert("alertDanger"))
        .catch(error => console.log(error))
}

async function deletePrerrequisito(id){
    let url = `${root}/prerrequisitos/${id}`

    await fetch(url, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' }
    })
        .then(res => res.ok ? makeAlert('alertSuccess') : makeAlert('alertDanger'))
        .catch(error => console.log(error))
}


//------------------------------------------------------------------------------------------------------------//

refreshSelectFacultad()


