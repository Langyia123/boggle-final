'''
Name: Langyia Philemon
SID: 004002416
'''
from .randomGen import *
from .readJSONFile import *

class Boggle:
    # constructor: set up the grid, dictionary and helper sets
    def __init__(self, grid, dictionary):
      self.grid = grid  # NxN Boggle board
      self.dictionary = dictionary  # list of valid words
      self.solution = []  # store found words
      self.word_set, self.prefix_set = self._build_sets(dictionary)

    # helper method to build word set and prefix set
    def _build_sets(self, dictionary):
      if dictionary:
        word_set = set(word.upper() for word in dictionary)
      else:
        word_set = set()
      prefix_set = set()
      for word in word_set:
        for i in range(1, len(word) + 1):
          prefix_set.add(word[:i])
      return word_set, prefix_set

    def setDictionary(self, dictionary):
      self.dictionary = dictionary
      self.word_set, self.prefix_set = self._build_sets(dictionary)

    # main function to find all words
    def getSolution(self):
      self.solution = []
      # guard for empty or invalid grids
      if not self.grid or not self.grid[0]:
        return []
      for row in self.grid:
        if len(row) != len(self.grid):
          return []
      rows = len(self.grid)
      cols = len(self.grid[0])
      visited = [[False for _ in range(cols)] for _ in range(rows)]
      found = set()
      for r in range(rows):
        for c in range(cols):
          self._dfs(r, c, "", visited, found, rows, cols)
      self.solution = sorted(found)
      return self.solution

    # DFS helper function
    def _dfs(self, r, c, current_word, visited, found, rows, cols):
      if r < 0 or r >= rows or c < 0 or c >= cols:
        return
      if visited[r][c]:
        return
      letter = str(self.grid[r][c]).upper()
      new_word = current_word + letter
      if new_word not in self.prefix_set:
        return
      if len(new_word) >= 3 and new_word in self.word_set:
        found.add(new_word)
      visited[r][c] = True
      DIRECTIONS = [
        (-1, -1), (-1, 0), (-1, 1),
        (0, -1),          (0, 1),
        (1, -1),  (1, 0), (1, 1)
      ]
      for dr, dc in DIRECTIONS:
        self._dfs(r + dr, c + dc, new_word, visited, found, rows, cols)
      visited[r][c] = False
    
    def getDictionary(self):
      return self.dictionary


def main():
  grid = [["T", "W", "Y", "R"],
  ["E", "N", "P", "H"],
  ["G", "Z", "Qu", "R"],
  ["O", "N", "T", "A"]]
  dictionary = [
    "art", "ego", "gent", "get", "net", "new", "newt",
    "prat", "pry", "qua", "quart", "quartz", "rat",
    "tar", "tarp", "ten", "went", "wet", "arty", "rhr",
    "not", "quar"
  ]
  mygame = Boggle(grid, dictionary)
  print(mygame.getSolution())


if __name__ == "__main__":
  main()
