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

//----------------------------------------- DOM handling -----------------------------------------------------//
/**
 * Functions to handle the HTML elements of "asignaturas.html".
 */

function newCollapse() {
    $("#collapseNew").collapse("toggle")
    $("#collapseMod").collapse("hide")
    $("#collapseDel").collapse("hide")
}

function editCollapse() {
    $("#collapseMod").collapse("toggle")
    $("#collapseNew").collapse("hide")
    $("#collapseDel").collapse("hide")
}

function deleteCollapse() {
    $("#collapseDel").collapse("toggle")
    $("#collapseNew").collapse("hide")
    $("#collapseMod").collapse("hide")
}

function hideCollapse() {
    $(".collapse").collapse("hide")
}

function modClick() {
    $("#collapseMod").collapse("show")
    $("#collapseNew").collapse("hide")
    $("#collapseDel").collapse("hide")
}
function makeDangerAlert() {
    document.getElementById("alertDanger").style.display = 'block'
    document.getElementById("alertDanger").style.opacity = '1'

    setTimeout(() => {
        document.getElementById("alertDanger").style.opacity = '0'
        setTimeout(() => {
            document.getElementById("alertDanger").style.display = 'none'
        }, 1000)
    }, 2000)
}

function makeSuccessAlert() {
    document.getElementById("alertSuccess").style.display = 'block'
    document.getElementById("alertSuccess").style.opacity = '1'

    setTimeout(() => {
        document.getElementById("alertSuccess").style.opacity = '0'
        setTimeout(() => {
            document.getElementById("alertSuccess").style.display = 'none'
        }, 1000)
    }, 2000)

}

function makeWarningAlert() {
    document.getElementById("alertWarning").style.display = 'block'
    document.getElementById("alertWarning").style.opacity = '1'
}

function closeWarningAlert() {
    setTimeout(() => {
        document.getElementById("alertWarning").style.opacity = '0'
        setTimeout(() => {
            document.getElementById("alertWarning").style.display = 'none'
        }, 1000)
    }, 2000)
}

function validateDeleteForm() {
    if (!document.getElementById("deleteID").value) {
        document.getElementById("deleteID").classList.add("is-invalid")
    } else {
        document.getElementById("deleteID").classList.remove("is-invalid")
    }
}

function validateEditForm() {
    if (!document.getElementById('editID').value) {
        document.getElementById('editID').classList.add("is-invalid")
    } else {
        document.getElementById('editID').classList.remove("is-invalid")
    }
    if (!document.getElementById('editNombre').value) {
        document.getElementById('editNombre').classList.add("is-invalid")
    } else {
        document.getElementById('editNombre').classList.remove("is-invalid")
    }
    if (!document.getElementById('editCreditos').value) {
        document.getElementById('editCreditos').classList.add("is-invalid")
    } else {
        document.getElementById('editCreditos').classList.remove("is-invalid")
    }
    if (!document.getElementById('editNivel').value) {
        document.getElementById('editNivel').classList.add("is-invalid")
    } else {
        document.getElementById('editNivel').classList.remove("is-invalid")
    }
    if (!document.getElementById('editTipo').value) {
        document.getElementById('editTipo').classList.add("is-invalid")
    } else {
        document.getElementById('editTipo').classList.remove("is-invalid")
    }
    if (!document.getElementById('editHorasD').value) {
        document.getElementById('editHorasD').classList.add("is-invalid")
    } else {
        document.getElementById('editHorasD').classList.remove("is-invalid")
    }
    if (!document.getElementById('editHorasI').value) {
        document.getElementById('editHorasI').classList.add("is-invalid")
    } else {
        document.getElementById('editHorasI').classList.remove("is-invalid")
    }
    if (!document.getElementById('editDescripcion').value) {
        document.getElementById('editDescripcion').classList.add("is-invalid")
    } else {
        document.getElementById('editDescripcion').classList.remove("is-invalid")
    }
}

function validateNewForm() {
    if (!document.getElementById('inputID').value) {
        document.getElementById('inputID').classList.add("is-invalid")
    } else {
        document.getElementById('inputID').classList.remove("is-invalid")
    }
    if (!document.getElementById('inputNombre').value) {
        document.getElementById('inputNombre').classList.add("is-invalid")
    } else {
        document.getElementById('inputNombre').classList.remove("is-invalid")
    }
    if (!document.getElementById('inputCreditos').value) {
        document.getElementById('inputCreditos').classList.add("is-invalid")
    } else {
        document.getElementById('inputCreditos').classList.remove("is-invalid")
    }
    if (!document.getElementById('inputNivel').value) {
        document.getElementById('inputNivel').classList.add("is-invalid")
    } else {
        document.getElementById('inputNivel').classList.remove("is-invalid")
    }
    if (!document.getElementById('inputTipo').value) {
        document.getElementById('inputTipo').classList.add("is-invalid")
    } else {
        document.getElementById('inputTipo').classList.remove("is-invalid")
    }
    if (!document.getElementById('inputHorasD').value) {
        document.getElementById('inputHorasD').classList.add("is-invalid")
    } else {
        document.getElementById('inputHorasD').classList.remove("is-invalid")
    }
    if (!document.getElementById('inputHorasI').value) {
        document.getElementById('inputHorasI').classList.add("is-invalid")
    } else {
        document.getElementById('inputHorasI').classList.remove("is-invalid")
    }
    if (!document.getElementById('inputDescripcion').value) {
        document.getElementById('inputDescripcion').classList.add("is-invalid")
    } else {
        document.getElementById('inputDescripcion').classList.remove("is-invalid")
    }
}


//------------------------------------------- Frontend Logic -------------------------------------------------//
/**
 * Functions to handle the logic of the events of "asignaturas.html".
 */

async function addAsignatura() {
    let codigo = document.getElementById("inputID").value
    let nombre = document.getElementById("inputNombre").value
    let creditos = document.getElementById("inputCreditos").value
    let nivel = document.getElementById("inputNivel").value
    let tipo = document.getElementById("inputTipo").value
    let horasDirectas = document.getElementById("inputHorasD").value
    let horasIndependientes = document.getElementById("inputHorasI").value
    let descripcion = document.getElementById("inputDescripcion").value

    validateNewForm()
    if (codigo, nombre, creditos, nivel, tipo, horasDirectas, horasIndependientes, descripcion) {

        let asignatura = {
            codigo: codigo,
            nombre: nombre,
            creditos: creditos,
            nivel: nivel,
            tipo: tipo,
            horasDirectas: horasDirectas,
            horasIndependientes: horasIndependientes,
            descripcion: descripcion,
        }

        await postAsignatura(asignatura)

        refreshTable()
        clearFields()
    } else {
    }
}

async function removeAsignatura(codigo) {
    validateDeleteForm()

    if (codigo) {
        closeWarningAlert()
        await deleteAsignatura(codigo)

        refreshTable()
        clearFields()
    } else {
    }


}

async function editAsignatura(codigo) {
    asignatura = await getAsignatura(codigo)
    modClick()

    document.getElementById('editID').value = asignatura[0].codigo
    document.getElementById('editNombre').value = asignatura[0].nombre
    document.getElementById('editCreditos').value = asignatura[0].creditos
    document.getElementById('editNivel').value = asignatura[0].nivel
    document.getElementById('editTipo').value = asignatura[0].tipo
    document.getElementById('editHorasD').value = asignatura[0].horasDirectas
    document.getElementById('editHorasI').value = asignatura[0].horasIndependientes
    document.getElementById('editDescripcion').value = asignatura[0].descripcion
}

async function updateAsignatura() {
    let codigo = document.getElementById("editID").value
    let nombre = document.getElementById("editNombre").value
    let creditos = document.getElementById("editCreditos").value
    let nivel = document.getElementById("editNivel").value
    let tipo = document.getElementById("editTipo").value
    let horasDirectas = document.getElementById("editHorasD").value
    let horasIndependientes = document.getElementById("editHorasI").value
    let descripcion = document.getElementById("editDescripcion").value


    validateEditForm()
    if (codigo, nombre, creditos, nivel, tipo, horasDirectas, horasIndependientes, descripcion) {
        closeWarningAlert()

        let newAsignatura = {
            codigo: codigo,
            nombre: nombre,
            creditos: creditos,
            nivel: nivel,
            tipo: tipo,
            horasDirectas: horasDirectas,
            horasIndependientes: horasIndependientes,
            descripcion: descripcion,
        }

        await putAsignatura(codigo, newAsignatura)

        refreshTable()
        clearFields()
    } else {
    }

}

async function refreshTable() {
    let asignaturas = await getAsignaturas()
    let tbody = document.getElementById('asignaturasTable')
    let row = ''


    if (asignaturas.length > 0) {
        for (let i = 0; i < asignaturas.length; i++) {
            const element = asignaturas[i]
            row += '<tr>'
            row += '<td>' + element.codigo + '</td>'
            row += '<td>' + element.nombre + '</td>'
            row += '<td>' + element.creditos + '</td>'
            row += '<td>' + element.nivel + '</td>'
            row += '<td>' + element.tipo + '</td>'
            row += '<td>' + element.horasDirectas + '</td>'
            row += '<td>' + element.horasIndependientes + '</td>'
            row += '<td>' + element.descripcion + '</td>'
            row += `<td><button type="button" class="btn btn-info" onclick="editAsignatura('${element.codigo}')">Modificar</button> <button type="button" class="btn btn-danger" onclick="removeAsignatura('${element.codigo}')">Eliminar</button></td>`
            row += '</tr>'

            tbody.innerHTML = row
        }
    } else {
        row += '<tr>'
        row += '</tr>'
        tbody.innerHTML = row
    }
}

function clearFields() {
    document.getElementById('inputID').value = ""
    document.getElementById('inputNombre').value = ""
    document.getElementById('inputCreditos').value = ""
    document.getElementById('inputNivel').value = ""
    document.getElementById('inputTipo').value = ""
    document.getElementById('inputHorasD').value = ""
    document.getElementById('inputHorasI').value = ""
    document.getElementById('inputDescripcion').value = ""

    document.getElementById('editID').value = ""
    document.getElementById('editNombre').value = ""
    document.getElementById('editCreditos').value = ""
    document.getElementById('editNivel').value = ""
    document.getElementById('editTipo').value = ""
    document.getElementById('editHorasD').value = ""
    document.getElementById('editHorasI').value = ""
    document.getElementById('editDescripcion').value = ""

    document.getElementById('deleteID').value = ""

}

//------------------------------------- Backend/Frontend Interaction -----------------------------------------//
/**
 * Functions to manage the connection and interaction between frontend and backend of 'asignaturas' section.
 */

async function getAsignaturas() {
    let url = "http://localhost:3000/asignaturas"
    let asignaturas = []

    const response = await fetch(url, {
        method: 'GET'
    })
        .then(res => res.json())
        .catch(error => console.log(error))

    asignaturas = response
    return asignaturas
}

async function getAsignatura(codigo) {
    let url = `http://localhost:3000/asignaturas/${codigo}`
    let asignatura = {}


    const response = await fetch(url, {
        method: 'GET'
    })
        .then(res => res.json())
        .catch(error => console.log(error))

    asignatura = response
    return asignatura
}

async function postAsignatura(asignatura) {
    let url = "http://localhost:3000/asignaturas"

    await fetch(url, {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(asignatura)
    })
        .then(res => {
            res.ok ? makeSuccessAlert() : makeDangerAlert()
        })
        .catch(error => console.log(error))
}

async function putAsignatura(codigo, newAsignatura) {
    let url = `http://localhost:3000/asignaturas/${codigo}`

    await fetch(url, {
        method: "PUT",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newAsignatura)
    })
        .then(res => {
            res.ok ? makeSuccessAlert() : makeDangerAlert()
        })
        .catch(error => {
            console.log(error)
        })
}

async function deleteAsignatura(codigo) {
    let url = `http://localhost:3000/asignaturas/${codigo}`

    await fetch(url, {
        method: "DELETE",
        headers: { 'content-type': 'application/json' },
    })
        .then(res => {
            res.ok ? makeSuccessAlert() : makeDangerAlert()
        })
        .catch(error => {
            console.log(error)
        })
}


//------------------------------------------------------------------------------------------------------------//

refreshTable()


