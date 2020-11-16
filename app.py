## flask1
import os

from flask import Flask, render_template, jsonify
from flask import send_from_directory
from flask_sqlalchemy import *
from bs4 import BeautifulSoup
import time
import requests

from mysqltojson import getjson
from mysqltocsv import mysql_to_csv

from flaskr import *
from apscheduler.scheduler import Scheduler

app = Flask(__name__, static_url_path='/static')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:admin-mysql25@localhost/log_temp_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["CLIENT_JSON"] = "/home/smart-server/projects/flask2/api/get-json"
db = SQLAlchemy(app)

"""-----------------------------------------------------------------------------------------------"""
# Start the scheduler
sched = Scheduler()
sched.start()


# Schedule job_function to be called every two hours
@sched.interval_schedule(minutes=30)
def sensor():
    getparse()
    print(time.strftime('%H:%M %d/%m/%Y') + " Getting data from sensor's")


"""-----------------------------------------------------------------------------------------------"""


class Temp(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    in_temp = db.Column(db.String(5), unique=False)
    out_temp = db.Column(db.String(5), unique=False)
    heat_temp = db.Column(db.String(5), unique=False)
    heating = db.Column(db.Integer, unique=False)
    light = db.Column(db.Integer, unique=False)
    pub_time = db.Column(db.String(2), unique=False)
    pub_date = db.Column(db.String(10), unique=False)

    def __init__(self, in_temp, out_temp, heat_temp, heating, light, pub_time, pub_date):
        self.in_temp = in_temp
        self.out_temp = out_temp
        self.heat_temp = heat_temp
        self.heating = heating
        self.light = light
        self.pub_time = pub_time
        self.pub_date = pub_date


db.create_all()
"""-----------------------------------------------------------------------------"""


def get_html(url):
    r = requests.get(url)  # Получаем метод Response
    r.encoding = 'utf8'  # У меня были проблемы с кодировкой, я задал в ручную
    r.encoding = 'utf8'
    return r.text


def get_head(html):
    soup = BeautifulSoup(html, 'lxml')
    head = soup.find_all('b')
    heads = []
    for i in head:
        heads.append(i.string)
    return heads


def getparse():
    data = get_head(get_html('http://192.168.1.155'))
    intemp, outtemp = data
    t1 = intemp
    t2 = outtemp
    t3 = 0
    h1 = 0
    l1 = 0
    tm = time.strftime('%H')
    td = time.strftime('%d/%m/%Y')

    db.session.add(Temp(intemp, outtemp, t3, h1, l1, tm, td))
    db.session.commit()


def getcurrent():
    URL = 'http://192.168.1.155'
    try:
        data = get_head(get_html(URL))
        intemp, outtemp = data
        return intemp, outtemp, URL
    except:
        return None, None, URL


# -----------------------------------------------------------------------------"""
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'static/favicon.ico',
                               mimetype='image/vnd.microsoft.icon')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/get-json/<json_id>')
def jsonget(json_id):
    a = getjson(json_id)
    return jsonify(a)


@app.route('/chart')
def chart():
    return render_template('chart.html')


@app.route('/iframe')
def iframe():
    intemp, outtemp, url = getcurrent()
    return render_template('iframe.html', intemp=intemp, outtemp=outtemp, url=url)


@app.route('/chart1')
def chart1():
    return render_template('chart1.html')


@app.route('/chart2')
def chart2():
    return render_template('chart2.html')


@app.route('/getcsv')
def csv_download():
    mysql_to_csv(sql, file_path, host, user, password, database)
    return 'OK'


if __name__ == '__main__':
    app.run(host='0.0.0.0', use_reloader=True, debug=True)
