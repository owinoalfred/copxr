import csv
import yaml
import os
import fnmatch

# Open our data file in write-mode.
csvfile = open('groups.csv', 'w')

# Save a CSV Reader object.
headers = ['name', 'city', 'country', 'iscountry', 'countrycode', 'latitude', 'longitude', 'email', 'publiciseemail', 'diaspora', 'facebook', 'instagram', 'mastodon', 'peertube', 'twitter', 'website', 'youtube']

datawriter = csv.DictWriter(csvfile, fieldnames=headers,  delimiter=',', quotechar='"', extrasaction='ignore')
datawriter.writeheader()

loc = '../_groups'

for dir_path, dirnames, filenames in os.walk(loc):
    print('DOING')
    if dir_path != loc:
        continue
    for filename in fnmatch.filter(filenames, '*.md'):
        yamldat = dict()
        fnloc = os.path.join(dir_path, filename)
        with open(fnloc) as _f:
            inyaml = False
            yamldat[filename] = ''
            for line in _f.readlines():
                line = line.rstrip()
                if not inyaml and line.startswith('---'):
                    inyaml = True
                    continue
                elif line.startswith('---'):
                    break

                if inyaml:
                    yamldat[filename] += line + '\n'

        data_string = yamldat[filename]
        d = yaml.load(data_string)
        try:
            d = {**d, **d['links']}
        except:
            pass
        datawriter.writerow(d)

csvfile.close()
