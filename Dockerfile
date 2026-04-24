# Etapa de build
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:alpine

WORKDIR /app

# Instalar gettext para envsubst (necesario para substituir variables en nginx.conf)
RUN apk add --no-cache gettext

# Copiar build desde etapa de build
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Copiar script de entrypoint
COPY docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Exponer puerto
EXPOSE 80

# Ejecutar entrypoint para substituir variables y arrancar nginx
ENTRYPOINT ["/entrypoint.sh"]