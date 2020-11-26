from os import listdir

with open('base-poems.js', 'a') as poemFile:
    poemFile.write('export default [')
    for fileName in listdir('public/poems'):
        with open(f'public/poems/{fileName}', 'r') as f:
            json = f.read()
        poemFile.write(f'{json},\n')
    poemFile.write('];')
