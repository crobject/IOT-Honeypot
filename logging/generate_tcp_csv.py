import sys
import re
from dateutil import parser
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="password",
  database="localhost"
)

mycursor = mydb.cursor()

our_ip = '46.21.150.52'

with open(sys.argv[1]) as f:
    data = f.read()

lines = data.split('\n')

cur = None
caps = []

def finish_process_cap(cap):
    # skip requests that we send back
    if cap['ip'] == our_ip:
        return
    m = re.search('(GET|POST) (\/(.+)) HTTP/1\.\d', cap['full_http'])
    if m:
        t = m.group(1)
        path = m.group(2)
        cur['type'] = t
        cur['path'] = path

    sql = "INSERT INTO HTTPRequests (IPAddress, ReqType, ReqTime, QueryParameters, PostParameters, Fullhttp) VALUES (%s, %s, %s, %s, %s, %s)"
    val = (cur['ip'], cur['type'], cur['time'], cur['path'], '', cur['full_http'])
    mycursor.execute(sql, val)
    mydb.commit()

    caps.append(cur)


for line in lines:
    if re.match('\d+:\d+:\d+\.\d+ IP', line):
        if cur:
            finish_process_cap(cur)
        cur = {
                "time": parser.parse(line.split(' ')[0]).timestamp(),
                'full_http': ''
        }
    elif re.search('(?:[0-9]{1,3}\.){3}[0-9]{1,3}\.\d+ > (?:[0-9]{1,3}\.){3}[0-9]{1,3}\.\d+', line):
        m = re.search('((?:[0-9]{1,3}\.){3}[0-9]{1,3})\.\d+ > (?:[0-9]{1,3}\.){3}[0-9]{1,3}\.\d+', line)
        cur['ip'] = m.group(1)
    else:
        cur['full_http'] += line

print(caps)