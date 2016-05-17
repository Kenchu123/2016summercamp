docker-compose stop
docker rmi -f 2016summercamp_web
docker-compose build
docker-compose start
exit 0
