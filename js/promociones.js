export function calcularPromociones(carrito,{codigo,nacimiento,correo}){
  const hoy=new Date();
  const subtotal=carrito.reduce((a,i)=>a+i.price*i.qty,0);
  let dEdad=0,dCodigo=0,dCumple=0,notas=[];
  if(nacimiento){
    const n=new Date(nacimiento);
    const edad=hoy.getFullYear()-n.getFullYear()-((hoy<new Date(hoy.getFullYear(),n.getMonth(),n.getDate()))?1:0);
    if(!isNaN(edad)&&edad>=50){dEdad=Math.round(subtotal*.5);notas.push("Descuento 50% por edad")}
  }
  if((codigo||"").trim().toUpperCase()==="FELICES50"){dCodigo=Math.round(subtotal*.1);notas.push("Código FELICES50 10%")}
  if(correo&&/@(duoc\.cl|profesor\.duoc\.cl)$/i.test(correo)&&nacimiento){
    const n=new Date(nacimiento);
    const esHoy=n.getMonth()===hoy.getMonth()&&n.getDate()===hoy.getDate();
    if(esHoy){
      const tortas=carrito.filter(i=>i.type==='circular'||i.type==='cuadrada');
      if(tortas.length){const min=tortas.reduce((m,i)=>i.price<m.price?i:m,tortas[0]);dCumple=min.price;notas.push("Cumpleaños DUOC: 1 torta gratis")}
    }
  }
  const descuentos=dEdad+dCodigo+dCumple;
  return{subtotal,descuentos,total:Math.max(0,subtotal-descuentos),notas}
}
