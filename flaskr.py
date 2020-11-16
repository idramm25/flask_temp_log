### MYSQL TO CSV CONNECTION CONF ###

sql = ' SELECT id, in_temp, out_temp, pub_time, pub_date FROM temp;'
file_path = 'static/temp.csv'
host = '127.0.0.1'
user = 'root'
password = 'admin-mysql25'
database = 'log_temp_db'