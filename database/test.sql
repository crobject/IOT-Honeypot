
LOAD DATA LOCAL INFILE '/root/IOT-Honeypot/database/mock_logs.csv' 
INTO TABLE Honeypot.Logs 
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
