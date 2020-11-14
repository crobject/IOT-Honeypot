# Honeypot and Network Sniffer



## Quick Start
1.) Go to https://nodejs.org/en/download/package-manager/ to install node.js for your OS.
2.) Create a .env file in the root directory of the app

```bash
#This example .env should work as long as your mysql credentials are the same.
REACT_APP_DB_HOSTNAME = "localhost"
REACT_APP_DB_USER = "root"
#Sometimes password for root user will be just "" depending on the OS.
REACT_APP_DB_PASSWORD = "password"
```

3.) Setup website at localhost:3000
``` bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

#Creates database and stored procedures
npm run create-db

# Run the client & server with concurrently
npm run dev

# FOLLOWING ARE OPTIONAL COMMANDS
----------------------------------
#if you want to populate the DB on your local machine.
npm run mockdata-db

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

4.) Setup honeypot and loggers
``` bash
## Install the timer into crontab
bash logging/scheduler.sh

## Test run the codes
bash logging/chugger.sh
# chugger.sh would create sshLogs.csv TCPLogs.csv

## Use loggers
``` bash
# Use sshLogger: (run with root permission)
bash sshLogger.sh
# The output file would be failedIPs.txt and failedUsers.txt for analyzed output of failed logins
# sshFailedAttempts.txt would also be generated containing all the failed login attempts from the sshd log file

# Use tcpLogger: (run with root permission)
bash tcpLogger.sh
# The output file would be tcpLog.txt for analyzed output of tcp requests sent to the server
# cap.log would also be generated containing all the captured tcp packets sent to port 80
```
