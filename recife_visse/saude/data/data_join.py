import csv
import json
import datetime

with open('casos-dengue2015.csv', 'r') as file_2015:
    with open('casos-dengue2016.csv', 'r') as file_2016:
        reader1 = csv.DictReader(file_2015.read().replace(';', ',').splitlines())
        reader2 = csv.DictReader(file_2016.read().replace(';', ',').splitlines())
        json_data = []
        for case in reader1:
            json_data.append(case)
        for case in reader2:
            json_data.append(case)
        with open('dengue_data.json', 'w', encoding='utf-8') as outfile:
            json.dump(json_data, outfile, indent=4, sort_keys=True, separators=(',', ':'))
