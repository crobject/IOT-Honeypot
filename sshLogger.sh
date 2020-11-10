#!/bin/bash
# Author Yufei Pan
# The following command pulls the log from the system log pool and filter all failed attempts to sshFailedAttempts.txt
grep -a "Failed password" /var/log/auth.log > sshFailedAttempts.txt
# title for failedIPs.txt
echo " counts    ip" >> failedIPs.txt
echo "----------------" >> failedIPs.txt
# the following command uses grep to find the ip
# by using a regular expression to find the ip
# Using a -o to only output the matched pard
# then use sort to sort all the IPs so repeat ones are together
# then use uniq -c to count and condense all the IPs to easy to read lists
# Then use sort -g to sort by the index count, -r to reverse the list
# Then use >> to add the list to the failedIPs file
grep -E -o -a "([0-9]{1,3}[\.]){3}[0-9]{1,3}" sshFailedAttempts.txt | sort | uniq -c | sort -g -r >> failedIPs.txt
# title for failedUsers.txt
echo "counts  user" > failedUsers.txt
echo "----------------" >> failedUsers.txt
# essentially the same from the command above for the search part
# but it uses awk at the end to find the appropriate count and user name to output
grep -o -a "Failed password for .* from" sshFailedAttempts.txt | sort | uniq -c | sort -g -r | awk '{print $1, $(NF-1) }' >> failedUsers.txt
