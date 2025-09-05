export const CATEGORIES = [
  "Tortas Cuadradas",
  "Tortas Circulares",
  "Postres Individuales",
  "Productos Sin Azúcar",
  "Pastelería Tradicional",
  "Productos sin gluten",
  "Productos Vegana",
  "Tortas Especiales"
];

export const PRODUCTS = [
  {
    code: "TC001",
    category: "Tortas Cuadradas",
    name: "Torta Cuadrada de Chocolate",
    price: 45000,
    type: "cuadrada",
    img: "img/cake.jpg",
    description: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.",
    ingredients: ["Harina","Cacao","Azúcar","Huevos","Mantequilla","Ganache de chocolate","Avellanas"]
  },
  {
    code: "TC002",
    category: "Tortas Cuadradas",
    name: "Torta Cuadrada de Frutas",
    price: 50000,
    type: "cuadrada",
    img: "img/cake.jpg",
    description: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.",
    ingredients: ["Harina","Azúcar","Huevos","Vainilla","Crema chantilly","Frutas frescas"]
  },
  {
    code: "TT001",
    category: "Tortas Circulares",
    name: "Torta Circular de Vainilla",
    price: 40000,
    type: "circular",
    img: "img/cake.jpg",
    description: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.",
    ingredients: ["Harina","Azúcar","Huevos","Vainilla","Crema pastelera","Glaseado"]
  },
  {
    code: "TT002",
    category: "Tortas Circulares",
    name: "Torta Circular de Manjar",
    price: 42000,
    type: "circular",
    img: "img/cake.jpg",
    description: "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.",
    ingredients: ["Harina","Azúcar","Huevos","Manjar","Nueces"]
  },
  {
    code: "PI001",
    category: "Postres Individuales",
    name: "Mousse de Chocolate",
    price: 5000,
    type: "otro",
    img: "img/cake.jpg",
    description: "Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.",
    ingredients: ["Chocolate","Crema","Azúcar","Gelatina","Cacao"]
  },
  {
    code: "PI002",
    category: "Postres Individuales",
    name: "Tiramisú Clásico",
    price: 5500,
    type: "otro",
    img: "img/cake.jpg",
    description: "Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.",
    ingredients: ["Bizcochos","Café","Mascarpone","Azúcar","Cacao"]
  },
  {
    code: "PSA001",
    category: "Productos Sin Azúcar",
    name: "Torta Sin Azúcar de Naranja",
    price: 48000,
    type: "otro",
    img: "img/cake.jpg",
    description: "Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.",
    ingredients: ["Harina","Endulzante","Huevos","Naranja","Aceite"],
    tags: ["sin_azucar"]
  },
  {
    code: "PSA002",
    category: "Productos Sin Azúcar",
    name: "Cheesecake Sin Azúcar",
    price: 47000,
    type: "otro",
    img: "img/cake.jpg",
    description: "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.",
    ingredients: ["Queso crema","Endulzante","Huevos","Base de galletas sin azúcar"],
    tags: ["sin_azucar"]
  },
  {
    code: "PT001",
    category: "Pastelería Tradicional",
    name: "Empanada de Manzana",
    price: 3000,
    type: "otro",
    img: "img/cake.jpg",
    description: "Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.",
    ingredients: ["Harina","Mantequilla","Manzana","Azúcar","Canela"]
  },
  {
    code: "PT002",
    category: "Pastelería Tradicional",
    name: "Tarta de Santiago",
    price: 6000,
    type: "otro",
    img: "img/cake.jpg",
    description: "Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.",
    ingredients: ["Almendras","Azúcar","Huevos","Azúcar flor"]
  },
  {
    code: "PG001",
    category: "Productos sin gluten",
    name: "Brownie Sin Gluten",
    price: 4000,
    type: "otro",
    img: "img/cake.jpg",
    description: "Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.",
    ingredients: ["Chocolate","Mantequilla","Azúcar","Huevos","Harina sin gluten"],
    tags: ["sin_gluten"]
  },
  {
    code: "PG002",
    category: "Productos sin gluten",
    name: "Pan Sin Gluten",
    price: 3500,
    type: "otro",
    img: "img/cake.jpg",
    description: "Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.",
    ingredients: ["Harina sin gluten","Levadura","Agua","Sal","Aceite"],
    tags: ["sin_gluten"]
  },
  {
    code: "PV001",
    category: "Productos Vegana",
    name: "Torta Vegana de Chocolate",
    price: 50000,
    type: "otro",
    img: "img/cake.jpg",
    description: "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.",
    ingredients: ["Harina","Cacao","Azúcar","Leche vegetal","Aceite"],
    tags: ["vegano"]
  },
  {
    code: "PV002",
    category: "Productos Vegana",
    name: "Galletas Veganas de Avena",
    price: 4500,
    type: "otro",
    img: "img/cake.jpg",
    description: "Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.",
    ingredients: ["Avena","Azúcar","Aceite vegetal","Esencia de vainilla"],
    tags: ["vegano"]
  },
  {
    code: "TE001",
    category: "Tortas Especiales",
    name: "Torta Especial de Cumpleaños",
    price: 55000,
    type: "circular",
    img: "img/cake.jpg",
    description: "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.",
    ingredients: ["Harina","Azúcar","Huevos","Vainilla","Crema","Decoraciones"]
  },
  {
    code: "TE002",
    category: "Tortas Especiales",
    name: "Torta Especial de Boda",
    price: 60000,
    type: "circular",
    img: "img/cake.jpg",
    description: "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.",
    ingredients: ["Harina","Azúcar","Huevos","Relleno a elección","Cobertura especial","Decoraciones"]
  }
];
