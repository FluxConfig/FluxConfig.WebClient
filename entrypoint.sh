#!/bin/sh

sed -i "s|__VITE_FCM_BASE_URL__|${VITE_FCM_BASE_URL}|g" /usr/share/nginx/html/config.js
sed -i "s|__VITE_FC_API_KEY__|$(echo ${VITE_FC_API_KEY} | base64)|g" /usr/share/nginx/html/config.js

exec "$@"