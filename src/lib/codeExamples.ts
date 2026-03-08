export type Language = 'javascript' | 'python' | 'java';

export interface CodeExample {
  id: string;
  title: string;
  description: string;
  code: Record<Language, string>;
  output: Record<Language, string>;
}

export const codeExamples: CodeExample[] = [
  {
    id: 'vector-addition',
    title: 'Vector Addition',
    description: 'Add two vectors component-wise',
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
  },
  {
    id: 'dot-product',
    title: 'Dot Product',
    description: 'Calculate the dot product of two vectors',
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
  },
  {
    id: 'matrix-multiplication',
    title: 'Matrix Multiplication',
    description: 'Multiply two 2×2 matrices',
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
  },
  {
    id: 'scalar-multiplication',
    title: 'Scalar Multiplication',
    description: 'Multiply a vector by a scalar value',
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
  },
  {
    id: 'matrix-transpose',
    title: 'Matrix Transpose',
    description: 'Transpose a matrix (swap rows and columns)',
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
  },
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
