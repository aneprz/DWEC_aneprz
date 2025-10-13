let num =prompt("Introduce un número entero:");

let esPrimo = true;

if (num<=1) {
  esPrimo=false;
} else {
  for (let i=2; i<=Math.sqrt(num); i++) {
    if (num%i===0) {
      esPrimo=false;
      break;
    }
  }
}

if (esPrimo) {
  alert("El número " +num+ " es primo");
} else {
  alert("El número " +num+ " no es primo");
}
