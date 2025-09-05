// --- envios.js ---
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
    "Entregado ✅"
  ];

  let i = 0;

  function actualizarEstado() {
    if (i < estados.length) {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.textContent = estados[i];
      if (i === 0) li.classList.add('active'); // el primero resaltado
      seguimientoEnvioEstados.appendChild(li);

      if (i > 0) {
        const prev = seguimientoEnvioEstados.children[i - 1];
        prev.classList.remove('active');
        prev.classList.add('list-group-item-success');
      }

      i++;
      setTimeout(actualizarEstado, 3000); // avanza cada 3s
    }
  }

  actualizarEstado();
});