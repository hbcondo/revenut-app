FROM pierrezemb/gostatic
COPY ./web-build/ /srv/http/
CMD ["-port","8080","-https-promote", "-enable-logging"]