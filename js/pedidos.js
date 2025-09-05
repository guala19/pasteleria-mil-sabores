// --- pedidos.js ---
// Clave en LocalStorage
const PEDIDOS_KEY = "pedidos";

// Cargar y guardar pedidos
function cargarPedidos() {
  return JSON.parse(localStorage.getItem(PEDIDOS_KEY)) || [];
}
function guardarPedidos(pedidos) {
  localStorage.setItem(PEDIDOS_KEY, JSON.stringify(pedidos));
}

// Formulario
document.getElementById("pedidoForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombreCliente").value;
  const producto = document.getElementById("producto").value;
  const cantidad = parseInt(document.getElementById("cantidad").value);

  // Simulamos precios según producto seleccionado
  const precios = {
    "Torta Tres Leches": 15000,
    "Cheesecake Frutilla": 12000,
    "Pie de Limón": 10000
  };

  const precioUnitario = precios[producto];
  const total = precioUnitario * cantidad;

  // Pedido
  const pedido = {
    id: Date.now(),
    cliente: nombre,
    producto,
    cantidad,
    total,
    estado: "Procesando"
  };

  // Guardar pedido
  const pedidos = cargarPedidos();
  pedidos.push(pedido);
  guardarPedidos(pedidos);

  // Mostrar boleta
  mostrarBoleta(pedido);

  // Mostrar seguimiento
  mostrarSeguimiento(pedido);
});

function mostrarBoleta(pedido) {
  const boletaCard = document.getElementById("boletaCard");
  const boletaContenido = document.getElementById("boletaContenido");

  boletaContenido.innerHTML = `
    <p><strong>Cliente:</strong> ${pedido.cliente}</p>
    <p><strong>Producto:</strong> ${pedido.producto}</p>
    <p><strong>Cantidad:</strong> ${pedido.cantidad}</p>
    <p><strong>Total:</strong> $${pedido.total.toLocaleString()}</p>
  `;

  boletaCard.classList.remove("d-none");
}

function mostrarSeguimiento(pedido) {
  const seguimientoCard = document.getElementById("seguimientoCard");
  const lista = document.getElementById("seguimientoEstados");

  // Estados simulados
  const estados = [
    "Procesando pedido",
    "Preparando en cocina",
    "Pedido en camino 🚚",
    "Entregado ✅"
  ];

  lista.innerHTML = "";
  estados.forEach((estado, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = estado;
    if (index === 0) li.classList.add("active"); // primer estado resaltado
    lista.appendChild(li);
  });

  seguimientoCard.classList.remove("d-none");

  // Simulación de actualización de estado cada 3s
  let paso = 0;
  const interval = setInterval(() => {
    const items = lista.querySelectorAll("li");
    if (paso < items.length) {
      items[paso].classList.remove("active");
      items[paso].classList.add("list-group-item-success");
      if (paso + 1 < items.length) {
        items[paso + 1].classList.add("active");
      }
      paso++;
    } else {
      clearInterval(interval);
    }
  }, 3000);
}
