#!/bin/bash
# Author Yufei Pan
#
# Execute chugger.sh every 30 minutes and save the log to chugger.log
#
# save the current directory name to dir
dir=$(pwd)
# Aquire super user permission if not executed from user root
[ "$UID" -eq 0 ] || exec sudo bash "$0" "$@"
echo "Adding " $dir"/chugger.sh to crontab tasks"
# Using the root user as not all server is set up to have another user other than root (not recommended but for cross platform compatibility using root here)
# echo "*/30 * * * * $dir/chugger.sh >> $dir/chugger.log" | tee -a /etc/crontab
(crontab -l 2>/dev/null; echo "*/30 * * * * $dir/chugger.sh >> $dir/chugger.log") | crontab -
