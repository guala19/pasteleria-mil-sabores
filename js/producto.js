import { PRODUCTS } from '../data/products.js'
import { MONEDA, precioPorPersonas, etiquetaPersonas } from './utilidades.js'
import { carrito, agregarAlCarrito, iniciarCarritoUI, renderCarrito, actualizarCantidad, eliminarDelCarrito } from './carrito.js'

function param(n){const u=new URL(location.href);return u.searchParams.get(n)}
function idxItem(c,s){return carrito.findIndex(i=>i.code===c&&i.size===s)}

const code=param('code')
const root=document.getElementById('productRoot')
const p=PRODUCTS.find(x=>x.code===code)

if(!p){
  root.innerHTML=`<div class="alert alert-warning">Producto no encontrado.</div>`
}else{
  let sel='10p'
  root.innerHTML=`
    <div class="row g-4">
      <div class="col-12 col-lg-6">
        <div class="img-box">
          <img id="fotoP" class="img-fluid rounded-3 border" src="${p.img}" alt="${p.name}" onerror="this.src='img/cake.jpg'">
          <button id="btnShare" class="btn btn-share" type="button" title="Compartir" aria-label="Compartir">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18 8a3 3 0 1 0-2.83-4H15a3 3 0 0 0 0 6h.17A3 3 0 0 0 18 8ZM6 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm12 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM8.59 13.51l6.82-3.41M8.59 18.9l6.82-3.41" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>
      <div class="col-12 col-lg-6 d-flex flex-column">
        <h1 class="h3">${p.name}</h1>
        <div class="text-muted mb-2">${p.category}</div>

        <div class="mb-2">
          <label class="form-label">Tamaño</label>
          <div class="pastillas-tamano" role="group">
            <button id="pill10" class="pastilla activa" type="button">10 personas <span id="delta10" class="delta"></span></button>
            <button id="pill20" class="pastilla" type="button">20 personas <span id="delta20" class="delta">+ $10.000</span></button>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label" for="mensajeTorta">Mensaje especial (opcional)</label>
          <textarea id="mensajeTorta" class="form-control" maxlength="60" placeholder="Ej: Feliz cumple, Hernan!"></textarea>
          <div class="form-text">Máx. 60 caracteres.</div>
        </div>

        <div class="display-6 mb-3" id="precioAhora">${MONEDA.format(precioPorPersonas(p.price,sel))}</div>

        <div id="acciones" class="d-flex gap-2 mb-4">
          <button id="btnAgregar" class="btn btn-white border">Añadir al carrito</button>
          <button id="btnComprar" class="btn btn-pink">Comprar ahora</button>
        </div>

        <div class="p-3 border rounded bg-white">
          <p class="mb-0">${p.description||"Delicia de la casa."}</p>
        </div>
      </div>
    </div>
  `

  const btnShare=document.getElementById('btnShare')
  const msgEl=document.getElementById('mensajeTorta')
  btnShare.addEventListener('click',async()=>{
    const data={title:p.name,text:`Mira este producto de Pastelería 1000 Sabores: ${p.name}`,url:location.href}
    if(navigator.share){try{await navigator.share(data)}catch(e){}}
    else{await navigator.clipboard.writeText(data.url);alert('Enlace copiado al portapapeles')}
  })

  const precio=document.getElementById('precioAhora')
  const acciones=document.getElementById('acciones')
  const pill10=document.getElementById('pill10')
  const pill20=document.getElementById('pill20')
  const d10=document.getElementById('delta10')
  const d20=document.getElementById('delta20')

  function refrescar(){precio.textContent=MONEDA.format(precioPorPersonas(p.price,sel))}
  function refrescarPills(){
    if(sel==='10p'){pill10.classList.add('activa');pill20.classList.remove('activa');d10.textContent='';d20.textContent='+ $10.000'}
    else{pill10.classList.remove('activa');pill20.classList.add('activa');d10.textContent='- $10.000';d20.textContent=''}
  }
  pill10.addEventListener('click',()=>{sel='10p';refrescarPills();refrescar()})
  pill20.addEventListener('click',()=>{sel='20p';refrescarPills();refrescar()})

  function setLoading(on){
    const b=document.getElementById('btnAgregar')
    if(!b)return
    if(on){
      b.classList.add('btn-loading')
      b.innerHTML=`<span class="label">Añadir al carrito</span><span class="spinner"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></span>`
      b.disabled=true
    }else{
      b.classList.remove('btn-loading')
      b.innerHTML='Añadir al carrito'
      b.disabled=false
    }
  }

  function renderWidget(q){
    acciones.innerHTML=`
      <div class="widget-cant">
        <button class="btn-del" title="Eliminar" aria-label="Eliminar">🗑</button>
        <div class="contador"><span>${q}</span> <span class="arrow">un</span></div>
        <button class="btn-dec" title="Disminuir" aria-label="Disminuir">–</button>
        <button class="btn-inc" title="Aumentar" aria-label="Aumentar">+</button>
      </div>
    `
    const del=acciones.querySelector('.btn-del')
    const inc=acciones.querySelector('.btn-inc')
    const dec=acciones.querySelector('.btn-dec')
    const c=acciones.querySelector('.contador span')
    const clave=sel
    const etq=etiquetaPersonas(clave)

    inc.addEventListener('click',()=>{const i=idxItem(p.code,etq);if(i>=0){actualizarCantidad(i,carrito[i].qty+1);c.textContent=String(carrito[i].qty)}renderCarrito()})
    dec.addEventListener('click',()=>{const i=idxItem(p.code,etq);if(i>=0){const nv=Math.max(0,carrito[i].qty-1);if(nv===0){eliminarDelCarrito(i);renderCarrito();renderBotones()}else{actualizarCantidad(i,nv);c.textContent=String(nv);renderCarrito()}}})
    del.addEventListener('click',()=>{const i=idxItem(p.code,etq);if(i>=0){eliminarDelCarrito(i);renderCarrito()}renderBotones()})
  }

  function renderBotones(){
    acciones.innerHTML=`<button id="btnAgregar" class="btn btn-white border">Añadir al carrito</button><button id="btnComprar" class="btn btn-pink">Comprar ahora</button>`
    document.getElementById('btnAgregar').addEventListener('click',onAgregar)
    document.getElementById('btnComprar').addEventListener('click',onComprar)
  }

  async function onAgregar(){
    setLoading(true);await new Promise(r=>setTimeout(r,100))
    const clave=sel
    const etq=etiquetaPersonas(clave)
    const precioU=precioPorPersonas(p.price,clave)
    const nota=(msgEl?.value||'').trim()
    agregarAlCarrito({code:p.code,name:p.name,type:p.type,size:etq,price:precioU,qty:1,img:p.img,note:nota})
    renderCarrito()
    acciones.style.opacity='0'
    setTimeout(()=>{const i=idxItem(p.code,etq);renderWidget(i>=0?carrito[i].qty:1);acciones.style.opacity='1'},150)
  }

  function onComprar(){
    const clave=sel
    const etq=etiquetaPersonas(clave)
    const precioU=precioPorPersonas(p.price,clave)
    const nota=(msgEl?.value||'').trim()
    agregarAlCarrito({code:p.code,name:p.name,type:p.type,size:etq,price:precioU,qty:1,img:p.img,note:nota})
    renderCarrito()
    const off=document.getElementById('panelCarrito')
    bootstrap.Offcanvas.getOrCreateInstance(off).show()
  }

  document.getElementById('btnAgregar').addEventListener('click',onAgregar)
  document.getElementById('btnComprar').addEventListener('click',onComprar)
  refrescarPills();refrescar()
}

iniciarCarritoUI()
