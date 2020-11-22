from flask_sqlalchemy import *
from app import app

db = SQLAlchemy(app)


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
