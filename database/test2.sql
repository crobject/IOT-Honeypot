LOAD DATA INFILE '/root/IOT-Honeypot/logging/sshLogs.csv' 
INTO TABLE Honeypot.Logs 
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
(IPAddress,PortNumber,Username,AccessDate)
SET id = NULL;
