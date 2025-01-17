document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    console.log('Formulario enviado');

    // Obtener los valores de los campos de entrada
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    console.log('Usuario:', username);
    console.log('Contraseña:', password);

    // Aquí puedes agregar la lógica de autenticación, por ejemplo, verificar el usuario y la contraseña.
    // Si la autenticación es exitosa, redirigir a la página de inicio:
    if (username === 'elias' && password === '1066') { // Reemplaza esta verificación con tu lógica real
        mostrarNotificacion('Inicio de sesión exitoso', 'success');
        setTimeout(function() {
            window.location.href = 'home.html';
        }, 2000);
    } else {
        mostrarNotificacion('Usuario o contraseña incorrectos', 'error');
    }
});
/*mensaje de coreecto o incorrecto*/
function mostrarNotificacion(mensaje, tipo) {
    if (Notification.permission === 'granted') {
        new Notification(mensaje, {
            icon: tipo === 'success' ? 'success-icon.png' : 'error-icon.png',
            body: mensaje
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(function(permission) {
            if (permission === 'granted') {
                new Notification(mensaje, {
                    icon: tipo === 'success' ? 'success-icon.png' : 'error-icon.png',
                    body: mensaje
                });
            }
        });
    }
}

document.getElementById('payment-date').addEventListener('change', function() {
    var paymentDate = new Date(this.value);
    var validityDate = new Date(paymentDate);
    validityDate.setDate(validityDate.getDate() + 29); // 30 días incluyendo el día de pago
    document.getElementById('validity').value = validityDate.toISOString().split('T')[0];
});

document.getElementById('account-type').addEventListener('change', function() {
    var accountType = this.value;
    var profileCount = document.getElementById('profile-count');
    if (accountType === 'Pantalla') {
        profileCount.value = '1';
        profileCount.disabled = true;
    } else {
        profileCount.value = '';
        profileCount.disabled = false;
    }
});

document.getElementById('add-product-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var paymentDate = document.getElementById('payment-date').value;
    var paymentMethod = document.getElementById('payment-method').value;
    var accountType = document.getElementById('account-type').value;
    var purchasePrice = document.getElementById('purchase-price').value;
    var status = document.getElementById('status').value;
    var category = document.getElementById('category').value;
    var validity = document.getElementById('validity').value;
    var validityUnit = document.getElementById('validity-unit').value;
    var profileCount = document.getElementById('profile-count').value;
    var otroPerfil = document.getElementById('otro-perfil').value;
    var dominio = document.getElementById('dominio').value;
    var tarjeta = document.getElementById('tarjeta').value;

    if (profileCount === 'otro') {
        profileCount = otroPerfil;
    }

    if (paymentMethod === 'Nu' || paymentMethod === 'Nequi') {
        paymentMethod += ' ' + tarjeta;
    }

    // Convertir vigencia a días si es necesario
    if (validityUnit === 'mes') {
        validity = validity * 30;
    }

    var producto = {
        email: email,
        password: password,
        paymentDate: paymentDate,
        paymentMethod: paymentMethod,
        accountType: accountType,
        purchasePrice: purchasePrice,
        status: status,
        category: category,
        validity: validity,
        profileCount: profileCount,
        dominio: dominio
    };

    agregarProductoATabla(producto);

    // Crear cupos
    crearCupos(producto);

    // Limpiar el formulario
    document.getElementById('add-product-form').reset();
    document.getElementById('otro-perfil').style.display = 'none';
    document.getElementById('tarjeta').style.display = 'none';
});

function agregarProductoATabla(producto) {
    var table = document.getElementById('inventory-table').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    newRow.insertCell(0).innerText = producto.email;
    newRow.insertCell(1).innerText = producto.password;
    newRow.insertCell(2).innerText = producto.paymentDate;
    newRow.insertCell(3).innerText = producto.paymentMethod;
    newRow.insertCell(4).innerText = producto.accountType;
    newRow.insertCell(5).innerText = producto.purchasePrice;
    newRow.insertCell(6).innerText = producto.dominio;
    newRow.insertCell(7).innerText = producto.status;
    newRow.insertCell(8).innerText = producto.category;
    newRow.insertCell(9).innerText = producto.validity;
    newRow.insertCell(10).innerText = producto.profileCount;
}

function crearCupos(producto) {
    var cuposContainer = document.getElementById('cupos-container');
    var cuposCount = producto.accountType === 'Completa' ? producto.profileCount : 1;
    for (var i = 0; i < cuposCount; i++) {
        var cupo = document.createElement('div');
        cupo.className = 'cupo';
        cupo.innerText = 'Cupo ' + (i + 1) + ' - Disponible';
        cuposContainer.appendChild(cupo);
    }
}

function mostrarSeccion(id) {
    var secciones = document.querySelectorAll('main section');
    secciones.forEach(function(seccion) {
        seccion.style.display = 'none';
    });
    document.getElementById(id).style.display = 'block';
}

function toggleForm() {
    var form = document.getElementById('add-product-form');
    var button = document.getElementById('show-form-button');
    var title = document.querySelector('#inventory-control h2');
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'flex';
        title.style.marginTop = '2rem';
        button.innerText = '|X| Cerrar';
        button.id = 'close-form-button';
    } else {
        form.style.display = 'none';
        title.style.marginTop = '0';
        button.innerText = 'Agregar Producto';
        button.id = 'show-form-button';
    }
}

function toggleOtroPerfil(select) {
    var otroPerfil = document.getElementById('otro-perfil');
    if (select.value === 'otro') {
        otroPerfil.style.display = 'block';
    } else {
        otroPerfil.style.display = 'none';
    }
}

function toggleOtroPago(select) {
    var tarjeta = document.getElementById('tarjeta');
    if (select.value === 'Nu' || select.value === 'Nequi') {
        tarjeta.style.display = 'block';
    } else {
        tarjeta.style.display = 'none';
    }
}
