const envioForm = document.getElementById('envioForm');
const detallesEnvioCard = document.getElementById('detallesEnvioCard');
const detallesEnvioContenido = document.getElementById('detallesEnvioContenido');
const seguimientoEnvioCard = document.getElementById('seguimientoEnvioCard');
const seguimientoEnvioEstados = document.getElementById('seguimientoEnvioEstados');

envioForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Capturar datos
  const cliente = document.getElementById('cliente').value;
  const direccion = document.getElementById('direccion').value;
  const fechaEntrega = document.getElementById('fechaEntrega').value;

  // Mostrar detalles del envío
  detallesEnvioCard.classList.remove('d-none');
  detallesEnvioContenido.innerHTML = `
    <p><strong>Cliente:</strong> ${cliente}</p>
    <p><strong>Dirección:</strong> ${direccion}</p>
    <p><strong>Fecha de Entrega:</strong> ${fechaEntrega}</p>
  `;

  // Reiniciar seguimiento
  seguimientoEnvioCard.classList.remove('d-none');
  seguimientoEnvioEstados.innerHTML = '';

  // Estados simulados
  const estados = [
    "Pedido confirmado",
    "Preparando paquete",
    "En camino al centro de distribución",
    "En ruta hacia la dirección de entrega",
    "Entregado"
  ];

  let i = 0;

  function actualizarEstado() {
    if (i < estados.length) {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.textContent = `✅ ${estados[i]}`;
      seguimientoEnvioEstados.appendChild(li);
      i++;
      setTimeout(actualizarEstado, 3000); // Avanza cada 3 segundos
    }
  }

  actualizarEstado();
});
