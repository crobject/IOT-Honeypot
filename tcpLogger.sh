#!/bin/bash
# Author Yufei Pan

# this would be called when Ctrl-C is to format the data
function trap_ctrlc ()
{
    echo "Ctrl-C caught...performing data analysing"
    
    egrep -i -a "POST /|GET /|Host:" cap.log > tcpLog.txt
    

    exit 2
}

trap "trap_ctrlc" 2


tcpdump -s 0 -v -n -l 'tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0)' | tee -a cap.log
