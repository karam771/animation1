FROM nginx:alpine

# Copy website files
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/
COPY frames/ /usr/share/nginx/html/frames/

# Custom nginx config for SPA + caching
RUN echo 'server { \
    listen 3000; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { try_files $uri $uri/ /index.html; } \
    location ~* \.(jpg|jpeg|png|webp|gif|svg|ico)$ { expires 30d; add_header Cache-Control "public, immutable"; } \
    location ~* \.(css|js)$ { expires 7d; add_header Cache-Control "public"; } \
    gzip on; \
    gzip_types text/html text/css application/javascript image/svg+xml; \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
