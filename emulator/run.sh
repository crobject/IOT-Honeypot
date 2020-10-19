#!/bin/bash

set -u


echo "Decompressing image"
tar -xf image.tar.xz -C /app/scratch/1/

mkdir -p /dev/net && \
    mknod /dev/net/tun c 10 200 && \
    chmod 600 /dev/net/tun



echo "Setting up network forwarding"
echo 1 >/proc/sys/net/ipv4/ip_forward
iptables -t nat -A PREROUTING -p tcp --dport 80 -j DNAT --to-destination 192.168.0.50:80
iptables -t nat -A POSTROUTING -j MASQUERADE

ARCHEND=mipseb
IID=1

if [ -e ./firmadyne.config ]; then
    source ./firmadyne.config
elif [ -e ../firmadyne.config ]; then
    source ../firmadyne.config
elif [ -e ../../firmadyne.config ]; then
    source ../../firmadyne.config
else
    echo "Error: Could not find 'firmadyne.config'!"
    exit 1
fi

IMAGE=`get_fs ${IID}`
KERNEL=`get_kernel ${ARCHEND}`
QEMU=`get_qemu ${ARCHEND}`
QEMU_MACHINE=`get_qemu_machine ${ARCHEND}`
QEMU_ROOTFS=`get_qemu_disk ${ARCHEND}`
WORK_DIR=`get_scratch ${IID}`


TAPDEV_0=tap${IID}_0
HOSTNETDEV_0=${TAPDEV_0}
echo "Creating TAP device ${TAPDEV_0}..."
sudo tunctl -t ${TAPDEV_0} -u ${USER}


echo "Bringing up TAP device..."
sudo ip link set ${HOSTNETDEV_0} up
sudo ip addr add 192.168.0.49/24 dev ${HOSTNETDEV_0}

echo "Adding route to 192.168.0.50..."
sudo ip route add 192.168.0.50 via 192.168.0.50 dev ${HOSTNETDEV_0}


function cleanup {
    pkill -P $$
    
echo "Deleting route..."
sudo ip route flush dev ${HOSTNETDEV_0}

echo "Bringing down TAP device..."
sudo ip link set ${TAPDEV_0} down


echo "Deleting TAP device ${TAPDEV_0}..."
sudo tunctl -d ${TAPDEV_0}

}

trap cleanup EXIT

echo "Starting firmware emulation... use Ctrl-a + x to exit"
sleep 1s

 ${QEMU} -m 256 -M ${QEMU_MACHINE} -kernel ${KERNEL} \
    -drive if=ide,format=raw,file=${IMAGE} -append "root=${QEMU_ROOTFS} console=ttyS0 nandsim.parts=64,64,64,64,64,64,64,64,64,64 rdinit=/firmadyne/preInit.sh rw debug ignore_loglevel print-fatal-signals=1 user_debug=31 firmadyne.syscall=0" \
    -nographic \
    -netdev tap,id=net0,ifname=${TAPDEV_0},script=no -device e1000,netdev=net0 -netdev socket,id=net1,listen=:2001 -device e1000,netdev=net1 -netdev socket,id=net2,listen=:2002 -device e1000,netdev=net2 -netdev socket,id=net3,listen=:2003 -device e1000,netdev=net3 | tee ${WORK_DIR}/qemu.final.serial.log
