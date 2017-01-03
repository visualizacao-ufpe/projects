import csv
import json
import datetime

with open('casos-zika.csv', 'r') as file_2015:
    reader1 = csv.DictReader(file_2015.read().replace(';', ',').splitlines())
    json_data = []
    for case in reader1:
        json_data.append(case)

    for x in json_data:
        del x[None]


    with open('zika_data.json', 'w', encoding='utf-8') as outfile:
        json.dump(json_data, outfile, indent=4, sort_keys=True, separators=(',', ':'))
