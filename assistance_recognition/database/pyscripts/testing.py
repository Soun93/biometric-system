import mysql.connector as msc
from mysql.connector import errorcode
import connection
import time
import datetime
import generateEnc


# set up config for db session
config = {
    'user': 'root',
    'password': 'root',
    'host': '127.0.0.1',
    'port': '4444',
    'database': 'attendance'
}

def action(cursor: msc.connection.MySQLCursor):
    
    print("1. Show encodings table\n2. Generate encodings")
    selection = input()
    if selection == '1':
        cursor.execute("SELECT * FROM encodings")

        result = cursor.fetchall()
        
        for row in result:
            print(row)
    else:
        encodings = generateEnc.generateEncodings()
        
        print(f"Encodings generated of size: {encodings.size * encodings.itemsize}(bytes)")
        #print(encodings)

        enc2bytes = encodings.tobytes()
        print(enc2bytes)
        
        #@query = "INSERT INTO encodings (id_student, name, encodings, created_at) VALUES(%s, %s, %s, %s)"
        now = time.localtime()
        f = '%Y-%m-%d %H:%M:%S'

        values = ('6969', 'Juan', enc2bytes, time.strftime(f, now))
    
        cursor.execute("INSERT INTO encodings (id_student, name, encodings, created_at) VALUES(%s, %s, %s, %s)", values)



def main():
    logger = connection.logger(__name__)

    cnx = connection.connect(config=config, logger=logger)
    
    if cnx and cnx.is_connected():

        with cnx.cursor() as cursor:

            action(cursor)
        
        cnx.commit()
        cnx.close()
    



if __name__ == "__main__":
    main()

