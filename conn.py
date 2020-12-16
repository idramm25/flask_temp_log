import requests
from bs4 import BeautifulSoup


def connect(url):
    try:
        r = requests.get(url)
        r.encoding = 'utf8'
        soup = BeautifulSoup(r.text, 'lxml')
        head = soup.find_all('b')
        heads = []
        for i in head:
            heads.append(i.string)
        return heads
    except:
        return None, None