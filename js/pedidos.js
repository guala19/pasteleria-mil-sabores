const pedidoForm = document.getElementById('pedidoForm');
const boletaCard = document.getElementById('boletaCard');
const boletaContenido = document.getElementById('boletaContenido');
const seguimientoCard = document.getElementById('seguimientoCard');
const seguimientoEstados = document.getElementById('seguimientoEstados');

pedidoForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Capturar datos
  const cliente = document.getElementById('nombreCliente').value;
  const producto = document.getElementById('producto').value;
  const cantidad = document.getElementById('cantidad').value;

  // Precios simulados
  const precios = {
    "Torta Tres Leches": 15000,
    "Cheesecake Frutilla": 12000,
    "Pie de Limón": 10000
  };

  const total = precios[producto] * cantidad;

  // Mostrar boleta
  boletaCard.classList.remove('d-none');
  boletaContenido.innerHTML = `
    <p><strong>Cliente:</strong> ${cliente}</p>
    <p><strong>Producto:</strong> ${producto}</p>
    <p><strong>Cantidad:</strong> ${cantidad}</p>
    <p><strong>Total:</strong> $${total.toLocaleString('es-CL')}</p>
  `;

  // Seguimiento
  seguimientoCard.classList.remove('d-none');
  seguimientoEstados.innerHTML = '';

  const estados = ["Preparación", "En Camino", "Entregado"];
  let i = 0;

  function actualizarEstado() {
    if (i < estados.length) {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.textContent = `✅ ${estados[i]}`;
      seguimientoEstados.appendChild(li);
      i++;
      setTimeout(actualizarEstado, 3000); // Cada 3 segundos cambia de estado
    }
  }
  actualizarEstado();
});
