//registro
function mensaje_descuento(e){
  e.preventDefault();

  var correo = document.getElementById("email").value;
  var edad = document.getElementById("edad").value;
  var codigo = document.getElementById("codigo").value;

  var mensaje = "";

  if (correo.indexOf("@duocuc.cl") != -1) {
    mensaje = mensaje + "Tienes una torta gratis\n";
  }

  if (edad >= 50) {
    mensaje = mensaje + "Tienes un 50% de descuento\n";
  }

  if (codigo == "felices 50") {
    mensaje = mensaje + "Tienes un 10% de descuento\n";
  }

  if (mensaje == "") {
    mensaje = "No tienes beneficios";
  }

  alert(mensaje);
}

//cuentas
function editarUsuario(boton) {
  var fila = boton.parentNode.parentNode;
  var celdas = fila.getElementsByTagName("td");

  for (var i = 0; i < celdas.length - 1; i++) {
    var nuevoValor = prompt("Editar valor:", celdas[i].innerText);
    if (nuevoValor !== null && nuevoValor.trim() !== "") {
      celdas[i].innerText = nuevoValor;
    }
  }
}

function eliminarUsuario(boton) {
  var fila = boton.parentNode.parentNode;
  fila.remove();
}
