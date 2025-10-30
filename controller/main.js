function crearEmpleado(){
    document.getElementById('divAgregarEmpleado').style.display = 'block';
}

function agregarEmpleado(e){
    e.preventDefault();
    
    const cc = document.getElementById('cc').value;
    const nombresyApellidos = document.getElementById('nombresyApellidos').value;
    const direccion = document.getElementById('direccion').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const sueldoBase = document.getElementById('sueldoBase').value;
    const tipoEmpleado = document.getElementById('tipoEmpleado').value;
    const tipoBonificacion = document.getElementById('tipoBonificacion').value;

    if (!cc || !nombresyApellidos || !direccion || !email || !telefono || !sueldoBase || !tipoEmpleado || !tipoBonificacion) {
        alert('Por favor llene todos los campos');
        return;
    }

    const empleado = new Empleado(cc, nombresyApellidos, direccion, email, telefono, sueldoBase, tipoEmpleado, tipoBonificacion);
    let empleados = JSON.parse(localStorage.getItem('empleados')) || [];
    empleados.push(empleado);
    localStorage.setItem('empleados', JSON.stringify(empleados));
    mostrarEmpleados();

    document.getElementById('formEmpleado').reset();
    document.getElementById('divAgregarEmpleado').style.display = 'none';
    
}

function mostrarEmpleados() {
    const tbody = document.querySelector('#tablaEmpleados tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const empleados = JSON.parse(localStorage.getItem('empleados')) || [];
    let totalNomina = 0;

    empleados.forEach((emp,index) => {
        const fila = `<tr>
          <td>${index + 1}.</td>
          <td>${emp.cc}</td>
          <td>${emp.nombresyApellidos}</td>
          <td>${emp.direccion}</td>
          <td>${emp.email}</td>
          <td>${emp.telefono}</td>
          <td>$${Number(emp.sueldoBase).toLocaleString('es-CO')}</td>
          <td>${emp.tipoEmpleado}</td>
          <td>${emp.tipoBonificacion}</td>
          <td>$${Number(emp.saldoTotal).toLocaleString('es-CO')}</td>
        </tr>`;
        tbody.innerHTML += fila;
        totalNomina += emp.saldoTotal || 0;
    });

    tbody.innerHTML += `
        <tr class="table-info">
            <td colspan="9" class="text-end"><strong>Total Nómina:</strong></td>
            <td><strong>$${totalNomina.toLocaleString('es-CO')}</strong></td>
        </tr>
    `;
    
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('divAgregarEmpleado').style.display = 'none';
    mostrarEmpleados();
    document.getElementById('btnCrearEmpleado').addEventListener('click', crearEmpleado);
    document.getElementById('formEmpleado').addEventListener('submit', agregarEmpleado);
});

