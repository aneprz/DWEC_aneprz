let numero;
let maximo=0;
let minimo=10000000000000;

do {
  numero=prompt("Introduce un número entero positivo (0 para terminar):");

  if (numero>0) {
    if (numero>maximo) {
      maximo=numero;
    }
    if (numero<minimo) {
      minimo=numero;
    }
  } else if (numero<0) {
    console.log("Solo se permiten números positivos");
  }

}while(numero!==0);

if (maximo===0) {
  console.log("No has introducido ningún número positivo");
} else {
  console.log("Número máximo: "+maximo+"\nNúmero mínimo: "+minimo);
}
