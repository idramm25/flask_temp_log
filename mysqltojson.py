# ## MYSQL SELECT QUERY FOR LAST 7 UPDATES ### ## SELECT in_temp, out_temp, pub_time, pub_date FROM (SELECT * FROM
# temp ORDER BY id DESC LIMIT 7) t WHERE t.id>10 ORDER BY id; ###

import pymysql.cursors
from flask import abort


def getjson(json_id):
    con = pymysql.connect(host='localhost',
                          user='root',
                          password='admin-mysql25',
                          db='log_temp_db',
                          charset='utf8mb4',
                          cursorclass=pymysql.cursors.DictCursor)
    # -----------------------------------------------------------------
    if json_id == "all_data":
        cur = con.cursor()
        cur.execute("SELECT in_temp, out_temp, pub_time, pub_date FROM temp")
        rows = cur.fetchall()
        return rows
    elif json_id == "m_data":
        cur = con.cursor()
        cur.execute(
            "SELECT in_temp, out_temp, pub_time, pub_date FROM (SELECT * FROM temp ORDER BY id DESC LIMIT 1344) "
            "t WHERE t.id>10 ORDER BY id;")
        rows = cur.fetchall()
        return rows
    elif json_id == "w_data":
        cur = con.cursor()
        cur.execute(
            "SELECT in_temp, out_temp, pub_time, pub_date FROM (SELECT * FROM temp ORDER BY id DESC LIMIT 336) t "
            "WHERE t.id>10 ORDER BY id;")
        rows = cur.fetchall()
        return rows
    else:
        return abort(404, description="Resource not found")
