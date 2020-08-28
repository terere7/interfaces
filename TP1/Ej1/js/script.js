const cols = 10;
const rows = 10;
let max = 0;
let maxEvenRow = 0;//max par
let maxOddRow = 0;//max impar
let rowAverage = [];
let sum;

let matrix = [];
for (let i = 0; i < cols; i++) {
    matrix[i] = [];
    sum = 0;// reset
    for (let j = 0; j < rows; j++) {
        matrix[i][j] = Math.random() * 100;
        sum += matrix[i][j];
        if (matrix[i][j] > max) {
            max = matrix[i][j];
        }
        if (j % 2 == 0) {
            if (matrix[i][j] > maxEvenRow) {
                maxEvenRow = matrix[i][j];
            }
        } else {
            if (matrix[i][j] > maxOddRow) {
                maxOddRow = matrix[i][j];
            }
        }

    }
    rowAverage[i] = sum;
}

console.table(matrix);

console.log("a. El valor maximo de toda la matriz: " + max);
console.log("b. El valor maximo de las filas pares: " + maxEvenRow + "El valor maximo de las filas impares: " + maxOddRow);
//imprimir arreglo, console.array?


