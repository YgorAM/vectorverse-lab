export type Language = 'javascript' | 'python' | 'java';

export interface LineExplanation {
  line: string;
  en: string;
  ptBR: string;
}

export interface CodeExample {
  id: string;
  title: string;
  description: string;
  category: 'beginner' | 'intermediate';
  code: Record<Language, string>;
  output: Record<Language, string>;
  explanations: Record<Language, LineExplanation[]>;
  matrixResult?: number[][];
}

// ─── Beginner Examples ───

const createVector: CodeExample = {
  id: 'create-vector',
  title: 'Create a Vector',
  description: 'Create a simple vector (array of numbers)',
  category: 'beginner',
  code: {
    javascript: `// Create a Vector in JavaScript
let v = [1, 2, 3];
console.log("Vector:", v);`,
    python: `# Create a Vector in Python
v = [1, 2, 3]
print("Vector:", v)`,
    java: `// Create a Vector in Java
import java.util.Arrays;

public class CreateVector {
    public static void main(String[] args) {
        int[] v = {1, 2, 3};
        System.out.println("Vector: " + Arrays.toString(v));
    }
}`,
  },
  output: {
    javascript: `Vector: [1, 2, 3]`,
    python: `Vector: [1, 2, 3]`,
    java: `Vector: [1, 2, 3]`,
  },
  explanations: {
    javascript: [
      { line: `// Create a Vector in JavaScript`, en: "A comment describing what this code does.", ptBR: "Um comentário descrevendo o que este código faz." },
      { line: `let v = [1, 2, 3];`, en: "Creates a vector (array) with three numbers: 1, 2, and 3.", ptBR: "Cria um vetor (array) com três números: 1, 2 e 3." },
      { line: `console.log("Vector:", v);`, en: "Prints the vector to the console output.", ptBR: "Imprime o vetor na saída do console." },
    ],
    python: [
      { line: `# Create a Vector in Python`, en: "A comment describing what this code does.", ptBR: "Um comentário descrevendo o que este código faz." },
      { line: `v = [1, 2, 3]`, en: "Creates a list with three numbers: 1, 2, and 3.", ptBR: "Cria uma lista com três números: 1, 2 e 3." },
      { line: `print("Vector:", v)`, en: "Prints the vector to the screen.", ptBR: "Imprime o vetor na tela." },
    ],
    java: [
      { line: `int[] v = {1, 2, 3};`, en: "Creates an integer array with three numbers.", ptBR: "Cria um array de inteiros com três números." },
      { line: `System.out.println("Vector: " + Arrays.toString(v));`, en: "Prints the array as a readable string.", ptBR: "Imprime o array como uma string legível." },
    ],
  },
};

const createMatrix: CodeExample = {
  id: 'create-matrix',
  title: 'Create a 3×3 Matrix',
  description: 'Create a 3×3 matrix (2D array)',
  category: 'beginner',
  code: {
    javascript: `// Create a 3x3 Matrix in JavaScript
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
console.log("Matrix:", JSON.stringify(matrix));`,
    python: `# Create a 3x3 Matrix in Python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print("Matrix:", matrix)`,
    java: `// Create a 3x3 Matrix in Java
public class CreateMatrix {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        for (int[] row : matrix) {
            System.out.println(java.util.Arrays.toString(row));
        }
    }
}`,
  },
  output: {
    javascript: `Matrix: [[1,2,3],[4,5,6],[7,8,9]]`,
    python: `Matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]`,
    java: `[1, 2, 3]\n[4, 5, 6]\n[7, 8, 9]`,
  },
  matrixResult: [[1,2,3],[4,5,6],[7,8,9]],
  explanations: {
    javascript: [
      { line: `let matrix = [`, en: "Starts creating a 2D array (matrix).", ptBR: "Começa a criar um array 2D (matriz)." },
      { line: `  [1, 2, 3],`, en: "First row with values 1, 2, 3.", ptBR: "Primeira linha com valores 1, 2, 3." },
      { line: `  [4, 5, 6],`, en: "Second row with values 4, 5, 6.", ptBR: "Segunda linha com valores 4, 5, 6." },
      { line: `  [7, 8, 9]`, en: "Third row with values 7, 8, 9.", ptBR: "Terceira linha com valores 7, 8, 9." },
      { line: `console.log("Matrix:", JSON.stringify(matrix));`, en: "Prints the matrix as text.", ptBR: "Imprime a matriz como texto." },
    ],
    python: [
      { line: `matrix = [`, en: "Starts creating a 2D list (matrix).", ptBR: "Começa a criar uma lista 2D (matriz)." },
      { line: `    [1, 2, 3],`, en: "First row with values 1, 2, 3.", ptBR: "Primeira linha com valores 1, 2, 3." },
      { line: `    [4, 5, 6],`, en: "Second row with values 4, 5, 6.", ptBR: "Segunda linha com valores 4, 5, 6." },
      { line: `    [7, 8, 9]`, en: "Third row with values 7, 8, 9.", ptBR: "Terceira linha com valores 7, 8, 9." },
      { line: `print("Matrix:", matrix)`, en: "Prints the matrix.", ptBR: "Imprime a matriz." },
    ],
    java: [
      { line: `int[][] matrix = {`, en: "Declares a 2D integer array.", ptBR: "Declara um array 2D de inteiros." },
      { line: `{1, 2, 3},`, en: "First row.", ptBR: "Primeira linha." },
      { line: `{4, 5, 6},`, en: "Second row.", ptBR: "Segunda linha." },
      { line: `{7, 8, 9}`, en: "Third row.", ptBR: "Terceira linha." },
      { line: `for (int[] row : matrix)`, en: "Loops through each row.", ptBR: "Percorre cada linha." },
    ],
  },
};

const accessElements: CodeExample = {
  id: 'access-elements',
  title: 'Access Vector Elements',
  description: 'Access specific elements by index',
  category: 'beginner',
  code: {
    javascript: `// Access Vector Elements in JavaScript
let v = [10, 20, 30, 40, 50];
console.log("v[0] =", v[0]);
console.log("v[2] =", v[2]);
console.log("v[4] =", v[4]);`,
    python: `# Access Vector Elements in Python
v = [10, 20, 30, 40, 50]
print("v[0] =", v[0])
print("v[2] =", v[2])
print("v[4] =", v[4])`,
    java: `// Access Vector Elements in Java
public class AccessElements {
    public static void main(String[] args) {
        int[] v = {10, 20, 30, 40, 50};
        System.out.println("v[0] = " + v[0]);
        System.out.println("v[2] = " + v[2]);
        System.out.println("v[4] = " + v[4]);
    }
}`,
  },
  output: {
    javascript: `v[0] = 10\nv[2] = 30\nv[4] = 50`,
    python: `v[0] = 10\nv[2] = 30\nv[4] = 50`,
    java: `v[0] = 10\nv[2] = 30\nv[4] = 50`,
  },
  explanations: {
    javascript: [
      { line: `let v = [10, 20, 30, 40, 50];`, en: "Creates a vector with 5 elements.", ptBR: "Cria um vetor com 5 elementos." },
      { line: `console.log("v[0] =", v[0]);`, en: "Accesses the first element (index 0) → 10.", ptBR: "Acessa o primeiro elemento (índice 0) → 10." },
      { line: `console.log("v[2] =", v[2]);`, en: "Accesses the third element (index 2) → 30.", ptBR: "Acessa o terceiro elemento (índice 2) → 30." },
      { line: `console.log("v[4] =", v[4]);`, en: "Accesses the fifth element (index 4) → 50.", ptBR: "Acessa o quinto elemento (índice 4) → 50." },
    ],
    python: [
      { line: `v = [10, 20, 30, 40, 50]`, en: "Creates a list with 5 elements.", ptBR: "Cria uma lista com 5 elementos." },
      { line: `print("v[0] =", v[0])`, en: "Accesses the first element (index 0) → 10.", ptBR: "Acessa o primeiro elemento (índice 0) → 10." },
      { line: `print("v[2] =", v[2])`, en: "Accesses the third element (index 2) → 30.", ptBR: "Acessa o terceiro elemento (índice 2) → 30." },
      { line: `print("v[4] =", v[4])`, en: "Accesses the fifth element (index 4) → 50.", ptBR: "Acessa o quinto elemento (índice 4) → 50." },
    ],
    java: [
      { line: `int[] v = {10, 20, 30, 40, 50};`, en: "Creates an array with 5 elements.", ptBR: "Cria um array com 5 elementos." },
      { line: `System.out.println("v[0] = " + v[0]);`, en: "Prints the first element → 10.", ptBR: "Imprime o primeiro elemento → 10." },
      { line: `System.out.println("v[2] = " + v[2]);`, en: "Prints the third element → 30.", ptBR: "Imprime o terceiro elemento → 30." },
      { line: `System.out.println("v[4] = " + v[4]);`, en: "Prints the fifth element → 50.", ptBR: "Imprime o quinto elemento → 50." },
    ],
  },
};

const fillVectorLoop: CodeExample = {
  id: 'fill-vector-loop',
  title: 'Fill Vector with Loop',
  description: 'Fill a vector using a loop',
  category: 'beginner',
  code: {
    javascript: `// Fill a Vector Using a Loop
let v = [];
for (let i = 0; i < 5; i++) {
  v.push(i * 10);
}
console.log("Vector:", v);`,
    python: `# Fill a Vector Using a Loop
v = []
for i in range(5):
    v.append(i * 10)
print("Vector:", v)`,
    java: `// Fill a Vector Using a Loop
public class FillVector {
    public static void main(String[] args) {
        int[] v = new int[5];
        for (int i = 0; i < 5; i++) {
            v[i] = i * 10;
        }
        System.out.println(java.util.Arrays.toString(v));
    }
}`,
  },
  output: {
    javascript: `Vector: [0, 10, 20, 30, 40]`,
    python: `Vector: [0, 10, 20, 30, 40]`,
    java: `[0, 10, 20, 30, 40]`,
  },
  explanations: {
    javascript: [
      { line: `let v = [];`, en: "Creates an empty array.", ptBR: "Cria um array vazio." },
      { line: `for (let i = 0; i < 5; i++) {`, en: "Loops from i=0 to i=4 (5 times).", ptBR: "Repete de i=0 até i=4 (5 vezes)." },
      { line: `  v.push(i * 10);`, en: "Adds i×10 to the end of the array.", ptBR: "Adiciona i×10 ao final do array." },
      { line: `console.log("Vector:", v);`, en: "Prints the filled vector: [0, 10, 20, 30, 40].", ptBR: "Imprime o vetor preenchido: [0, 10, 20, 30, 40]." },
    ],
    python: [
      { line: `v = []`, en: "Creates an empty list.", ptBR: "Cria uma lista vazia." },
      { line: `for i in range(5):`, en: "Loops from i=0 to i=4.", ptBR: "Repete de i=0 até i=4." },
      { line: `    v.append(i * 10)`, en: "Appends i×10 to the list.", ptBR: "Adiciona i×10 à lista." },
      { line: `print("Vector:", v)`, en: "Prints the filled vector.", ptBR: "Imprime o vetor preenchido." },
    ],
    java: [
      { line: `int[] v = new int[5];`, en: "Creates an array of size 5.", ptBR: "Cria um array de tamanho 5." },
      { line: `for (int i = 0; i < 5; i++) {`, en: "Loops 5 times.", ptBR: "Repete 5 vezes." },
      { line: `v[i] = i * 10;`, en: "Sets each element to i×10.", ptBR: "Define cada elemento como i×10." },
    ],
  },
};

const fillMatrixLoops: CodeExample = {
  id: 'fill-matrix-loops',
  title: 'Fill Matrix with Loops',
  description: 'Fill a 3×3 matrix using nested loops',
  category: 'beginner',
  code: {
    javascript: `// Fill a Matrix Using Nested Loops
let matrix = [];
for (let i = 0; i < 3; i++) {
  matrix[i] = [];
  for (let j = 0; j < 3; j++) {
    matrix[i][j] = i + j;
  }
}
console.log("Matrix:", JSON.stringify(matrix));`,
    python: `# Fill a Matrix Using Nested Loops
matrix = []
for i in range(3):
    row = []
    for j in range(3):
        row.append(i + j)
    matrix.append(row)
print("Matrix:", matrix)`,
    java: `// Fill a Matrix Using Nested Loops
public class FillMatrix {
    public static void main(String[] args) {
        int[][] matrix = new int[3][3];
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                matrix[i][j] = i + j;
            }
        }
        for (int[] row : matrix) {
            System.out.println(java.util.Arrays.toString(row));
        }
    }
}`,
  },
  output: {
    javascript: `Matrix: [[0,1,2],[1,2,3],[2,3,4]]`,
    python: `Matrix: [[0, 1, 2], [1, 2, 3], [2, 3, 4]]`,
    java: `[0, 1, 2]\n[1, 2, 3]\n[2, 3, 4]`,
  },
  matrixResult: [[0,1,2],[1,2,3],[2,3,4]],
  explanations: {
    javascript: [
      { line: `let matrix = [];`, en: "Creates an empty array for the matrix.", ptBR: "Cria um array vazio para a matriz." },
      { line: `for (let i = 0; i < 3; i++) {`, en: "Outer loop: iterates over rows (0, 1, 2).", ptBR: "Loop externo: percorre as linhas (0, 1, 2)." },
      { line: `  matrix[i] = [];`, en: "Creates an empty row for each i.", ptBR: "Cria uma linha vazia para cada i." },
      { line: `  for (let j = 0; j < 3; j++) {`, en: "Inner loop: iterates over columns (0, 1, 2).", ptBR: "Loop interno: percorre as colunas (0, 1, 2)." },
      { line: `    matrix[i][j] = i + j;`, en: "Sets the value at row i, column j to i+j.", ptBR: "Define o valor na linha i, coluna j como i+j." },
      { line: `console.log("Matrix:", JSON.stringify(matrix));`, en: "Prints the completed matrix.", ptBR: "Imprime a matriz completa." },
    ],
    python: [
      { line: `matrix = []`, en: "Creates an empty list for the matrix.", ptBR: "Cria uma lista vazia para a matriz." },
      { line: `for i in range(3):`, en: "Outer loop: iterates over rows.", ptBR: "Loop externo: percorre as linhas." },
      { line: `    row = []`, en: "Creates a new empty row.", ptBR: "Cria uma nova linha vazia." },
      { line: `    for j in range(3):`, en: "Inner loop: iterates over columns.", ptBR: "Loop interno: percorre as colunas." },
      { line: `        row.append(i + j)`, en: "Adds the value i+j to the row.", ptBR: "Adiciona o valor i+j à linha." },
      { line: `    matrix.append(row)`, en: "Adds the completed row to the matrix.", ptBR: "Adiciona a linha completa à matriz." },
    ],
    java: [
      { line: `int[][] matrix = new int[3][3];`, en: "Creates a 3×3 integer matrix.", ptBR: "Cria uma matriz 3×3 de inteiros." },
      { line: `for (int i = 0; i < 3; i++)`, en: "Outer loop: rows.", ptBR: "Loop externo: linhas." },
      { line: `for (int j = 0; j < 3; j++)`, en: "Inner loop: columns.", ptBR: "Loop interno: colunas." },
      { line: `matrix[i][j] = i + j;`, en: "Sets each cell to i+j.", ptBR: "Define cada célula como i+j." },
    ],
  },
};

const printMatrix: CodeExample = {
  id: 'print-matrix',
  title: 'Print Matrix Values',
  description: 'Print each element of a matrix',
  category: 'beginner',
  code: {
    javascript: `// Print Matrix Values
let matrix = [[1, 2], [3, 4], [5, 6]];
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    console.log("matrix[" + i + "][" + j + "] = " + matrix[i][j]);
  }
}`,
    python: `# Print Matrix Values
matrix = [[1, 2], [3, 4], [5, 6]]
for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        print(f"matrix[{i}][{j}] = {matrix[i][j]}")`,
    java: `// Print Matrix Values
public class PrintMatrix {
    public static void main(String[] args) {
        int[][] matrix = {{1, 2}, {3, 4}, {5, 6}};
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.println("matrix[" + i + "][" + j + "] = " + matrix[i][j]);
            }
        }
    }
}`,
  },
  output: {
    javascript: `matrix[0][0] = 1\nmatrix[0][1] = 2\nmatrix[1][0] = 3\nmatrix[1][1] = 4\nmatrix[2][0] = 5\nmatrix[2][1] = 6`,
    python: `matrix[0][0] = 1\nmatrix[0][1] = 2\nmatrix[1][0] = 3\nmatrix[1][1] = 4\nmatrix[2][0] = 5\nmatrix[2][1] = 6`,
    java: `matrix[0][0] = 1\nmatrix[0][1] = 2\nmatrix[1][0] = 3\nmatrix[1][1] = 4\nmatrix[2][0] = 5\nmatrix[2][1] = 6`,
  },
  matrixResult: [[1,2],[3,4],[5,6]],
  explanations: {
    javascript: [
      { line: `let matrix = [[1, 2], [3, 4], [5, 6]];`, en: "Creates a 3×2 matrix.", ptBR: "Cria uma matriz 3×2." },
      { line: `for (let i = 0; i < matrix.length; i++) {`, en: "Loops through each row.", ptBR: "Percorre cada linha." },
      { line: `  for (let j = 0; j < matrix[i].length; j++) {`, en: "Loops through each column in the row.", ptBR: "Percorre cada coluna na linha." },
      { line: `    console.log("matrix[" + i + "][" + j + "] = " + matrix[i][j]);`, en: "Prints the position and value of each element.", ptBR: "Imprime a posição e valor de cada elemento." },
    ],
    python: [
      { line: `matrix = [[1, 2], [3, 4], [5, 6]]`, en: "Creates a 3×2 matrix.", ptBR: "Cria uma matriz 3×2." },
      { line: `for i in range(len(matrix)):`, en: "Loops through each row.", ptBR: "Percorre cada linha." },
      { line: `    for j in range(len(matrix[i])):`, en: "Loops through each column.", ptBR: "Percorre cada coluna." },
      { line: `        print(f"matrix[{i}][{j}] = {matrix[i][j]}")`, en: "Prints each element's position and value.", ptBR: "Imprime a posição e valor de cada elemento." },
    ],
    java: [
      { line: `int[][] matrix = {{1, 2}, {3, 4}, {5, 6}};`, en: "Creates a 3×2 matrix.", ptBR: "Cria uma matriz 3×2." },
      { line: `for (int i = 0; i < matrix.length; i++)`, en: "Loops through rows.", ptBR: "Percorre as linhas." },
      { line: `for (int j = 0; j < matrix[i].length; j++)`, en: "Loops through columns.", ptBR: "Percorre as colunas." },
      { line: `System.out.println(...)`, en: "Prints position and value.", ptBR: "Imprime posição e valor." },
    ],
  },
};

// ─── Intermediate Examples (original ones, with explanations added) ───

const vectorAddition: CodeExample = {
  id: 'vector-addition',
  title: 'Vector Addition',
  description: 'Add two vectors component-wise',
  category: 'intermediate',
  code: {
    javascript: `// Vector Addition in JavaScript
const vectorA = [3, 5, 2];
const vectorB = [1, 4, 6];

function addVectors(a, b) {
  return a.map((val, i) => val + b[i]);
}

const result = addVectors(vectorA, vectorB);
console.log("Vector A:", vectorA);
console.log("Vector B:", vectorB);
console.log("A + B =", result);`,
    python: `# Vector Addition in Python
vector_a = [3, 5, 2]
vector_b = [1, 4, 6]

def add_vectors(a, b):
    return [x + y for x, y in zip(a, b)]

result = add_vectors(vector_a, vector_b)
print("Vector A:", vector_a)
print("Vector B:", vector_b)
print("A + B =", result)`,
    java: `// Vector Addition in Java
public class VectorAddition {
    public static int[] addVectors(int[] a, int[] b) {
        int[] result = new int[a.length];
        for (int i = 0; i < a.length; i++) {
            result[i] = a[i] + b[i];
        }
        return result;
    }

    public static void main(String[] args) {
        int[] vectorA = {3, 5, 2};
        int[] vectorB = {1, 4, 6};
        int[] result = addVectors(vectorA, vectorB);
        System.out.println("Vector A: [3, 5, 2]");
        System.out.println("Vector B: [1, 4, 6]");
        System.out.println("A + B = [" + result[0] + ", " + result[1] + ", " + result[2] + "]");
    }
}`,
  },
  output: {
    javascript: `Vector A: [3, 5, 2]\nVector B: [1, 4, 6]\nA + B = [4, 9, 8]`,
    python: `Vector A: [3, 5, 2]\nVector B: [1, 4, 6]\nA + B = [4, 9, 8]`,
    java: `Vector A: [3, 5, 2]\nVector B: [1, 4, 6]\nA + B = [4, 9, 8]`,
  },
  explanations: {
    javascript: [
      { line: `const vectorA = [3, 5, 2];`, en: "Creates the first vector.", ptBR: "Cria o primeiro vetor." },
      { line: `const vectorB = [1, 4, 6];`, en: "Creates the second vector.", ptBR: "Cria o segundo vetor." },
      { line: `return a.map((val, i) => val + b[i]);`, en: "Adds each pair of elements: a[i] + b[i].", ptBR: "Soma cada par de elementos: a[i] + b[i]." },
    ],
    python: [
      { line: `vector_a = [3, 5, 2]`, en: "Creates the first vector.", ptBR: "Cria o primeiro vetor." },
      { line: `return [x + y for x, y in zip(a, b)]`, en: "Pairs and adds corresponding elements.", ptBR: "Emparelha e soma os elementos correspondentes." },
    ],
    java: [
      { line: `result[i] = a[i] + b[i];`, en: "Adds elements at each index.", ptBR: "Soma elementos em cada índice." },
    ],
  },
};

const dotProduct: CodeExample = {
  id: 'dot-product',
  title: 'Dot Product',
  description: 'Calculate the dot product of two vectors',
  category: 'intermediate',
  code: {
    javascript: `// Dot Product in JavaScript
const vectorA = [2, 3, 5];
const vectorB = [4, 1, 2];

function dotProduct(a, b) {
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

const result = dotProduct(vectorA, vectorB);
console.log("Vector A:", vectorA);
console.log("Vector B:", vectorB);
console.log("A · B =", result);
console.log("Calculation: 2×4 + 3×1 + 5×2 =", result);`,
    python: `# Dot Product in Python
vector_a = [2, 3, 5]
vector_b = [4, 1, 2]

def dot_product(a, b):
    return sum(x * y for x, y in zip(a, b))

result = dot_product(vector_a, vector_b)
print("Vector A:", vector_a)
print("Vector B:", vector_b)
print("A · B =", result)
print(f"Calculation: 2×4 + 3×1 + 5×2 = {result}")`,
    java: `// Dot Product in Java
public class DotProduct {
    public static int dotProduct(int[] a, int[] b) {
        int sum = 0;
        for (int i = 0; i < a.length; i++) {
            sum += a[i] * b[i];
        }
        return sum;
    }

    public static void main(String[] args) {
        int[] vectorA = {2, 3, 5};
        int[] vectorB = {4, 1, 2};
        int result = dotProduct(vectorA, vectorB);
        System.out.println("Vector A: [2, 3, 5]");
        System.out.println("Vector B: [4, 1, 2]");
        System.out.println("A · B = " + result);
        System.out.println("Calculation: 2×4 + 3×1 + 5×2 = " + result);
    }
}`,
  },
  output: {
    javascript: `Vector A: [2, 3, 5]\nVector B: [4, 1, 2]\nA · B = 21\nCalculation: 2×4 + 3×1 + 5×2 = 21`,
    python: `Vector A: [2, 3, 5]\nVector B: [4, 1, 2]\nA · B = 21\nCalculation: 2×4 + 3×1 + 5×2 = 21`,
    java: `Vector A: [2, 3, 5]\nVector B: [4, 1, 2]\nA · B = 21\nCalculation: 2×4 + 3×1 + 5×2 = 21`,
  },
  explanations: {
    javascript: [
      { line: `return a.reduce((sum, val, i) => sum + val * b[i], 0);`, en: "Multiplies each pair and sums: 2×4 + 3×1 + 5×2 = 21.", ptBR: "Multiplica cada par e soma: 2×4 + 3×1 + 5×2 = 21." },
    ],
    python: [
      { line: `return sum(x * y for x, y in zip(a, b))`, en: "Multiplies pairs and sums them.", ptBR: "Multiplica os pares e soma." },
    ],
    java: [
      { line: `sum += a[i] * b[i];`, en: "Accumulates the product of each pair.", ptBR: "Acumula o produto de cada par." },
    ],
  },
};

const matrixMultiplication: CodeExample = {
  id: 'matrix-multiplication',
  title: 'Matrix Multiplication',
  description: 'Multiply two 2×2 matrices',
  category: 'intermediate',
  code: {
    javascript: `// Matrix Multiplication in JavaScript
const matrixA = [[1, 2], [3, 4]];
const matrixB = [[5, 6], [7, 8]];

function multiplyMatrices(a, b) {
  const rows = a.length, cols = b[0].length;
  const result = Array.from({ length: rows }, () => Array(cols).fill(0));
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      for (let k = 0; k < b.length; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return result;
}

const result = multiplyMatrices(matrixA, matrixB);
console.log("Matrix A:", JSON.stringify(matrixA));
console.log("Matrix B:", JSON.stringify(matrixB));
console.log("A × B:", JSON.stringify(result));`,
    python: `# Matrix Multiplication in Python
matrix_a = [[1, 2], [3, 4]]
matrix_b = [[5, 6], [7, 8]]

def multiply_matrices(a, b):
    rows, cols = len(a), len(b[0])
    result = [[0] * cols for _ in range(rows)]
    for i in range(rows):
        for j in range(cols):
            for k in range(len(b)):
                result[i][j] += a[i][k] * b[k][j]
    return result

result = multiply_matrices(matrix_a, matrix_b)
print("Matrix A:", matrix_a)
print("Matrix B:", matrix_b)
print("A × B:", result)`,
    java: `// Matrix Multiplication in Java
import java.util.Arrays;

public class MatrixMultiplication {
    public static int[][] multiply(int[][] a, int[][] b) {
        int rows = a.length, cols = b[0].length;
        int[][] result = new int[rows][cols];
        for (int i = 0; i < rows; i++)
            for (int j = 0; j < cols; j++)
                for (int k = 0; k < b.length; k++)
                    result[i][j] += a[i][k] * b[k][j];
        return result;
    }

    public static void main(String[] args) {
        int[][] a = {{1, 2}, {3, 4}};
        int[][] b = {{5, 6}, {7, 8}};
        int[][] result = multiply(a, b);
        System.out.println("A × B = [[" + result[0][0] + ", " + result[0][1] + "], [" + result[1][0] + ", " + result[1][1] + "]]");
    }
}`,
  },
  output: {
    javascript: `Matrix A: [[1,2],[3,4]]\nMatrix B: [[5,6],[7,8]]\nA × B: [[19,22],[43,50]]`,
    python: `Matrix A: [[1, 2], [3, 4]]\nMatrix B: [[5, 6], [7, 8]]\nA × B: [[19, 22], [43, 50]]`,
    java: `A × B = [[19, 22], [43, 50]]`,
  },
  matrixResult: [[19,22],[43,50]],
  explanations: {
    javascript: [
      { line: `const matrixA = [[1, 2], [3, 4]];`, en: "Creates a 2×2 matrix A.", ptBR: "Cria uma matriz A 2×2." },
      { line: `result[i][j] += a[i][k] * b[k][j];`, en: "Accumulates dot products of row i and column j.", ptBR: "Acumula os produtos escalares da linha i e coluna j." },
    ],
    python: [
      { line: `result[i][j] += a[i][k] * b[k][j]`, en: "Multiplies and accumulates for each cell.", ptBR: "Multiplica e acumula para cada célula." },
    ],
    java: [
      { line: `result[i][j] += a[i][k] * b[k][j];`, en: "Computes dot product for cell [i][j].", ptBR: "Calcula o produto escalar para a célula [i][j]." },
    ],
  },
};

const scalarMultiplication: CodeExample = {
  id: 'scalar-multiplication',
  title: 'Scalar Multiplication',
  description: 'Multiply a vector by a scalar value',
  category: 'intermediate',
  code: {
    javascript: `// Scalar Multiplication in JavaScript
const vector = [3, 7, 2];
const scalar = 4;

function scalarMultiply(vec, s) {
  return vec.map(v => v * s);
}

const result = scalarMultiply(vector, scalar);
console.log("Vector:", vector);
console.log("Scalar:", scalar);
console.log("Result:", result);`,
    python: `# Scalar Multiplication in Python
vector = [3, 7, 2]
scalar = 4

def scalar_multiply(vec, s):
    return [v * s for v in vec]

result = scalar_multiply(vector, scalar)
print("Vector:", vector)
print("Scalar:", scalar)
print("Result:", result)`,
    java: `// Scalar Multiplication in Java
public class ScalarMultiplication {
    public static int[] scalarMultiply(int[] vec, int s) {
        int[] result = new int[vec.length];
        for (int i = 0; i < vec.length; i++)
            result[i] = vec[i] * s;
        return result;
    }

    public static void main(String[] args) {
        int[] vector = {3, 7, 2};
        int scalar = 4;
        int[] result = scalarMultiply(vector, scalar);
        System.out.println("Vector: [3, 7, 2]");
        System.out.println("Scalar: 4");
        System.out.println("Result: [" + result[0] + ", " + result[1] + ", " + result[2] + "]");
    }
}`,
  },
  output: {
    javascript: `Vector: [3, 7, 2]\nScalar: 4\nResult: [12, 28, 8]`,
    python: `Vector: [3, 7, 2]\nScalar: 4\nResult: [12, 28, 8]`,
    java: `Vector: [3, 7, 2]\nScalar: 4\nResult: [12, 28, 8]`,
  },
  explanations: {
    javascript: [
      { line: `return vec.map(v => v * s);`, en: "Multiplies each element by 4: [3×4, 7×4, 2×4].", ptBR: "Multiplica cada elemento por 4: [3×4, 7×4, 2×4]." },
    ],
    python: [
      { line: `return [v * s for v in vec]`, en: "Multiplies each element by the scalar.", ptBR: "Multiplica cada elemento pelo escalar." },
    ],
    java: [
      { line: `result[i] = vec[i] * s;`, en: "Multiplies each element by s.", ptBR: "Multiplica cada elemento por s." },
    ],
  },
};

const matrixTranspose: CodeExample = {
  id: 'matrix-transpose',
  title: 'Matrix Transpose',
  description: 'Transpose a matrix (swap rows and columns)',
  category: 'intermediate',
  code: {
    javascript: `// Matrix Transpose in JavaScript
const matrix = [[1, 2, 3], [4, 5, 6]];

function transpose(m) {
  return m[0].map((_, i) => m.map(row => row[i]));
}

const result = transpose(matrix);
console.log("Original:", JSON.stringify(matrix));
console.log("Transposed:", JSON.stringify(result));`,
    python: `# Matrix Transpose in Python
matrix = [[1, 2, 3], [4, 5, 6]]

def transpose(m):
    return [list(row) for row in zip(*m)]

result = transpose(matrix)
print("Original:", matrix)
print("Transposed:", result)`,
    java: `// Matrix Transpose in Java
public class MatrixTranspose {
    public static int[][] transpose(int[][] m) {
        int[][] result = new int[m[0].length][m.length];
        for (int i = 0; i < m.length; i++)
            for (int j = 0; j < m[0].length; j++)
                result[j][i] = m[i][j];
        return result;
    }

    public static void main(String[] args) {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}};
        int[][] result = transpose(matrix);
        System.out.println("Original: [[1, 2, 3], [4, 5, 6]]");
        System.out.println("Transposed: [[" + result[0][0] + ", " + result[0][1] + "], [" + result[1][0] + ", " + result[1][1] + "], [" + result[2][0] + ", " + result[2][1] + "]]");
    }
}`,
  },
  output: {
    javascript: `Original: [[1,2,3],[4,5,6]]\nTransposed: [[1,4],[2,5],[3,6]]`,
    python: `Original: [[1, 2, 3], [4, 5, 6]]\nTransposed: [[1, 4], [2, 5], [3, 6]]`,
    java: `Original: [[1, 2, 3], [4, 5, 6]]\nTransposed: [[1, 4], [2, 5], [3, 6]]`,
  },
  matrixResult: [[1,4],[2,5],[3,6]],
  explanations: {
    javascript: [
      { line: `return m[0].map((_, i) => m.map(row => row[i]));`, en: "Swaps rows and columns by picking column i from each row.", ptBR: "Troca linhas e colunas pegando a coluna i de cada linha." },
    ],
    python: [
      { line: `return [list(row) for row in zip(*m)]`, en: "zip(*m) unpacks rows and groups by column.", ptBR: "zip(*m) desempacota linhas e agrupa por coluna." },
    ],
    java: [
      { line: `result[j][i] = m[i][j];`, en: "Swaps row and column indices.", ptBR: "Troca os índices de linha e coluna." },
    ],
  },
};

export const codeExamples: CodeExample[] = [
  createVector,
  createMatrix,
  accessElements,
  fillVectorLoop,
  fillMatrixLoops,
  printMatrix,
  vectorAddition,
  dotProduct,
  matrixMultiplication,
  scalarMultiplication,
  matrixTranspose,
];

export const defaultCode: Record<Language, string> = {
  javascript: `// Write your vector/matrix code here
const v = [1, 2, 3];
console.log("Hello, Linear Algebra!", v);`,
  python: `# Write your vector/matrix code here
v = [1, 2, 3]
print("Hello, Linear Algebra!", v)`,
  java: `// Write your vector/matrix code here
public class Main {
    public static void main(String[] args) {
        int[] v = {1, 2, 3};
        System.out.println("Hello, Linear Algebra!");
    }
}`,
};
