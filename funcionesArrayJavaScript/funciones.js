let arr = [95, 95, 14, 83, 58, 33, 65, 52, 7, 72, 13, 46, 19, 31,
27, 36, 30, 86, 88, 88, 68, 16, 5, 14, 41, 56, 89, 11, 6, 29, 72,
11, 69, 36, 16, 11, 82, 84, 32, 84, 95, 98, 76, 99, 100, 12, 89, 1,
92, 27, 66, 48, 38, 49, 30, 40, 87, 19, 31, 37, 5, 32, 9, 33, 98,
94, 5, 15, 4, 88, 47, 34, 83, 8, 31, 4, 2, 72, 31, 39, 15, 10, 46,
78, 11, 21, 92, 22, 83, 3, 6, 71, 39, 54, 50, 77, 13, 85, 7, 36 ];

function ordenar(arrOriginal) {
    let copiaArr=[...arrOriginal];
    let arrOrdenado=[];

    while(copiaArr.length>0){
        let minimo=Math.min(...copiaArr);
        arrOrdenado.push(minimo);

        let indice=copiaArr.indexOf(minimo);
        copiaArr.splice(indice, 1);
    }

    return arrOrdenado;
}

function imparesOrdenados(arrOriginal) {
    let copiaArr=[];
    let arrImparesOrdenado=[];
    let cont=0;

    for (let i = 0; i < arrOriginal.length; i++) {
        if (arrOriginal[i]%2!=0) {
            copiaArr[cont]=arrOriginal[i];
            cont++;
        }
    }

    while(copiaArr.length>0){
        let minimo=Math.min(...copiaArr);
        arrImparesOrdenado.push(minimo);

        let indice=copiaArr.indexOf(minimo);
        copiaArr.splice(indice, 1);
    }

    return arrImparesOrdenado;
}

function imparesDosCifras(arrOriginal) {
    arrImparesOrdenado=imparesOrdenados(arrOriginal);
    let copiaArr=[];
    let cont=0;

    for (let i = 0; i < arrImparesOrdenado.length; i++) {
        if (arrImparesOrdenado[i]>9 && arrImparesOrdenado[i]<100) {
            copiaArr[cont]=arrImparesOrdenado[i];
            cont++;
        }        
    }

    return copiaArr;
}

function frecuencia(arrOriginal) {
    let cont={};

    for (let i = 0; i < arrOriginal.length; i++) {
        if (cont[arrOriginal[i]]) {
            cont[arrOriginal[i]]++;
        }else{
            cont[arrOriginal[i]]=1;
        }
    }

    let freqArray=arr.map(el=>cont[el]);
    return freqArray;
}