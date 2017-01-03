import json

with open('data.json') as json_data:
    dataset = json.load(json_data)
    index = 0
    for data in dataset:
        data['index'] = index
        index+=1

with open('data_with_index.json', 'w') as outfile:
    json.dump(dataset, outfile)
