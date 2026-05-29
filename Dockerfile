# Multi-stage Dockerfile to serve the static calculator
# Stage 1: (optional) could build assets; here we just keep them as-is
FROM nginx:alpine AS production

# Remove default nginx site
RUN rm -rf /usr/share/nginx/html/*

# Copy project files into nginx web root
# Assumes index.html and assets/ exist at repo root
COPY ./index.html /usr/share/nginx/html/index.html
COPY ./assets/ /usr/share/nginx/html/assets/

# Expose port 80 for nginx
EXPOSE 80

# Health check for CI/CD
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

