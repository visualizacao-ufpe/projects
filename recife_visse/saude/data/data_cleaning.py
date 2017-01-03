import csv
import json
import configargparse
import os

p = configargparse.ArgParser(default_config_files=[os.path.join(os.path.dirname(__file__), "headers.yaml")])
p.add('--input_file', action = "append")
p.add('--output_file')
p.add('--headers', action = "append")

args = vars(p.parse_args())

json_data = []

for input_file in args['input_file']:
    with open(input_file, 'r') as file:
        reader = csv.DictReader(file.read().replace(';', ',').splitlines())
        for case in reader:
            entry = {}
            for header in args['headers']:
                entry[header] = case[header]
            json_data.append(entry)

with open(args['output_file'], 'w', encoding='utf-8') as outfile:
        json.dump(json_data, outfile, indent=4, sort_keys=True, separators=(',', ':'))
