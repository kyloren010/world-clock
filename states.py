import csv
import json

countries = set()

with open('states.csv', 'r', encoding='utf-8') as file:
    csv_reader = csv.reader(file)

    for row in csv_reader:
        countries.add(row[4])

cs_dict = {}

with open('states.csv', 'r', encoding='utf-8') as file:
    for country in countries:
        file.seek(0)
        csv_reader = csv.reader(file)

        sav = []

        for row in csv_reader:
            if country == row[4]:
                sav.append(row[1])

        cs_dict[country] = sav

print(cs_dict)

with open('output.json', 'w', encoding='utf-8') as file:
    json.dump(cs_dict, file)
