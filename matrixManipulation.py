import numpy as np


def inputMatrix():
    r = int(input("Rows number of matrix: "))
    c = int(input("Column number of matrix: "))
    matrix = []
    for i in range(r):
        print(f"Enter numbers of row {i+1}")
        newRow = list(map(float, input().split()))
        matrix.append(newRow)
    return np.array(matrix)

def printMatrix(matrix):
    r = len(matrix)
    c = len(matrix[0])

    for i in range(r):
        for j in range(c):
            print(f"{matrix[i][j]} ", end="")
        print("")
        
print("Input matrix A: ")
matrixA = inputMatrix()
print("Input matrix B: ")
matrixB = inputMatrix()

printMatrix(matrixA)
printMatrix(matrixB)

print("Choose operations: ")
print("1. Sum matrix.")
print("2. Multiply Matrix.")
print("3. Transpose Matrix")

choice = 1

while(choice!=0):
    choice = int(input("Your choice: "))
    if choice == 1:
        matrixAns = matrixA+matrixB
        printMatrix(matrixAns)
    elif choice == 2:
        matrixAns = matrixA @ matrixB
        printMatrix(matrixAns)
    elif choice == 3:
        printMatrix(np.transpose(matrixA))
        print("")
        printMatrix(np.transpose(matrixB))




        
