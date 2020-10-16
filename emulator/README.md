# Emulator Setup

1. Install docker on your system https://www.docker.com/get-started

2. Run `docker build . -t emulator:latest && docker run --cap-add=net_admin --privileged -it emulator:latest`

3. This will take a bit to build the image, but you should see something saying `Please press Enter to activate this console.`, which means everything worked

4. Next you will need to find the IP address of the docker instance. Run `docker ps` to see a list of running docker images
```
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
c1aeb394a932        emulator:latest     "/app/run.sh"       8 minutes ago       Up 8 minutes                            fervent_mendeleev
```
5. Now run `docker inspect c1aeb394a932 | grep "IPAddress"` where the c1... is the CONTAINER ID of your image

6. Try to visit the IP address in a browser with credentials admin:password
