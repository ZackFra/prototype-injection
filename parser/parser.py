from urllib.request import urlopen
from bs4 import BeautifulSoup as soup
import json

def scrape():
    url = 'https://www.public-domain-poetry.com/'
    homepage = urlopen(url)
    html = homepage.read()
    homepage.close()
    page_soup = soup(html, 'html.parser')
    table = page_soup.find(name='table', attrs={'cellspacing': '8', 'width': '95%', 'cellpadding': '0', 'bordercolor': 'white', 'border': '0'})
    links = table.findAll(name='a')
    
    titles = []
    authors = []
    for i in range(len(links)):
        if i % 2 == 0:
            titles.append(links[i])
        else:
            authors.append(links[i])
    
    json_arr = []
    for i in range(len(titles)):
        json_data = {'author': authors[i].text, 'title': titles[i].text}
        poem_page = urlopen(f'{url}{titles[i]["href"]}')
        poem_html = poem_page.read()
        poem_page.close()
        poem_soup = soup(poem_html, 'html.parser')
        poem = poem_soup.find(name='font', attrs={'class': 't3a'})
        json_data["content"] = poem.text
        json_arr.append(json_data)
    return json_arr

def parse_and_save(json_arr):
    for json_data in json_arr:
        json_str = json.dumps(json_data)
        with open(f'poems/{json_data["title"]}.json', 'w') as f:
            f.write(json_str)

if __name__ == '__main__':
    json_arr = scrape()
    parse_and_save(json_arr)
