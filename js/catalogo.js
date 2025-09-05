import { PRODUCTS, CATEGORIES } from '../data/products.js'
import { MONEDA, precioPorPersonas, etiquetaPersonas } from './utilidades.js'
import { carrito, agregarAlCarrito, iniciarCarritoUI, renderCarrito, actualizarCantidad, eliminarDelCarrito } from './carrito.js'

const grid = document.getElementById('grid')

const F = {
  forma: new Set(),
  prefs: new Set(),
  categorias: new Set()
}

;(function llenarCategorias(){
  const menu = document.getElementById('menuCategorias')
  const lista = [
    'Tortas Cuadradas',
    'Tortas Circulares',
    'Postres Individuales',
    'Productos Sin Azúcar',
    'Pastelería Tradicional',
    'Productos sin gluten',
    'Productos Vegana',
    'Tortas Especiales'
  ]
  menu.innerHTML = lista.map(c => `
    <label class="check-pill">
      <input type="checkbox" value="${c}" data-group="categorias">
      <span>${c}</span>
    </label>
  `).join('')
})()

document.addEventListener('change', (e)=>{
  const el = e.target
  if(!(el instanceof HTMLInputElement)) return
  const group = el.getAttribute('data-group')
  if(!group) return
  if(el.checked) F[group].add(el.value)
  else F[group].delete(el.value)
  render()
})

function idxItem(code, size){ return carrito.findIndex(i => i.code===code && i.size===size) }
function setLoading(btn,on){
  if(!btn) return
  if(on){
    btn.classList.add('btn-loading')
    btn.innerHTML = `<span class="label">Agregar</span><span class="spinner"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></span>`
    btn.disabled = true
  } else {
    btn.classList.remove('btn-loading')
    btn.innerHTML = 'Agregar'
    btn.disabled = false
  }
}
function renderWidget(zone,p,clave,qty){
  zone.innerHTML = `
    <div class="widget-cant d-flex align-items-center">
      <button class="btn-del" title="Eliminar" aria-label="Eliminar">🗑</button>
      <div class="contador"><span>${qty}</span> <span class="arrow">un</span></div>
      <button class="btn-dec" title="Disminuir" aria-label="Disminuir">–</button>
      <button class="btn-inc" title="Aumentar" aria-label="Aumentar">+</button>
    </div>
  `
  const del=zone.querySelector('.btn-del'),inc=zone.querySelector('.btn-inc'),dec=zone.querySelector('.btn-dec'),c=zone.querySelector('.contador span')
  inc.addEventListener('click',()=>{const i=idxItem(p.code,etiquetaPersonas(clave));if(i>=0){actualizarCantidad(i,carrito[i].qty+1);c.textContent=String(carrito[i].qty);renderCarrito()}else{agregarAlCarrito({code:p.code,name:p.name,type:p.type,size:etiquetaPersonas(clave),price:precioPorPersonas(p.price,clave),qty:1,img:p.img});c.textContent='1';renderCarrito()}})
  dec.addEventListener('click',()=>{const i=idxItem(p.code,etiquetaPersonas(clave));if(i>=0){const q=Math.max(0,carrito[i].qty-1);if(q===0){eliminarDelCarrito(i);renderCarrito();zone.innerHTML=`<button class="btn btn-add add">Agregar</button>`;zone.querySelector('.add').addEventListener('click',()=>onAdd(zone,p))}else{actualizarCantidad(i,q);c.textContent=String(q);renderCarrito()}}})
  del.addEventListener('click',()=>{const i=idxItem(p.code,etiquetaPersonas(clave));if(i>=0){eliminarDelCarrito(i);renderCarrito()}zone.innerHTML=`<button class="btn btn-add add">Agregar</button>`;zone.querySelector('.add').addEventListener('click',()=>onAdd(zone,p))})
  function onAdd(z,pr){handleAdd(z,pr)}
}
async function handleAdd(zone,p){
  const clave = '10p'
  const btn = zone.querySelector('.add')
  setLoading(btn,true);await new Promise(r=>setTimeout(r,600))
  agregarAlCarrito({code:p.code,name:p.name,type:p.type,size:etiquetaPersonas(clave),price:precioPorPersonas(p.price,clave),qty:1,img:p.img})
  renderCarrito()
  zone.style.opacity='0';setTimeout(()=>{const i=idxItem(p.code,etiquetaPersonas(clave));renderWidget(zone,p,clave,i>=0?carrito[i].qty:1);zone.style.opacity='1'},150)
}

function pasaFiltros(p){
  if(F.forma.size && !F.forma.has(p.type)) return false
  if(F.categorias.size && !F.categorias.has(p.category)) return false
  if(F.prefs.size){
    const tags = new Set(p.tags || [])
    let ok = false
    for(const k of F.prefs){ if(tags.has(k)) { ok=true; break } }
    if(!ok) return false
  }
  return true
}

function render(){
  const lista = PRODUCTS.filter(pasaFiltros)
  grid.innerHTML = ''
  lista.forEach(p=>{
    const col=document.createElement('div');col.className='col'
    const base=p.price,max=p.price+10000
    col.innerHTML = `
      <div class="card h-100 card-pdt">
        <a href="producto.html?code=${p.code}" target="_blank" rel="noopener">
          <img src="${p.img}" alt="${p.name}" onerror="this.src='img/cake.jpg'">
        </a>
        <div class="card-body d-flex flex-column">
          <div>
            <a class="text-decoration-none" href="producto.html?code=${p.code}" target="_blank" rel="noopener"><strong>${p.name}</strong></a>
          </div>
          <div class="precio-wrap my-2">
            <div class="precio-principal">${MONEDA.format(base)} – ${MONEDA.format(max)}</div>
          </div>
          <div class="text-muted small mb-3">${p.category}</div>
          <div class="mt-auto zona-acciones">
            <button class="btn btn-add add">Agregar</button>
          </div>
        </div>
      </div>
    `
    const zona = col.querySelector('.zona-acciones')
    zona.querySelector('.add').addEventListener('click',()=>handleAdd(zona,p))
    grid.appendChild(col)
  })
}

render();iniciarCarritoUI()
