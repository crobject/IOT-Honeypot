# Honeypot and Network Sniffer



## Quick Start
Go to https://nodejs.org/en/download/package-manager/ to install node.js for your OS.
``` bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```


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
