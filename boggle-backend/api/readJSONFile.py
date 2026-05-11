import json

def read_json_to_list(path):
  with open(path, "r") as f:
    return json.load(f)