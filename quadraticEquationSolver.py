import math


a, b, c = map(float, input("Input coefficients of the equation: ").split())

delta = b*b - 4*a*c

if delta<0:
    print("No solution.")
elif delta==0:
    s = ((-1)*b)/(2*a)
    print(f"The equation has one solution: x = {s}")
elif delta>0:
    s1 = ((-1)*b - math.sqrt(delta))/(2*a)
    s2 = ((-1)*b - math.sqrt(delta))/(2*a)
    print(f"The equation has 2 solutions: x1 = {s1}, x2 = {s2}")

