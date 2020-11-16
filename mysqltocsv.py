###   Working version   ###

### MYSQL SELECT QUERY FOR LAST 7 UPDATES ###
### SELECT in_temp, out_temp, pub_time, pub_date FROM (SELECT * FROM temp ORDER BY id DESC LIMIT 7) t WHERE t.id>10 ORDER BY id; ###

import pymysql
import pandas as pd
import sys


def mysql_to_csv(sql, file_path, host, user, password, database):
    '''
    The function creates a csv file from the result of SQL
    in MySQL database.
    '''
    try:
        con = pymysql.connect(host=host, user=user, password=password, database=database)
        print('Connected to DB: {}'.format(host))
        # Read table with pandas and write to csv
        df = pd.read_sql(sql, con)
        df.to_csv(file_path, encoding='utf-8', header=True,
                  doublequote=True, sep=',', index=False)
        print('File, {}, has been created successfully'.format(file_path))
        # print('{}, was selected'.format(sql))
        con.close()

    except Exception as e:
        print('Error: {}'.format(str(e)))
        sys.exit(1)

# Execution Example
# sql = ' SELECT * FROM temp;'
# file_path = 'static/city.csv'
# host = '127.0.0.1'
# user = 'root'
# password = 'admin-mysql25'
# database = 'log_temp_db'
# mysql_to_csv(sql, file_path, host, user, password)
