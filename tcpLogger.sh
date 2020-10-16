#!/bin/bash
# Author Yufei Pan

# this would be called when Ctrl-C is to format the data
function trap_ctrlc ()
{
    echo "Ctrl-C caught...performing data analysing on the captured file (cap.log)"
    # this use a grep similar to the ssh logger, it essentially find the line either contains post,
    # get or host number and then put these lines into tcpLog.txt
    grep -E -i -a "POST /|GET /|Host:" cap.log > tcpLog.txt
    
    echo "tcpLog.txt was written"
    exit 2
}

# as the the control c would be represented by signal 2, this would call function when control c is pressed
trap "trap_ctrlc" 2
echo "Start capturing packets, press ctrl+c to stop"

# use tcp dump to monitor the incoming ip connections
# use -v to produce a more complete output for future analysis
# use -n to show the original IP address instead of host names (for easier back tracking
# use -l to make the output line buffered so that tee can read it and log it to files
# use a expression to limit the listened port to port 80 only and filter any packets that do not contain useful data redudce the amount of data produced
# use tee -a to (additively) log the output both to cap.log and to the console.
tcpdump -v -n -l 'tcp port 80 and (((ip[2:2] - ((ip[0]&0xf)<<2)) - ((tcp[12]&0xf0)>>2)) != 0)' | tee -a cap.log
