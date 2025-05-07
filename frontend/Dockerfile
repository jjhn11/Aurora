FROM node:18-alpine AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# DESCOMENTAR PARA MODO DESARROLLO
# DESCOMENTAR PARA MODO DESARROLLO
# DESCOMENTAR PARA MODO DESARROLLO
CMD ["npm", "run", "dev"]


# DESCOMENTAR PARA MODO PRODUCCION
# DESCOMENTAR PARA MODO PRODUCCION
# DESCOMENTAR PARA MODO PRODUCCION

# RUN npm run build

# Etapa de producción - usar nginx para servir archivos estáticos
# FROM nginx:stable-alpine AS production-stage

# Copiar archivos compilados al directorio de nginx
# COPY --from=build-stage /app/dist /usr/share/nginx/html

# Exponer puerto 80
# EXPOSE 80

# Iniciar nginx
# CMD ["nginx", "-g", "daemon off;"]