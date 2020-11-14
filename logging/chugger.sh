#!/bin/bash
# Author Yufei Pan
#
# First running the sshLogger
bash sshLogger.sh
python3 generate_tcp_csv.py cap.log
mv cap.log cap-`date -Iseconds`.log && touch cap.log
docker container kill $(docker ps | awk '/emulator/ {print $1}')
docker run -p 80:80 --rm -d --cap-add=net_admin --privileged -it emulator:latest
# The TCP data should be in the cap.log
#
# Formating ssh logs in to csv files
# using grep and line formatter to remove repetitive entrees on the same line
# Then using awk to format the data by selecting which column to take
# Finnaly store the data to a csv file
grep -o -a ".*Failed password for .* from .* port .* ssh2" sshFailedAttempts.txt | awk '{print $(NF-3) "," $(NF-1) "," $(NF-5) ","$1,$2,$3}' >> sshLogs.csv
#
# For the TCP log part
# Use grep with -P for perl regular expressions with -z to took the whole file as one line, find pattern patch and out put with null character as spacer
# use sed to replace all the new line seperator to space (now the outputs would only be seperated using null character with out any new line characters
# use sed again to replace all the null character to new line character so that the output can be interputed by a simple awk call selecting columes.
# Store the output increamentally to TCPLogs.csv
grep -P -a -z -o ".*IP.*\n.*\n.*\n.*Host" cap.log | sed -e ':a' -e 'N' -e '$!ba' -e 's/\n/ /g' | sed 's/\x0/\n/g' | awk '{print $(18) "," $(NF-1) "," $(1)}' >> TCPLogs.csv

