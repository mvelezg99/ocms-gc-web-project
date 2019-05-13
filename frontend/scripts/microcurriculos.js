
//------------------------
function hideCollapse() {
    $("#collapseNew").collapse("hide")
    $("#collapseMod").collapse("hide")
    $("#collapseDel").collapse("hide")
}

function newCollapse() {
    hideCollapse()

    $("#collapseNew").collapse("toggle")
}

function editCollapse() {
    hideCollapse()

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

function clearFields() {
    const inputs = [...document.getElementsByClassName('form-control')]
    inputs.forEach(input => input.value = "")

    const newID = document.getElementById('newID')

    newID.value = 'Código'
}

//---------------------

var currentCaracteristicas = []

async function refreshTableCaracteristicas() {
    let caracteristicas = await getCaracteristicas()
    let tbody = document.getElementById('caracteristicasTable')
    let row = ''

    if (!caracteristicas.error) {
        caracteristicas.forEach(element => {
            row += '<tr>'
            row += `<td>${element.codigo}</td>`
            row += `<td>${element.nombre}</td>`
            row += `<td>${element.descripcion}</td>`
            row += `<td>${element.tipo}</td>`
            row += `<td>${element.estado}</td>`
            row += `<td>${element.sesionesDirectas}</td>`
            row += `<td>${element.sesionesIndirectas}</td>`
            row += `<td>${element.espacio}</td>`
            row += `<td>${element.grupo}</td>`
            row += `<td>${element.medios}</td>`
            row += `<td>${element.producto}</td>`
            row += `<td>${element.evaluacion}</td>`
            row += `<td><button type="button" class="btn btn-info" onclick="editCaracteristica('${element.codigo}')">Modificar</button></td>`
            row += `<td><button type="button" class="btn btn-danger" onclick="eliminateCaracteristica('${element.codigo}')">Eliminar</button></td>`
            row += '</tr>'

            tbody.innerHTML = row
        })
    } else {
        tbody.innerHTML = ''
    }
}

async function addCaracteristica() {
    let nombre = document.getElementById('newNombre').value
    let descripcion = document.getElementById('newDescripcion').value
    let tipo = document.getElementById('newTipo').value
    let estado = document.getElementById('newEstado').value
    let sesionesDirectas = document.getElementById('newSesionesDirectas').value
    let sesionesIndirectas = document.getElementById('newSesionesIndirectas').value
    let espacio = document.getElementById('newEspacio').value
    let grupo = document.getElementById('newGrupo').value
    let medios = document.getElementById('newProducto').value
    let producto = document.getElementById('newProducto').value
    let evaluacion = document.getElementById('newEvaluacion').value

    if (validateForm('form-nuevo')) {
        let caracteristica = {
            nombre,
            descripcion,
            tipo,
            estado,
            sesionesDirectas,
            sesionesIndirectas,
            espacio,
            grupo,
            medios,
            producto,
            evaluacion
        }
        await postCaracteristica(caracteristica)
        refreshTableCaracteristicas()
        clearFields()
    }
}

async function updateCaracteristica() {
    let codigo = document.getElementById('editID').value
    let nombre = document.getElementById('editNombre').value
    let descripcion = document.getElementById('editDescripcion').value
    let tipo = document.getElementById('editTipo').value
    let estado = document.getElementById('editEstado').value
    let sesionesDirectas = document.getElementById('editSesionesDirectas').value
    let sesionesIndirectas = document.getElementById('editSesionesIndirectas').value
    let espacio = document.getElementById('editEspacio').value
    let grupo = document.getElementById('editGrupo').value
    let medios = document.getElementById('editProducto').value
    let producto = document.getElementById('editProducto').value
    let evaluacion = document.getElementById('editEvaluacion').value


    if (validateForm('form-modificar')) {
        let modifiedCaracteristica = {
            nombre,
            descripcion,
            tipo,
            estado,
            sesionesDirectas,
            sesionesIndirectas,
            espacio,
            grupo,
            medios,
            producto,
            evaluacion
        }

        await putCaracteristica(codigo, modifiedCaracteristica)

        refreshTableCaracteristicas()
        clearFields()
    }
}

async function removeCaracteristica() {
    let codigo = document.getElementById('deleteID').value

    if (validateForm('form-delete')) {
        await deleteCaracteristica(codigo)

        refreshTableCaracteristicas()
        clearFields()
    }
}

async function eliminateCaracteristica(codigo){
    await deleteCaracteristica(codigo)

    refreshTableCaracteristicas()
    clearFields()
}

async function editCaracteristica(codigo){
    let caracteristica = await getCaracteristica(codigo)
    modClick()

    document.getElementById('editID').value = caracteristica[0].codigo
    document.getElementById('editNombre').value = caracteristica[0].nombre
    document.getElementById('editDescripcion').value = caracteristica[0].descripcion
    document.getElementById('editTipo').value = caracteristica[0].tipo
    document.getElementById('editEstado').value = caracteristica[0].estado
    document.getElementById('editSesionesDirectas').value = caracteristica[0].sesionesDirectas
    document.getElementById('editSesionesIndirectas').value = caracteristica[0].sesionesIndirectas
    document.getElementById('editEspacio').value = caracteristica[0].espacio
    document.getElementById('editGrupo').value = caracteristica[0].grupo
    document.getElementById('editMedios').value = caracteristica[0].medios
    document.getElementById('editProducto').value = caracteristica[0].producto
    document.getElementById('editEvaluacion').value = caracteristica[0].evaluacion
}




//-------------------

var root = "http://localhost:3000"

async function getCaracteristicas() {
    let url = `${root}/caracteristicas`

    const caracteristicas = await fetch(url, { method: 'GET' })
        .then(res => res.json())
        .catch(error => console.log(error))

    return caracteristicas
}

async function getCaracteristica(codigo){
    let url = `${root}/caracteristicas/${codigo}`

    const caracteristica = await fetch(url,{
        method: 'GET'
    })
    .then(res => res.json())
    .catch(error => console.log(error))

    return caracteristica
}

async function postCaracteristica(caracteristica) {
    let url = `${root}/caracteristicas`

    await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(caracteristica)
    })
        .then(res => res.ok ? makeAlert("alertSuccess") : makeAlert("alertDanger"))
        .catch(error => console.log(error))
}

async function putCaracteristica(codigo, modifiedCaracteristica) {
    let url = `${root}/caracteristicas/${codigo}`

    await fetch(url, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(modifiedCaracteristica)
    })
        .then(res => res.ok ? makeAlert('alertSuccess') : makeAlert('alertDanger'))
        .catch(error => console.log(error))
}

async function deleteCaracteristica(codigo) {
    let url = `${root}/caracteristicas/${codigo}`

    await fetch(url, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' }
    })
        .then(res => res.ok ? makeAlert('alertSuccess') : makeAlert('alertDanger'))
        .catch(error => console.log(error))
}


//-------------------
refreshTableCaracteristicas()