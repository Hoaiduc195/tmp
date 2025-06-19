import random

n = 10
arr = [random.randint(1, 10000) for i in range(0, n)]

for x in arr:
    print(x)

print(len(arr))