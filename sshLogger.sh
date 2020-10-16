#!/bin/bash
grep -a "Failed password" /var/log/auth.log > sshFailedAttempts.txt
grep -E -o -a "([0-9]{1,3}[\.]){3}[0-9]{1,3}" sshFailedAttempts.txt | sort | uniq -c | sort -g -r > failedIPs.txt
grep -o -a "Failed password for .* from" sshFailedAttempts.txt | sort | uniq -c | sort -g -r | awk '{print $1, $(NF-1) }' > failedUsers.txt
