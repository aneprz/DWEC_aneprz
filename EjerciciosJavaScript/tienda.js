let productos=[
    ["monitor", 200],
    ["teclado", 50],
    ["raton", 30]
];

function obtenerPrecio(producto){
    for (let i=0;i<productos.length;i++) {
        if(productos[i][0]===producto.toLowerCase()){
            return productos[i][1];
        }
    }
    return "No se encuentra el producto";
}