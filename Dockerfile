# Etapa de build
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# Instalar serve (servidor estático)
RUN npm install -g serve

# Copiar build
COPY --from=build /app/dist ./dist

# Exponer puerto
EXPOSE 3000

# Servir app
CMD ["serve", "-s", "dist", "-l", "3000"]