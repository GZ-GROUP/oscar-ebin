#!/bin/sh
set -e

# Si API_TARGET no está definida, usar valor por defecto
API_TARGET=${API_TARGET:-http://localhost:8001}

# Reemplazar la variable en nginx.conf
envsubst '$API_TARGET' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Iniciar nginx
nginx -g 'daemon off;'
