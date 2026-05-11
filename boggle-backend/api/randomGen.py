import random
import string

def random_grid(size):
  return [
    [random.choice(string.ascii_uppercase) for _ in range(size)]
    for _ in range(size)
    ]