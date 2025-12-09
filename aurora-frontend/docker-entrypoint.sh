#!/bin/sh

# Set default PORT if not provided
PORT=${PORT:-8080}
export PORT

# Replace env vars in nginx config
envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Replace env vars in env-config.js
envsubst < /usr/share/nginx/html/env-config.template.js > /usr/share/nginx/html/env-config.js

# Remove template file
rm /etc/nginx/conf.d/default.conf.template

# Start nginx
exec nginx -g 'daemon off;'
