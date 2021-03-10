sudo docker build --tag kct-cdr-server:1.0 -f ./_docker/Dockerfile.prod .
sudo docker-compose -p kct-cdr-server --file ./_docker/docker-compose.yml up -d --remove-orphans