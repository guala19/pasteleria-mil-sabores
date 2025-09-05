
const PEDIDOS_KEY = "pedidos";


function cargarPedidos() {
  return JSON.parse(localStorage.getItem(PEDIDOS_KEY)) || [];
}
function guardarPedidos(pedidos) {
  localStorage.setItem(PEDIDOS_KEY, JSON.stringify(pedidos));
}


function obtenerUltimoPedido() {
  const pedidos = cargarPedidos();
  return pedidos[pedidos.length - 1] || null;
}


function mostrarBoleta(pedido) {
  const boletaCard = document.getElementById("boletaCard");
  const boletaContenido = document.getElementById("boletaContenido");

  boletaContenido.innerHTML = `
    <p><strong>Cliente:</strong> ${pedido.cliente}</p>
    <p><strong>Producto:</strong> ${pedido.producto}</p>
    <p><strong>Cantidad:</strong> ${pedido.cantidad}</p>
    <p><strong>Total:</strong> $${pedido.total.toLocaleString()}</p>
    <div class="mt-3 text-center">
      <a href="envios.html" class="btn btn-pastel">Continuar con Envío 🚚</a>
    </div>
  `;

  boletaCard.classList.remove("d-none");
}


window.addEventListener("DOMContentLoaded", () => {
  const pedido = obtenerUltimoPedido();
  if (pedido) {
    mostrarBoleta(pedido);
  } else {
    alert("No hay pedidos registrados.");
  }
});