let cantidad=12;
let precioUnitario=50;

let total=cantidad*precioUnitario;

if (cantidad>10 && precioUnitario>40) {
    total=total*0.85;
    console.log("Total a pagar con descuento:", total, "€");
} else {
    console.log("Total a pagar sin descuento:", total, "€");
}
