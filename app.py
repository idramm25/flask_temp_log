# flask1

from flask import Flask, render_template, jsonify
from flask import send_from_directory
from flask_breadcrumbs import Breadcrumbs, register_breadcrumb
from flask_sqlalchemy import *
from time import strftime

from mysqltojson import getjson
from mysqltocsv import mysql_to_csv

from flaskr import *
from apscheduler.scheduler import Scheduler

from conn import connect
from connSettings import *

app = Flask(__name__, static_url_path='/static')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:admin-mysql25@localhost/log_temp_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["CLIENT_JSON"] = "/home/smart-server/projects/flask2/api/get-json"
Breadcrumbs(app=app)
db = SQLAlchemy(app)


"""-----------------------------------------------------------------------------------------------"""
# Start the scheduler
sched = Scheduler()
sched.start()


# Schedule job_function to be called every two hours
@sched.interval_schedule(minutes=COUNT)  # logging ratio "minutes"
def sensor():
    data = SensorsData(url=URL)  # Sensor URL
    data.getparse()
    print(strftime('%H:%M %d/%m/%Y') + " Getting data from sensor's")


class Temp(db.Model):
    def __init__(self, in_temp, out_temp, heat_temp, heating, light, pub_time, pub_date):
        self.in_temp = in_temp
        self.out_temp = out_temp
        self.heat_temp = heat_temp
        self.heating = heating
        self.light = light
        self.pub_time = pub_time
        self.pub_date = pub_date

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    in_temp = db.Column(db.String(5), unique=False)
    out_temp = db.Column(db.String(5), unique=False)
    heat_temp = db.Column(db.String(5), unique=False)
    heating = db.Column(db.Integer, unique=False)
    light = db.Column(db.Integer, unique=False)
    pub_time = db.Column(db.String(2), unique=False)
    pub_date = db.Column(db.String(10), unique=False)

    db.create_all()


class SensorsData:
    def __init__(self, url):
        self.url = url

    def getparse(self):
        try:
            intemp, outtemp = connect(self.url)
            t3 = 0
            h1 = 0
            l1 = 0
            tm = strftime('%H')
            td = strftime('%d/%m/%Y')
            db.session.add(models.Temp(intemp, outtemp, t3, h1, l1, tm, td))
            db.session.commit()
            print("OK")
        except ConnectionError as e:
            print(e)

    def getcurrent(self):
        try:
            intemp, outtemp = connect(URL)
            return intemp, outtemp, self.url
        except ConnectionError as e:
            print(e)
            return None, None, self.url


# -----------------------------------------------------------------------------"""
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'static/favicon.ico',
                               mimetype='image/vnd.microsoft.icon')


@app.route('/')
@register_breadcrumb(app, '.', 'Home')
def index():
    return render_template('index.html')


@app.route('/api/get-json/<json_id>')
def jsonget(json_id):
    a = getjson(json_id)
    return jsonify(a)


@app.route('/chart')
@register_breadcrumb(app, '.chart', 'Chart')
def chart():
    return render_template('chart.html')


@app.route('/chart1')
@register_breadcrumb(app, '.chart1', 'Chart1')
def chart1():
    data = SensorsData(url=URL)  # Sensor URL
    intemp, outtemp, url = data.getcurrent()
    return render_template('chart1.html', intemp=intemp, outtemp=outtemp, url=url)


@app.route('/getcsv')
def csv_download():
    mysql_to_csv(sql, file_path, host, user, password, database)
    return 'OK'


if __name__ == '__main__':
    app.run(host='0.0.0.0', use_reloader=True, debug=True)
