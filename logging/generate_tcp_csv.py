import sys
import re
from dateutil import parser
import mysql.connector
from collections import defaultdict
import base64

mydb = mysql.connector.connect(
  host="localhost",
  user="honeypot",
  password="password",
  database="Honeypot",
  auth_plugin='mysql_native_password'
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

    b64_full = str(base64.b64encode(cur['full_http'].encode("utf-8")), 'utf-8')
    sql = "INSERT INTO HTTPRequests (IPAddress, ReqType, ReqTime, QueryParameters, PostParameters, Fullhttp) VALUES (%s, %s, %s, %s, %s, %s)"
    val = (cur['ip'], cur['type'], cur['time'], cur['path'], '', b64_full)
    mycursor.execute(sql, val)
    mydb.commit()

    caps.append(cur)


for line in lines:
    if re.match('\d+:\d+:\d+\.\d+ IP', line):
        if cur:
            finish_process_cap(cur)

        cur = defaultdict(lambda: "") 
        cur["time"] = parser.parse(line.split(' ')[0]).timestamp()

    elif re.search('(?:[0-9]{1,3}\.){3}[0-9]{1,3}\.\d+ > (?:[0-9]{1,3}\.){3}[0-9]{1,3}\.\d+', line):
        m = re.search('((?:[0-9]{1,3}\.){3}[0-9]{1,3})\.\d+ > (?:[0-9]{1,3}\.){3}[0-9]{1,3}\.\d+', line)
        cur['ip'] = m.group(1)
    else:
        cur['full_http'] += line

print(caps)
