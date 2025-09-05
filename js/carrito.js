import{MONEDA,guardarLS,cargarLS}from'./utilidades.js'
import{calcularPromociones}from'./promociones.js'

const K="carrito"
export let carrito=cargarLS(K,[])

export function agregarAlCarrito(item){
  const i=carrito.findIndex(x=>x.code===item.code&&x.size===item.size)
  if(i>=0){carrito[i].qty+=item.qty}else{carrito.push(item)}
  persistir();renderCarrito()
}
export function eliminarDelCarrito(i){carrito.splice(i,1);persistir();renderCarrito()}
export function actualizarCantidad(i,q){carrito[i].qty=Math.max(1,q|0);persistir();renderCarrito()}

function contar(){return carrito.reduce((a,i)=>a+i.qty,0)}
function actualizarBadge(){const el=document.getElementById('contadorCarrito');if(el)el.textContent=String(contar())}
function persistir(){guardarLS(K,carrito);actualizarBadge()}

export function renderCarrito(){
  const ul=document.getElementById('itemsCarrito');if(!ul)return;ul.innerHTML=''
  carrito.forEach((it,i)=>{
    const li=document.createElement('li')
    li.className='d-flex align-items-center gap-2'
    li.innerHTML=`
    <img class="img-carrito" src="${it.img||'img/cake.jpg'}" alt="${it.name}" onerror="this.src='img/cake.jpg'">
    <div class="flex-grow-1">
      <div class="fw-semibold">${it.name} <span class="text-muted">(${it.size})</span></div>
      ${it.note?`<div class="small text-muted">“${it.note}”</div>`:''}
      <div class="small text-muted">${MONEDA.format(it.price)} c/u</div>
    </div>
    <div class="zona-cantidad">
      <button class="btn btn-light btn-sm up">▲</button>
      <input type="number" min="1" value="${it.qty}" class="form-control form-control-sm" style="width:60px">
      <button class="btn btn-light btn-sm down">▼</button>
    </div>
    <button class="btn btn-outline-danger btn-sm del">✕</button>
    `

    li.querySelector('.up').addEventListener('click',()=>actualizarCantidad(i,carrito[i].qty+1))
    li.querySelector('.down').addEventListener('click',()=>actualizarCantidad(i,carrito[i].qty-1))
    li.querySelector('input').addEventListener('input',e=>actualizarCantidad(i,e.target.value))
    li.querySelector('.del').addEventListener('click',()=>eliminarDelCarrito(i))
    ul.appendChild(li)
  })
  const codigo=document.getElementById('codigoPromo')?.value||""
  const nac=document.getElementById('nacimiento')?.value||""
  const correo=document.getElementById('correoPromo')?.value||""
  const r=calcularPromociones(carrito,{codigo:codigo,nacimiento:nac,correo})
  const s=document.getElementById('subtotalCarrito'),d=document.getElementById('descuentosCarrito'),t=document.getElementById('totalCarrito'),m=document.getElementById('msgPromo')
  if(s)s.textContent=MONEDA.format(r.subtotal)
  if(d)d.textContent="-"+MONEDA.format(r.descuentos)
  if(t)t.textContent=MONEDA.format(r.total)
  if(m)m.textContent=r.notas.join(" · ")
}

export function iniciarCarritoUI(){
  document.getElementById('aplicarPromos')?.addEventListener('click',renderCarrito)
  document.getElementById('btnPagar')?.addEventListener('click',()=>{
    alert('Pedido confirmado')
    carrito=[];persistir();renderCarrito()
  })
  actualizarBadge();renderCarrito()
}
