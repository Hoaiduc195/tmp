name = input("Input your name: ")

len = len(name)
hasSpaces = name.find(" ") != -1
hasDigits = name.isalpha() is False

if len > 12 or hasSpaces or hasDigits:
    print(f"{name} is not valid.")
else:
    print(f"{name} is valid.")

